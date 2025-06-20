'use client';

import { useEffect } from 'react';
import Script from 'next/script';

export default function AdBanner() {
  useEffect(() => {
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch (err) {
      console.error('AdSense error:', err);
    }
  }, []);

  return (
    <div className="bg-white rounded-lg shadow p-4 border border-gray-200 mb-6">
      <div className="text-center">
        <p className="text-sm text-gray-500 mb-2">Advertisement</p>
        <div className="bg-gray-100 h-32 flex items-center justify-center">
          {/* AdSense Ad Unit */}
          <ins
            className="adsbygoogle"
            style={{ display: 'block' }}
            data-ad-client="ca-pub-3182066441920648"
            data-ad-slot="YOUR_AD_SLOT_ID"  // Replace with your actual ad slot
            data-ad-format="auto"
            data-full-width-responsive="true"
          />
        </div>
      </div>
      {/* Load AdSense script */}
      <Script
        strategy="afterInteractive"
        src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-3182066441920648"
        crossOrigin="anonymous"
      />
    </div>
  );
}