'use client'

import { useState, useEffect } from 'react'
import Script from 'next/script'
import GenerationForm from '../../components/GenerationForm'
import PostResult from '../../components/PostResult'

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
      setError({
        title: err.message,
        details: 'Please try again later',
      })
    } finally {
      setIsGenerating(false)
    }
  }

  return (
    <div className="w-full max-w-3xl mx-auto px-4 py-8 min-h-[calc(100vh-160px)]">
      <h1 className="text-3xl font-bold text-gray-900 mb-8 text-center">
        LinkedIn Post Generator
      </h1>

      {/* Always-on AdSense block only on generate page */}
      <div className="mb-6 text-center">
        <script
          id="adsbygoogle-init"
          strategy="afterInteractive"
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-3182066441920648"
          crossOrigin="anonymous"
        />
        <ins
          className="adsbygoogle"
          style={{ display: 'block' }}
          data-ad-client="ca-pub-3182066441920648"
          data-ad-slot="5702324134"
          data-ad-format="auto"
          data-full-width-responsive="true"
        />
        <script id="adsbygoogle-load" strategy="afterInteractive">
  {`
    (adsbygoogle = window.adsbygoogle || []).push({});
  `}
</script>
      </div>

      {/* Permanent Content Section for AdSense Compliance */}
      <section className="bg-white rounded-lg shadow p-6 mb-8">
        <h2 className="text-2xl font-semibold mb-2 text-indigo-700">
          Create Viral LinkedIn Posts with AI
        </h2>
        <p className="text-gray-700 mb-4">
          GenZPost helps you craft engaging, professional LinkedIn updates in seconds.
          Perfect for product announcements, career changes, thought leadership, or team spotlights.
        </p>
        <ul className="list-disc list-inside text-gray-600 mb-4">
          <li>Write 3-5 bullet points</li>
          <li>Select a tone: Professional, Casual, or Inspirational</li>
          <li>Generate a high-quality LinkedIn post instantly</li>
        </ul>
      </section>

      {/* Generation Form and Result */}
      <div className="space-y-8 w-full">
        <div className="bg-white rounded-xl shadow-lg p-8 w-full">
          {error && (
            <div className="mb-6 p-4 bg-red-50 border-l-4 border-red-500 rounded">
              <div className="flex items-center">
                <svg
                  className="h-5 w-5 text-red-500 mr-2"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                    clipRule="evenodd"
                  />
                </svg>
                <h3 className="text-sm font-medium text-red-800">{error.title}</h3>
              </div>
              <div className="mt-2 text-sm text-red-700">
                <p>{error.details}</p>
              </div>
            </div>
          )}

          <GenerationForm
            onSubmit={handleGenerate}
            isGenerating={isGenerating}
            remainingGenerations={remainingGenerations}
          />
        </div>

        {result && (
          <div className="bg-white rounded-xl shadow-lg p-8 w-full">
            <PostResult post={result.post} metadata={result.metadata} />
          </div>
        )}
      </div>
    </div>
  )
}
