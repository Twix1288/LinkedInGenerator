'use client'

import { useState, useEffect } from 'react'
import GenerationForm from '../../components/GenerationForm'
import PostResult from '../../components/PostResult'
import dynamic from 'next/dynamic'

const AdBlock = dynamic(() => import('../generate/AdBlock'), { ssr: false })

export default function GeneratePage() {
  const [result, setResult] = useState(null)
  const [isGenerating, setIsGenerating] = useState(false)
  const [error, setError] = useState(null)
  const [clientId, setClientId] = useState('')
  const [remainingGenerations, setRemainingGenerations] = useState(3)

  useEffect(() => {
    const id = localStorage.getItem('clientId') || crypto.randomUUID()
    localStorage.setItem('clientId', id)
    setClientId(id)
    checkGenerationsLimit(id)
  }, [])

  const checkGenerationsLimit = async (id) => {
    try {
      const response = await fetch('/api/check-limit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ clientId: id }),
      })
      const data = await response.json()
      setRemainingGenerations(data.remaining)
    } catch (err) {
      console.error('Failed to check limit:', err)
    }
  }

  const handleGenerate = async (formData) => {
    setIsGenerating(true)
    setError(null)

    try {
      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, clientId }),
      })

      const data = await response.json()
      if (!response.ok) throw new Error(data.error || 'API request failed')

      setResult(data)
      setRemainingGenerations((prev) => Math.max(0, prev - 1))
    } catch (err) {
      setError({ title: err.message, details: 'Please try again later' })
    } finally {
      setIsGenerating(false)
    }
  }

  return (
    <div className="w-full max-w-3xl mx-auto px-4 py-8 min-h-[calc(100vh-160px)]">
      <h1 className="text-3xl font-bold text-gray-900 mb-8 text-center">LinkedIn Post Generator</h1>

      {/* Static content for SEO and users */}
      <section className="bg-white rounded-lg shadow p-6 mb-8 prose prose-indigo">
        <h2>How It Works</h2>
        <p>GenZPost uses AI to turn your thoughts into high-impact LinkedIn posts in seconds.</p>
        <ul>
          <li>Write your key ideas or bullet points</li>
          <li>Select a tone (professional, casual, inspirational)</li>
          <li>Click generate — that’s it!</li>
        </ul>

        <h3>Example Posts:</h3>
        <div className="bg-gray-50 p-4 rounded mb-2">🚀 Excited to share I’ve accepted an internship at Microsoft this summer! #growth #cs</div>
        <div className="bg-gray-50 p-4 rounded mb-2">From zero to 1,000+ impressions on my first post with GenZPost. Game-changing. 🙌</div>
        <div className="bg-gray-50 p-4 rounded mb-2">College taught me Java. GenZPost taught me how to connect with real people. 💡</div>
      </section>

      {/* Ad after meaningful content */}
      <AdBlock />

      {/* Generator form */}
      <div className="bg-white rounded-xl shadow-lg p-8 w-full mt-8">
        {error && (
          <div className="mb-6 p-4 bg-red-50 border-l-4 border-red-500 rounded">
            <h3 className="text-sm font-medium text-red-800">{error.title}</h3>
            <p className="text-sm text-red-700 mt-1">{error.details}</p>
          </div>
        )}
        <GenerationForm
          onSubmit={handleGenerate}
          isGenerating={isGenerating}
          remainingGenerations={remainingGenerations}
        />
      </div>

      {result && (
        <div className="bg-white rounded-xl shadow-lg p-8 w-full mt-8 prose prose-indigo">
          <PostResult post={result.post} metadata={result.metadata} />
        </div>
      )}

      {/* FAQ Section */}
      <section className="max-w-3xl mx-auto mt-12 bg-white rounded-lg shadow p-6 prose prose-indigo">
        <h2>Frequently Asked Questions</h2>
        <dl className="space-y-4">
          <div>
            <dt className="font-semibold">What is GenZPost?</dt>
            <dd>GenZPost is an AI-powered tool that helps you create engaging LinkedIn posts quickly by turning your ideas into polished content.</dd>
          </div>
          <div>
            <dt className="font-semibold">How does the AI generate posts?</dt>
            <dd>We use advanced GPT-4 natural language processing to understand your input and generate professional, casual, or inspirational posts tailored to your tone choice.</dd>
          </div>
          <div>
            <dt className="font-semibold">Is my data safe?</dt>
            <dd>Yes, we use secure Supabase databases and never share your data without consent.</dd>
          </div>
        </dl>
      </section>
    </div>
  )
}
