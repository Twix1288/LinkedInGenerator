import { createClient } from '@supabase/supabase-js'
import OpenAI from 'openai'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
)

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
})

export async function POST(request) {
  try {
    const { text, tone = 'professional', clientId, linkUrl = '' } = await request.json()

    // First check the limit
    const limitCheck = await fetch('http://localhost:3000/api/check-limit', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ clientId })
    })
    const { remaining } = await limitCheck.json()
    
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

    // Save to Supabase
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