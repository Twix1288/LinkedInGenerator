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
    const { text, tone, imageUrl, linkUrl, session_id } = await request.json()
    
    // Validate input
    if (!text || text.trim().length < 10) {
      return Response.json(
        { error: 'Please provide at least 10 characters' },
        { status: 400 }
      )
    }

    // Check rate limit
    const { data: count, error: countError } = await supabase.rpc('count_todays_generations', { 
      session_id 
    })
    
    if (countError) throw countError
    if (count >= 3) {
      return Response.json(
        { error: 'Daily limit reached (3 posts)' },
        { status: 429 }
      )
    }

    // Build prompt
    let prompt = `Create a LinkedIn post (max 1500 chars) with these points:\n${text}\n\n`
    prompt += `Tone: ${tone}\n`
    if (imageUrl) prompt += `Include a natural reference to the attached image\n`
    if (linkUrl) prompt += `Include this link contextually: ${linkUrl}\n`

    // Generate content
    const completion = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        { 
          role: "system", 
          content: "You are a professional LinkedIn content creator. Generate engaging posts." 
        },
        { role: "user", content: prompt }
      ],
      temperature: 0.7,
      max_tokens: 500
    })

    const post = completion.choices[0].message.content

    // Save to database
    const { error: dbError } = await supabase
      .from('generations')
      .insert({
        session_id,
        input_text: text,
        image_url: imageUrl,
        link_url: linkUrl,
        tone,
        output_text: post,
        created_at: new Date().toISOString()
      })

    if (dbError) throw dbError

    return Response.json({ post }, { status: 200 })

  } catch (error) {
    console.error('Generation error:', error)
    return Response.json(
      { error: error.message || 'Failed to generate post' },
      { status: 500 }
    )
  }
}