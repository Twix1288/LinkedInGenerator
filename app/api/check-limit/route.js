import { createClient } from '@supabase/supabase-js'

if (!process.env.SUPABASE_URL) {
  console.error('Missing SUPABASE_URL env var')
  throw new Error('Missing SUPABASE_URL env var')
}
if (!process.env.SUPABASE_SERVICE_ROLE_KEY) {
  console.error('Missing SUPABASE_SERVICE_ROLE_KEY env var')
  throw new Error('Missing SUPABASE_SERVICE_ROLE_KEY env var')
}

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY,
  {
    realtime: { disable: true },
    auth: { persistSession: false }
  }
)

export async function POST(request) {
  const MAX_DAILY_GENERATIONS = 3

  let clientId
  try {
    const body = await request.json()
    clientId = body.clientId
    if (!clientId) {
      console.error('Missing clientId in request body')
      return new Response(
        JSON.stringify({ error: 'Missing clientId in request body' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      )
    }
  } catch (err) {
    console.error('Invalid JSON body:', err)
    return new Response(
      JSON.stringify({ error: 'Invalid or missing JSON body' }),
      { status: 400, headers: { 'Content-Type': 'application/json' } }
    )
  }

  // Debug log environment variables (avoid printing keys publicly)
  console.log('Checking limit for clientId:', clientId)
  // You can add more logs here for SUPABASE_URL, etc. if debugging locally only

  try {
    const todayISO = new Date().toISOString().split('T')[0]

    const { count, error } = await supabase
      .from('generations')
      .select('*', { count: 'exact' })
      .eq('client_id', clientId)
      .gte('created_at', todayISO)

    if (error) {
      console.error('Supabase error in check-limit:', error)
      throw error
    }

    return new Response(
      JSON.stringify({
        count: count || 0,
        limit: MAX_DAILY_GENERATIONS,
        remaining: Math.max(0, MAX_DAILY_GENERATIONS - (count || 0))
      }),
      { headers: { 'Content-Type': 'application/json' } }
    )
  } catch (error) {
    console.error('Limit check error:', error)
    return new Response(
      JSON.stringify({
        error: 'Failed to check limit',
        details: error.message || 'Unknown error'
      }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    )
  }
}
