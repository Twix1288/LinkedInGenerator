'use client'
import { useState, useEffect } from 'react'
import GenerationForm from '../../components/GenerationForm'
import PostResult from '../../components/PostResult'
import dynamic from 'next/dynamic'

const AdBlock = dynamic(() => import('./AdBlock'), { ssr: false })

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
        body: JSON.stringify({ clientId: id })
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
        body: JSON.stringify({ ...formData, clientId })
      })

      const data = await response.json()
      if (!response.ok) throw new Error(data.error || 'API request failed')

      setResult(data)
      setRemainingGenerations(prev => Math.max(0, prev - 1))
    } catch (err) {
      setError({ title: err.message, details: 'Please try again later' })
    } finally {
      setIsGenerating(false)
    }
  }

  return (
    <main className="max-w-3xl mx-auto px-4 py-8 min-h-[calc(100vh-160px)] prose prose-indigo">
      <h1 className="text-3xl font-bold text-gray-900 mb-8 text-center">LinkedIn Post Generator</h1>

      {/* Explanation and Examples */}
      <section className="bg-white rounded-lg shadow p-6 mb-8">
        <h2 className="text-2xl font-semibold text-indigo-700 mb-4">How It Works</h2>
        <p className="text-gray-700 mb-4">
          GenZPost uses AI to transform your ideas into compelling LinkedIn posts that engage your audience.
        </p>
        <ul className="list-disc pl-6 text-gray-600 mb-6">
          <li>Write your key ideas or bullet points</li>
          <li>Select a tone (professional, casual, inspirational)</li>
          <li>Click generate — and get your post instantly!</li>
        </ul>

        <h3 className="text-xl font-bold text-gray-800 mb-3">Example Posts:</h3>
        <div className="bg-gray-50 p-4 rounded mb-2">🚀 Excited to share I’ve accepted an internship at Microsoft this summer! #growth #cs</div>
        <div className="bg-gray-50 p-4 rounded mb-2">From zero to 1,000+ impressions on my first post with GenZPost. Game-changing. 🙌</div>
        <div className="bg-gray-50 p-4 rounded mb-2">College taught me Java. GenZPost taught me how to connect with real people. 💡</div>
      </section>

      <AdBlock />

      {/* Generator Form */}
      <section className="bg-white rounded-xl shadow-lg p-8 w-full">
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
      </section>

      {/* Post Result */}
      {result && (
        <section className="bg-white rounded-xl shadow-lg p-8 w-full mt-8">
          <PostResult post={result.post} metadata={result.metadata} />
        </section>
      )}
    </main>
  )
}
