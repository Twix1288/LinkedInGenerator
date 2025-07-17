import Link from 'next/link'
import dynamic from 'next/dynamic'

const AdBlock = dynamic(() => import('./AdBlock'), { ssr: false })

export const metadata = {
  title: 'GenZPost - LinkedIn Post Generator',
  description: 'Create viral LinkedIn posts using AI. Perfect for Gen Z, founders, and professionals.',
}

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* AdSense Ad only on home page */}
      <AdBlock />

      {/* Hero Section */}
      <section className="py-20 px-4 max-w-6xl mx-auto text-center">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
          Craft Perfect LinkedIn Posts in Seconds
        </h1>
        <p className="text-xl text-gray-600 mb-10 max-w-3xl mx-auto leading-relaxed">
          AI-powered post generation to boost your professional presence. Used by marketers, 
          founders, and recruiters to save hours of writing time.
        </p>
        <Link
          href="/generate"
          className="inline-block px-8 py-4 bg-indigo-600 text-white rounded-lg text-lg font-medium hover:bg-indigo-700 transition-colors"
        >
          Start Generating Now
        </Link>
      </section>

      {/* Value Proposition */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">How It Works</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-gray-50 p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow">
              <div className="text-indigo-600 text-3xl font-bold mb-4">1</div>
              <h3 className="text-xl font-semibold mb-2">Enter Your Content</h3>
              <p className="text-gray-600 leading-relaxed">
                Share your bullet points or ideas quickly and easily.
              </p>
            </div>
            <div className="bg-gray-50 p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow">
              <div className="text-indigo-600 text-3xl font-bold mb-4">2</div>
              <h3 className="text-xl font-semibold mb-2">Choose Your Tone</h3>
              <p className="text-gray-600 leading-relaxed">
                Select from professional, casual, inspirational, or customize your style.
              </p>
            </div>
            <div className="bg-gray-50 p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow">
              <div className="text-indigo-600 text-3xl font-bold mb-4">3</div>
              <h3 className="text-xl font-semibold mb-2">Get AI-Powered Post</h3>
              <p className="text-gray-600 leading-relaxed">
                Receive a polished, ready-to-share LinkedIn update that drives engagement.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Case Studies */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8">Why Professionals Choose Us</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition-shadow">
              <h3 className="text-xl font-semibold mb-3">AI-Trained on Top Performers</h3>
              <p className="text-gray-600 leading-relaxed">
                Our AI analyzes thousands of high-engagement LinkedIn posts to deliver proven frameworks that get 3x more impressions than average content.
              </p>
              <a
                href="https://www.linkedin.com/pulse/how-ai-changing-linkedin-content-creation-john-doe/"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-3 inline-block text-indigo-600 hover:underline font-semibold"
              >
                Learn more about AI and LinkedIn
              </a>
            </div>
            <div className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition-shadow">
              <h3 className="text-xl font-semibold mb-3">Real User Results</h3>
              <p className="text-gray-600 leading-relaxed">
                "Used GenZPost for my first LinkedIn post and it gave me a great start into how to make posts." – Anonymous High School Student
              </p>
              <p className="mt-4 italic text-gray-500">
                “The posts generated helped me triple my profile views in weeks.” – User
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 px-4 text-center bg-white">
        <h2 className="text-3xl font-bold mb-6">Ready to Elevate Your LinkedIn Game?</h2>
        <p className="text-gray-700 max-w-2xl mx-auto mb-8 leading-relaxed">
          Whether you're a student, founder, recruiter, or marketer, GenZPost makes professional content creation effortless and effective.
        </p>
        <Link
          href="/generate"
          className="inline-block px-10 py-4 bg-indigo-600 text-white rounded-lg text-lg font-semibold hover:bg-indigo-700 transition-colors"
        >
          Try It Now – Free
        </Link>
      </section>

      {/* Footer-like Navigation Links for SEO */}
      <section className="py-10 bg-gray-50 text-center text-sm text-gray-500">
        <p>
          Explore more: {' '}
          <Link href="/about" className="hover:underline text-indigo-600">About</Link>
          <Link href="/legal" className="hover:underline text-indigo-600">Legal</Link>
        </p>
      </section>
    </div>
  )
}
