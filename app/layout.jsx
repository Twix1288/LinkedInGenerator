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
        {/* Google AdSense Auto Ads Script */}
        <Script
          id="adsbygoogle-init"
          strategy="afterInteractive"
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-3182066441920648"
          crossOrigin="anonymous"
        />
      </head>
      <body className={inter.className}>
        <SupabaseProvider>
          <div className="min-h-screen bg-gray-50 flex flex-col">
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
                </div>
              </div>
            </nav>
            
            <main className="max-w-6xl mx-auto px-4 py-8 flex-grow">
              {children}
            </main>
            
            {/* Footer with Legal Links */}
            <footer className="bg-white border-t py-6">
              <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center">
                <p className="text-gray-500 mb-4 md:mb-0">
                  © {new Date().getFullYear()} GenZPost. All rights reserved.
                </p>
                <div className="flex space-x-6">
                  <Link 
                    href="/legal" 
                    className="text-gray-600 hover:text-indigo-600 transition-colors text-sm"
                  >
                    Legal
                  </Link>
                  <Link 
                    href="/about" 
                    className="text-gray-600 hover:text-indigo-600 transition-colors text-sm"
                  >
                    About
                  </Link>
                  <Link 
                    href="/generate" 
                    className="text-gray-600 hover:text-indigo-600 transition-colors text-sm"
                  >
                    Generator
                  </Link>
                </div>
              </div>
            </footer>
          </div>
        </SupabaseProvider>
      </body>
    </html>
  )
}