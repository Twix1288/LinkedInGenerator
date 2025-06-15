'use client'

import { useState } from 'react'

export default function PostResult({ post }) {
  const [isCopied, setIsCopied] = useState(false)

  const copyToClipboard = () => {
    navigator.clipboard.writeText(post)
    setIsCopied(true)
    setTimeout(() => setIsCopied(false), 2000)
  }

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-medium text-gray-900">Your LinkedIn Post</h2>
        <button
          onClick={copyToClipboard}
          className="inline-flex items-center px-3 py-1 border border-transparent text-xs font-medium rounded shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          {isCopied ? 'Copied!' : 'Copy to Clipboard'}
        </button>
      </div>
      <div className="prose max-w-none whitespace-pre-line p-4 bg-gray-50 rounded">
        {post}
      </div>
      <div className="mt-4 text-sm text-gray-500">
        <p>Character count: {post.length}/1500</p>
      </div>
    </div>
  )
}