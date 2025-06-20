import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
)

export async function POST(request) {
  try {
    const formData = await request.formData()
    const file = formData.get('file')
    
    if (!file) return new Response('No file uploaded', { status: 400 })
    if (file.size > 2 * 1024 * 1024) return new Response('File must be <2MB', { status: 400 })

    const fileName = `${Date.now()}-${file.name}`
    const { data, error } = await supabase.storage
      .from('linkedin-images')
      .upload(fileName, file)

    if (error) throw error

    const { data: { publicUrl } } = supabase.storage
      .from('linkedin-images')
      .getPublicUrl(data.path)

    return Response.json({ url: publicUrl })
  } catch (error) {
    return new Response(error.message, { status: 500 })
  }
}