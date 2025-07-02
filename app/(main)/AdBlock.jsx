'use client'

import Script from 'next/script'

export default function AdBlock() {
  // Function to push adsbygoogle after the script loads
  const handleAdsLoad = () => {
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({})
    } catch (e) {
      console.error('Adsbygoogle push error:', e)
    }
  }

  return (
    <div className="text-center mb-4">
      <Script
        strategy="afterInteractive"
        src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-3182066441920648"
        crossOrigin="anonymous"
        onLoad={handleAdsLoad}
      />
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
