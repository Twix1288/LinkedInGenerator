import Link from 'next/link'
import Image from 'next/image'

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50">
      <section className="py-20 px-4 max-w-6xl mx-auto text-center">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
          Craft Perfect LinkedIn Posts in Seconds
        </h1>
        <p className="text-xl text-gray-600 mb-10 max-w-3xl mx-auto">
          AI-powered post generation to boost your professional presence
        </p>
        <Link 
          href="/generate"
          className="inline-block px-8 py-4 bg-indigo-600 text-white rounded-lg text-lg font-medium hover:bg-indigo-700 transition-colors"
        >
          Start Generating Now
        </Link>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">How It Works</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-gray-50 p-6 rounded-lg">
              <div className="text-indigo-600 text-2xl mb-4">1</div>
              <h3 className="text-xl font-semibold mb-2">Enter Your Content</h3>
              <p className="text-gray-600">Share your bullet points or ideas</p>
            </div>
            <div className="bg-gray-50 p-6 rounded-lg">
              <div className="text-indigo-600 text-2xl mb-4">2</div>
              <h3 className="text-xl font-semibold mb-2">Choose Your Tone</h3>
              <p className="text-gray-600">Professional, Casual, or Inspirational</p>
            </div>
            <div className="bg-gray-50 p-6 rounded-lg">
              <div className="text-indigo-600 text-2xl mb-4">3</div>
              <h3 className="text-xl font-semibold mb-2">Get AI-Powered Post</h3>
              <p className="text-gray-600">Ready-to-share LinkedIn content</p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 px-4 text-center">
        <h2 className="text-3xl font-bold mb-6">Ready to Elevate Your LinkedIn Game?</h2>
        <Link 
          href="/generate"
          className="inline-block px-8 py-4 bg-indigo-600 text-white rounded-lg text-lg font-medium hover:bg-indigo-700 transition-colors"
        >
          Try It Now - Free
        </Link>
      </section>
    </div>
  )
}