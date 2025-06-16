'use client'
import { useState } from 'react'

const TONES = [
  { value: 'professional', label: 'Professional' },
  { value: 'motivational', label: 'Motivational' },
  { value: 'celebratory', label: 'Celebratory' },
  { value: 'thought-leadership', label: 'Thought Leadership' },
  { value: 'humble-brag', label: 'Humble Brag' }
]

export default function GenerationForm({ onSubmit, isGenerating }) {
  const [formData, setFormData] = useState({
    text: '',
    tone: 'professional'
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!formData.text.trim()) return
    onSubmit(formData)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Post Content
        </label>
        <textarea
          rows={5}
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          placeholder="Share your key points..."
          value={formData.text}
          onChange={(e) => setFormData({...formData, text: e.target.value})}
          required
        />
      </div>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Tone
        </label>
        <select
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
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
      
      <button
        type="submit"
        disabled={isGenerating}
        className={`w-full py-3 px-4 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 ${
          isGenerating ? 'opacity-75 cursor-not-allowed' : ''
        }`}
      >
        {isGenerating ? (
          <span className="flex items-center justify-center">
            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
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