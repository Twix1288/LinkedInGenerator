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
    const { text, tone = 'professional', clientId, imageUrl = '', linkUrl = '' } = await request.json()

    // Validate inputs
    if (!text?.trim()) {
      return Response.json(
        { error: 'Please provide some content' },
        { status: 400 }
      )
    }

    // Enhanced prompt with image/link handling
    const prompt = `Create a LinkedIn post with ${tone} tone. Follow this structure:
    - Engaging introduction
    - 2-3 concise paragraphs with key points
    - Call-to-action question
    - 3-5 relevant hashtags
    ${imageUrl ? '\nNote: Include a natural reference to an accompanying image.' : ''}
    ${linkUrl ? `\nInclude a call-to-action linking to: ${linkUrl}` : ''}`

    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        { role: "system", content: prompt },
        { role: "user", content: text }
      ],
      temperature: 0.7,
      max_tokens: 600
    })

    const post = completion.choices[0].message.content

    // Save to Supabase with all fields
    const { error } = await supabase
      .from('generations')
      .insert({
        client_id: clientId,
        input_text: text,
        tone,
        output_text: post,
        image_url: imageUrl,
        link_url: linkUrl,
        created_at: new Date().toISOString()
      })

    if (error) throw error

    return Response.json({ 
      post,
      metadata: {
        imageUrl,
        linkUrl
      }
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