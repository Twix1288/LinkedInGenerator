'use client'
import { useState } from 'react'
import { useSupabase } from '../supabase-client'
import GenerationForm from '../../components/GenerationForm'
import PostResult from '../../components/PostResult'
import Counter from '../../components/Counter'
import AdBanner from '../../components/AdBanner'
import Link from 'next/link'

export default function GeneratePage() {
  const { supabase, session } = useSupabase()
  const [result, setResult] = useState(null)
  const [isGenerating, setIsGenerating] = useState(false)
  const [error, setError] = useState(null)
  const [remainingGenerations, setRemainingGenerations] = useState(3)

  const handleGenerate = async (formData) => {
    setIsGenerating(true)
    setError(null)
    
    try {
      if (remainingGenerations <= 0) {
        throw new Error('You have reached your daily limit of 3 generations')
      }

      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          ...formData, 
          session_id: session?.user?.id 
        })
      })

      const data = await response.json()
      
      if (!response.ok) {
        throw new Error(data.error || 'Generation failed')
      }

      setResult(data.post)
      setRemainingGenerations(remainingGenerations - 1)

      await supabase.from('generations').insert({
        session_id: session?.user?.id,
        input_text: formData.text,
        image_url: formData.imageUrl,
        link_url: formData.linkUrl,
        tone: formData.tone,
        output_text: data.post,
        created_at: new Date().toISOString()
      })

    } catch (err) {
      setError(err.message)
      console.error('Generation error:', err)
    } finally {
      setIsGenerating(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold text-gray-900">LinkedIn Post Generator</h1>
          <Link 
            href="/" 
            className="text-indigo-600 hover:text-indigo-800 text-sm font-medium"
          >
            ← Back to Home
          </Link>
        </div>

        <div className="space-y-8">
          <div className="bg-white rounded-lg shadow p-6">
            <Counter remaining={remainingGenerations} />
            <GenerationForm 
              onSubmit={handleGenerate} 
              isGenerating={isGenerating} 
              error={error} 
            />
          </div>
          
          {result && (
            <div className="space-y-4">
              <PostResult post={result} />
              <AdBanner />
            </div>
          )}
        </div>
      </div>
    </div>
  )
}