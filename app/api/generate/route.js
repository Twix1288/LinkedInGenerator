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
    const { text, tone = 'professional', clientId } = await request.json()

    // Validate inputs
    if (!text?.trim()) {
      return Response.json(
        { error: 'Please provide some content' },
        { status: 400 }
      )
    }

    // Generate with OpenAI
    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: `Create a LinkedIn post with ${tone} tone. Structure:
          - Engaging intro
          - 2-3 concise paragraphs
          - CTA question
          - 3-5 relevant hashtags`
        },
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
        output_text: post
      })

    if (error) throw error

    return Response.json({ post })

  } catch (error) {
    console.error('API Error:', error)
    return Response.json(
      { 
        error: 'Failed to generate post',
        details: error.message.includes('quota') 
          ? 'OpenAI credits exhausted' 
          : error.message
      },
      { status: 500 }
    )
  }
}