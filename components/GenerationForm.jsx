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
    <form onSubmit={handleSubmit} className="space-y-6 w-full">
      <div className="bg-blue-50 rounded-lg p-4 text-center">
        <p className="text-sm font-medium text-blue-800">
          Generations remaining: <span className="font-bold">{remainingGenerations}/3</span>
        </p>
        {remainingGenerations <= 0 && (
          <p className="text-xs text-red-600 mt-1">
            You've reached your daily generation limit
          </p>
        )}
      </div>

      <div className="space-y-4">
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
            rows={6}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
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
            className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            placeholder="https://example.com"
            value={formData.linkUrl}
            onChange={(e) => setFormData({...formData, linkUrl: e.target.value})}
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Select a Tone
          </label>
          <select
            className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            value={formData.tone}
            onChange={(e) => setFormData({...formData, tone: e.target.value})}
          >
            {TONES.map((tone) => (
              <option key={tone.value} value={tone.value}>
                {tone.label}
              </option>
            ))}
          </select>
        </div>
      </div>
      
      <button
        type="submit"
        disabled={isGenerating || remainingGenerations <= 0 || formData.text.length > MAX_CHARS}
        className={`w-full py-3 px-4 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-lg shadow-sm transition-colors ${
          (isGenerating || remainingGenerations <= 0 || formData.text.length > MAX_CHARS) 
            ? 'opacity-70 cursor-not-allowed' 
            : 'hover:shadow-md'
        }`}
      >
        {isGenerating ? (
          <span className="flex items-center justify-center">
            <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Generating...
          </span>
        ) : 'Generate Post'}
      </button>
    </form>
  )
}