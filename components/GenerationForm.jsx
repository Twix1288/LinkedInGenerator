'use client'
import { useState } from 'react'

const TONES = [
  { value: 'professional', label: 'Professional' },
  { value: 'motivational', label: 'Motivational' },
  { value: 'celebratory', label: 'Celebratory' },
  { value: 'leadership', label: 'Leadership' },
  { value: 'brag', label: 'Brag' }
]

export default function GenerationForm({ onSubmit, isGenerating, remainingGenerations }) {
  const [formData, setFormData] = useState({
    text: '',
    tone: 'professional',
    linkUrl: ''
  })

  const MAX_CHARS = 1500

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!formData.text.trim() || remainingGenerations <= 0) return
    onSubmit(formData)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="text-center p-2 bg-blue-50 rounded-md">
        <p className="text-sm font-medium text-blue-800">
          Generations remaining: <span className="font-bold">{remainingGenerations}/3</span>
        </p>
        {remainingGenerations <= 0 && (
          <p className="text-xs text-red-600 mt-1">
            You've reached your daily generation limit
          </p>
        )}
      </div>

      <div>
        <div className="flex justify-between items-center mb-1">
          <label className="block text-sm font-medium text-gray-700">
            Post Content
          </label>
          <span className={`text-xs ${formData.text.length > MAX_CHARS ? 'text-red-600' : 'text-gray-500'}`}>
            {formData.text.length}/{MAX_CHARS}
          </span>
        </div>
        <textarea
          rows={5}
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          placeholder="Share your key points..."
          value={formData.text}
          onChange={(e) => {
            if (e.target.value.length <= MAX_CHARS) {
              setFormData({...formData, text: e.target.value})
            }
          }}
          required
        />
        {formData.text.length >= MAX_CHARS && (
          <p className="mt-1 text-xs text-red-600">
            Maximum {MAX_CHARS} characters reached
          </p>
        )}
      </div>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Link URL (optional)
        </label>
        <input
          type="url"
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          placeholder="https://example.com"
          value={formData.linkUrl}
          onChange={(e) => setFormData({...formData, linkUrl: e.target.value})}
        />
      </div>
      
      <div className="w-full">
        <label className="block text-sm font-semibold text-gray-800 mb-2">
          Select a Tone
        </label>
        <div className="relative">
          <select
            className="w-full appearance-none px-4 py-2 pr-10 bg-white border border-gray-300 rounded-lg shadow-sm text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition duration-150 ease-in-out"
            value={formData.tone}
            onChange={(e) => setFormData({...formData, tone: e.target.value})}
          >
            {TONES.map((tone) => (
              <option key={tone.value} value={tone.value}>
                {tone.label}
              </option>
            ))}
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-gray-400">
            <svg className="w-4 h-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </div>
      </div>
      
      <button
        type="submit"
        disabled={isGenerating || remainingGenerations <= 0 || formData.text.length > MAX_CHARS}
        className={`w-full py-3 px-4 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 ${
          (isGenerating || remainingGenerations <= 0 || formData.text.length > MAX_CHARS) ? 'opacity-75 cursor-not-allowed' : ''
        }`}
      >
        {isGenerating ? 'Generating...' : 'Generate Post'}
      </button>
    </form>
  )
}