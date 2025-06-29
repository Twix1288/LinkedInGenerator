'use client'

export default function PostResult({ post, metadata }) {
  const copyToClipboard = () => {
    navigator.clipboard.writeText(post)
  }

  return (
    <div className="space-y-6 w-full">
      <div className="flex justify-end">
        <button 
          onClick={copyToClipboard}
          className="text-sm text-indigo-600 hover:text-indigo-800 flex items-center"
        >
          <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
          </svg>
          Copy to Clipboard
        </button>
      </div>
      
      <div className="prose max-w-none w-full">
        <h3 className="text-xl font-semibold mb-4">{metadata?.title || 'Generated Post'}</h3>
        <p className="whitespace-pre-line">{post}</p>
      </div>
    </div>
  )
}