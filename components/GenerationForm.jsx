'use client'

import { useState } from 'react'
import { TONES } from '../lib/constants'

export default function GenerationForm({ onSubmit, isGenerating, error }) {
  const [text, setText] = useState('')
  const [tone, setTone] = useState('Professional')
  const [linkUrl, setLinkUrl] = useState('')
  const [image, setImage] = useState(null)
  const [isUploading, setIsUploading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    let imageUrl = null
    if (image) {
      setIsUploading(true)
      try {
        const formData = new FormData()
        formData.append('file', image)
        
        const response = await fetch('/api/upload', {
          method: 'POST',
          body: formData,
        })
        
        if (!response.ok) throw new Error(await response.text())
        const { url } = await response.json()
        imageUrl = url
      } catch (err) {
        console.error('Upload failed:', err)
      } finally {
        setIsUploading(false)
      }
    }
    
    onSubmit({ text, tone, linkUrl, imageUrl })
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && <div className="p-3 bg-red-50 text-red-700 rounded-md text-sm">{error}</div>}
      
      <div>
        <label htmlFor="text" className="block text-sm font-medium text-gray-700 mb-1">
          Your bullet points or summary
        </label>
        <textarea
          id="text"
          rows={4}
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          placeholder="Example: Just completed a major project..."
          value={text}
          onChange={(e) => setText(e.target.value)}
          required
        />
      </div>
      
      <div>
        <label htmlFor="tone" className="block text-sm font-medium text-gray-700 mb-1">
          Tone
        </label>
        <select
          id="tone"
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          value={tone}
          onChange={(e) => setTone(e.target.value)}
        >
          {TONES.map((tone) => (
            <option key={tone} value={tone}>{tone}</option>
          ))}
        </select>
      </div>
      
      <div>
        <label htmlFor="link" className="block text-sm font-medium text-gray-700 mb-1">
          Link URL (optional)
        </label>
        <input
          type="url"
          id="link"
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          placeholder="https://example.com"
          value={linkUrl}
          onChange={(e) => setLinkUrl(e.target.value)}
        />
      </div>
      
      <div>
        <label htmlFor="image" className="block text-sm font-medium text-gray-700 mb-1">
          Image (optional, max 2MB)
        </label>
        <input
          type="file"
          id="image"
          className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100"
          accept="image/*"
          onChange={(e) => e.target.files[0]?.size > 2 * 1024 * 1024 ? 
            alert('Image must be less than 2MB') : setImage(e.target.files[0])}
        />
      </div>
      
      <div>
        <button
          type="submit"
          disabled={isGenerating || isUploading}
          className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isGenerating || isUploading ? 'Processing...' : 'Generate LinkedIn Post'}
        </button>
      </div>
    </form>
  )
}