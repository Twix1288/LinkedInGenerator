import { createClient } from '@supabase/supabase-js'

if (!process.env.SUPABASE_URL) throw new Error('Missing SUPABASE_URL env var')
if (!process.env.SUPABASE_SERVICE_ROLE_KEY) throw new Error('Missing SUPABASE_SERVICE_ROLE_KEY env var')

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
  } catch {
    return new Response(
      JSON.stringify({ error: 'Invalid or missing JSON body' }),
      { status: 400, headers: { 'Content-Type': 'application/json' } }
    )
  }

  if (!clientId) {
    return new Response(
      JSON.stringify({ error: 'Missing clientId in request body' }),
      { status: 400, headers: { 'Content-Type': 'application/json' } }
    )
  }

  try {
    const todayISO = new Date().toISOString().split('T')[0]

    // Use .select('*', { count: 'exact', head: true }) for count only, but .head(true) may improve perf
    const { count, error } = await supabase
      .from('generations')
      .select('*', { count: 'exact' })
      .eq('client_id', clientId)
      .gte('created_at', todayISO)

    if (error) {
      console.error('Supabase count error:', error)
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
        details: error.message
      }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    )
  }
}
