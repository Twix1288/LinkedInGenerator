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
if (!process.env.NEXT_PUBLIC_SITE_URL) {
  throw new Error('Missing NEXT_PUBLIC_SITE_URL env variable')
}

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
)

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
})

export async function POST(request) {
  try {
    let body
    try {
      body = await request.json()
    } catch {
      return Response.json(
        { error: 'Invalid or missing JSON in request body' },
        { status: 400 }
      )
    }

    const { text, tone = 'professional', clientId, linkUrl = '' } = body

    if (!clientId) {
      return Response.json(
        { error: 'Missing clientId in request body' },
        { status: 400 }
      )
    }

    const limitCheck = await fetch(`${process.env.NEXT_PUBLIC_SITE_URL}/api/check-limit`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ clientId })
    })

    if (!limitCheck.ok) {
      const errorText = await limitCheck.text()
      console.error('Limit check failed with status', limitCheck.status, 'and body:', errorText || '(empty response body)')

      return Response.json(
        { error: 'Failed to check usage limit', details: `Status: ${limitCheck.status}, Body: ${errorText || 'empty'}` },
        { status: 500 }
      )
    }

    const limitData = await limitCheck.json()
    const remaining = limitData.remaining ?? 0

    if (remaining <= 0) {
      return Response.json(
        { error: 'You have reached your daily generation limit (3 posts)' },
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

    const { error } = await supabase
      .from('generations')
      .insert({
        client_id: clientId,
        input_text: text,
        tone,
        output_text: post,
        link_url: linkUrl,
        created_at: new Date().toISOString()
      })

    if (error) throw error

    return Response.json({
      post,
      metadata: { linkUrl }
    })

  } catch (error) {
    console.error('Generation Error:', error)

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
