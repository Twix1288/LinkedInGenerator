import './globals.css'
import { Inter } from 'next/font/google'
import Link from 'next/link'
import { SupabaseProvider } from './supabase-client'
import Script from 'next/script'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'GenZPost - LinkedIn Post Generator',
  description: 'Create viral LinkedIn posts with AI',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        {/* Google AdSense Script */}
        <Script
          id="adsbygoogle-init"
          strategy="afterInteractive"
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-3182066441920648"
          crossOrigin="anonymous"
        />
        <meta name="google-adsense-account" content="ca-pub-3182066441920648"/>
      </head>
      <body className={inter.className}>
        <SupabaseProvider>
          <div className="min-h-screen bg-gray-50">
            <nav className="bg-white shadow-sm">
              <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
                <Link href="/" className="text-xl font-bold text-indigo-600 hover:text-indigo-800">
                  GenZPost
                </Link>
                
                <div className="flex space-x-6">
                  <Link 
                    href="/generate" 
                    className="text-gray-600 hover:text-indigo-600 transition-colors"
                  >
                    Generator
                  </Link>
                  <Link 
                    href="/about" 
                    className="text-gray-600 hover:text-indigo-600 transition-colors"
                  >
                    About
                  </Link>
                  <Link 
                    href="/legal" 
                    className="text-gray-600 hover:text-indigo-600 transition-colors"
                  >
                    Legal
                  </Link>
                </div>
              </div>
            </nav>
            <main className="max-w-6xl mx-auto px-4 py-8">
              {children}
            </main>
            
            {/* AdSense Ad Unit - Place where you want ads to appear */}
            <div className="max-w-6xl mx-auto px-4 py-8 text-center">
              <Script
                id="adsbygoogle-ad"
                strategy="afterInteractive"
                dangerouslySetInnerHTML={{
                  __html: `
                    (adsbygoogle = window.adsbygoogle || []).push({
                      google_ad_client: "ca-pub-3182066441920648",
                      enable_page_level_ads: true
                    });
                  `
                }}
              />
              <ins className="adsbygoogle"
                style={{ display: 'block' }}
                data-ad-client="ca-pub-3182066441920648"
                data-ad-slot="5702324134"
                data-ad-format="auto"
                data-full-width-responsive="true"></ins>
            </div>
          </div>
        </SupabaseProvider>
      </body>
    </html>
  )
}