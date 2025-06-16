'use client'
import { useState } from 'react'

export default function PostResult({ post, metadata }) {
  const [isCopied, setIsCopied] = useState(false)

  const copyToClipboard = () => {
    navigator.clipboard.writeText(post)
    setIsCopied(true)
    setTimeout(() => setIsCopied(false), 2000)
  }

  return (
    <div className="bg-white rounded-lg shadow overflow-hidden">
      <div className="p-4 border-b border-gray-200 bg-gray-50 flex justify-between items-center">
        <h3 className="text-lg font-medium text-gray-900">Generated Post</h3>
        <button
          onClick={copyToClipboard}
          className="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          {isCopied ? '✓ Copied' : 'Copy to Clipboard'}
        </button>
      </div>
      <div className="p-4 prose max-w-none whitespace-pre-line">
        {post}
      </div>
      
      {/* Image URL section */}
      {metadata?.imageUrl && (
        <div className="px-4 py-3 border-t border-gray-200 bg-gray-50">
          <h4 className="text-sm font-medium text-gray-700 mb-1">Image Reference</h4>
          <p className="text-sm text-gray-600 break-all">{metadata.imageUrl}</p>
        </div>
      )}
      
      {/* Link URL section */}
      {metadata?.linkUrl && (
        <div className="px-4 py-3 border-t border-gray-200 bg-gray-50">
          <h4 className="text-sm font-medium text-gray-700 mb-1">Included Link</h4>
          <p className="text-sm text-gray-600 break-all">{metadata.linkUrl}</p>
        </div>
      )}
      
      <div className="px-4 py-3 bg-gray-50 text-right text-sm text-gray-500 border-t border-gray-200">
        {post.length} characters
      </div>
    </div>
  )
}