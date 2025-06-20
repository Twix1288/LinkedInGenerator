import { createClient } from '@supabase/supabase-js'
import OpenAI from 'openai'

if (!process.env.SUPABASE_URL) {
  throw new Error('Missing SUPABASE_URL env variable')
}
if (!process.env.SUPABASE_SERVICE_ROLE_KEY) {
  throw new Error('Missing SUPABASE_SERVICE_ROLE_KEY env variable')
}
if (!process.env.OPENAI_API_KEY) {
  throw new Error('Missing OPENAI_API_KEY env variable')
}

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY,
  {
    realtime: { disable: true },
    auth: { persistSession: false }
  }
)

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
})

export async function POST(request) {
  try {
    const { text, tone = 'professional', clientId, linkUrl = '' } = await request.json()

    if (!clientId) {
      return Response.json(
        { error: 'Missing clientId in request body' },
        { status: 400 }
      )
    }

    const MAX_DAILY_GENERATIONS = 3
    const todayISO = new Date().toISOString().split('T')[0]

    // Check generation count directly from Supabase
    const { count, error: countError } = await supabase
      .from('generations')
      .select('*', { count: 'exact' })
      .eq('client_id', clientId)
      .gte('created_at', todayISO)

    if (countError) {
      console.error('Supabase error checking limit:', countError)
      return Response.json(
        { error: 'Failed to check usage limit' },
        { status: 500 }
      )
    }

    if ((count || 0) >= MAX_DAILY_GENERATIONS) {
      return Response.json(
        { error: `You have reached your daily generation limit (${MAX_DAILY_GENERATIONS} posts)` },
        { status: 429 }
      )
    }

    if (!text?.trim()) {
      return Response.json(
        { error: 'Please provide some content' },
        { status: 400 }
      )
    }

    const prompt = `Create a LinkedIn post with ${tone} tone. Structure:
- Engaging introduction
- 2-3 concise paragraphs with key points
- Call-to-action question
- 3-5 relevant hashtags
${linkUrl ? `\nInclude a call-to-action linking to: ${linkUrl}` : ''}`

    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: prompt },
        { role: "user", content: text }
      ],
      temperature: 0.7,
      max_tokens: 600
    })

    const post = completion.choices[0].message.content

    const { error: insertError } = await supabase
      .from('generations')
      .insert({
        client_id: clientId,
        input_text: text,
        tone,
        output_text: post,
        link_url: linkUrl,
        created_at: new Date().toISOString()
      })

    if (insertError) {
      console.error('Supabase insert error:', insertError)
      return Response.json(
        { error: 'Failed to save generation' },
        { status: 500 }
      )
    }

    return Response.json({
      post,
      metadata: { linkUrl }
    })

  } catch (error) {
    console.error('Generation error:', error)
    return Response.json(
      {
        error: 'Failed to generate post',
        details: error.message.includes('quota')
          ? 'API quota exceeded'
          : error.message
      },
      { status: 500 }
    )
  }
}
