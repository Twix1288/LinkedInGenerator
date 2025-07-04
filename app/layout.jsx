// app/layout.js
import './globals.css'
import { Inter } from 'next/font/google'
import Link from 'next/link'
import { SupabaseProvider } from './supabase-client'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'GenZPost - LinkedIn Post Generator',
  description: 'Create viral LinkedIn posts with AI',
}
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        {/* Verification meta for AdSense */}
        <meta
          name="google-adsense-account"
          content="ca-pub-3182066441920648"
        />
        {/* Core AdSense script load */}
        <script
          strategy="beforeInteractive"
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-3182066441920648"
          crossOrigin="anonymous"
        />
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
                  <Link href="/generate" className="text-gray-600 hover:text-indigo-600 transition-colors">
                    Generator
                  </Link>
                  <Link href="/about" className="text-gray-600 hover:text-indigo-600 transition-colors">
                    About
                  </Link>
                  <Link href="/legal" className="text-gray-600 hover:text-indigo-600 transition-colors">
                    Legal
                  </Link>
                </div>
              </div>
            </nav>
            <main className="max-w-6xl mx-auto px-4 py-8">{children}</main>
          </div>
        </SupabaseProvider>
      </body>
    </html>
  )
}
