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
            <nav className="bg-white shadow-sm sticky top-0 z-50">
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
                  <Link href="/legal" className="text-gray-600 hover:text-indigo-600">
                    Legal
                  </Link>
                </div>
              </div>
            </nav>

            <main className="flex-grow max-w-6xl mx-auto px-4 py-8 w-full">{children}</main>

            <footer className="bg-white border-t mt-10">
              <div className="max-w-6xl mx-auto px-4 py-6 flex flex-col md:flex-row justify-between text-sm text-gray-500">
                <div>&copy; {new Date().getFullYear()} GenZPost</div>
                <div className="space-x-4 mt-2 md:mt-0">
                  <Link href="/about" className="hover:underline">About</Link>
                  <Link href="/legal" className="hover:underline">Legal</Link>
                </div>
              </div>
            </footer>
          </div>
        </SupabaseProvider>
      </body>
    </html>
  )
}
