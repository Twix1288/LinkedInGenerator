'use client'

import { useState, useEffect } from 'react'
import Script from 'next/script'
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
      setError({
        title: err.message,
        details: 'Please try again later'
      })
    } finally {
      setIsGenerating(false)
    }
  }

  return (
    <div className="w-full max-w-3xl mx-auto px-4 py-8 min-h-[calc(100vh-160px)]">
      <h1 className="text-3xl font-bold text-gray-900 mb-8 text-center">LinkedIn Post Generator</h1>

      {/* AdSense */}
      <AdBlock />
      {/* Static Content for Google */}
      <section className="bg-white rounded-lg shadow p-6 mb-8">
        <h2 className="text-2xl font-semibold text-indigo-700 mb-2">How GenZPost Works</h2>
        <p className="text-gray-700 mb-4">
          GenZPost helps you turn your bullet points into viral-ready LinkedIn posts using AI.
        </p>
        <ul className="list-disc pl-5 text-gray-600">
          <li>Write your 3–5 key ideas</li>
          <li>Choose a tone (e.g., professional or casual)</li>
          <li>Hit generate and post!</li>
        </ul>
      </section>

      {/* Generator */}
      <div className="bg-white rounded-xl shadow-lg p-8 w-full">
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
        <div className="bg-white rounded-xl shadow-lg p-8 w-full mt-8">
          <PostResult post={result.post} metadata={result.metadata} />
        </div>
      )}
    </div>
  )
}
