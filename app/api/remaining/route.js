import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY,
  {
    auth: {
      persistSession: false,
      autoRefreshToken: false
    }
  }
)

export async function POST(request) {
  const { clientId } = await request.json()

  try {
    const { data: count, error } = await supabase.rpc('count_todays_generations', { 
      client_id: clientId 
    })

    if (error) throw error

    return Response.json({ count: count || 0 }, { status: 200 })
  } catch (error) {
    return Response.json(
      { error: error.message || 'Failed to check generations' },
      { status: 500 }
    )
  }
}