import { createClient } from '@supabase/supabase-js'
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY,
  {
    realtime: {
      disable: true
    },
    auth: {
      persistSession: false
    }
  }
)

export async function POST(request) {
  const MAX_DAILY_GENERATIONS = 3
  const { clientId } = await request.json()
  
  try {
    const { count, error } = await supabase
      .from('generations')
      .select('*', { count: 'exact' })
      .eq('client_id', clientId)
      .gte('created_at', new Date().toISOString().split('T')[0])

    if (error) throw error

    return Response.json({ 
      count: count || 0,
      limit: MAX_DAILY_GENERATIONS,
      remaining: Math.max(0, MAX_DAILY_GENERATIONS - (count || 0))
    })
    
  } catch (error) {
    console.error('Limit check error:', error)
    return Response.json(
      { 
        error: 'Failed to check limit',
        details: error.message
      },
      { status: 500 }
    )
  }
}