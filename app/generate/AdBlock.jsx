'use client'

import { useEffect } from 'react'

export default function AdBlock() {
  useEffect(() => {
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({})
    } catch (e) {
      console.error('Adsbygoogle push error:', e)
    }
  }, [])

  return (
    <div className="text-center mb-4">
      <ins
        className="adsbygoogle"
        style={{ display: 'block' }}
        data-ad-client="ca-pub-3182066441920648"
        data-ad-slot="5702324134"
        data-ad-format="auto"
        data-full-width-responsive="true"
      />
    </div>
  )
}
