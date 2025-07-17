import './globals.css'
import { Inter } from 'next/font/google'
import Link from 'next/link'
import { SupabaseProvider } from './supabase-client'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'GenZPost - LinkedIn Post Generator',
  description: 'Create viral LinkedIn posts using AI. Perfect for Gen Z, founders, and professionals.',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        {/* Google AdSense verification */}
        <meta name="google-adsense-account" content="ca-pub-3182066441920648" />
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-3182066441920648"
          crossOrigin="anonymous"
        ></script>
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
                  <Link href="/generate" className="text-gray-600 hover:text-indigo-600">
                    Generator
                  </Link>
                  <Link href="/about" className="text-gray-600 hover:text-indigo-600">
                    About
                  </Link>
                  <Link href="/blog" className="text-gray-600 hover:text-indigo-600">
                    Blog
                  </Link>
                  <Link href="/legal" className="text-gray-600 hover:text-indigo-600">
                    Legal
                  </Link>
                </div>
              </div>
            </nav>

            <main className="max-w-6xl mx-auto px-4 py-8 flex-grow">{children}</main>

            <footer className="bg-white border-t mt-10">
              <div className="max-w-6xl mx-auto px-4 py-6 flex justify-between text-sm text-gray-500">
                <div>&copy; {new Date().getFullYear()} GenZPost</div>
                <div className="space-x-4">
                  <Link href="/about">About</Link>
                  <Link href="/legal">Legal</Link>
                  <Link href="/blog">Blog</Link>
                </div>
              </div>
            </footer>
          </div>
        </SupabaseProvider>
      </body>
    </html>
  )
}
