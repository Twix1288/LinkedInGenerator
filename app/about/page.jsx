import dynamic from 'next/dynamic'

const AdBlock = dynamic(() => import('./AdBlock'), { ssr: false })

export const metadata = {
  title: 'About GenZPost',
  description: 'Learn about our AI-powered LinkedIn post generator',
}

export default function AboutPage() {
  return (
    <div className="max-w-4xl mx-auto my-8 p-6 bg-white rounded-lg shadow">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">About GenZPost</h1>

      {/* Render AdSense on client only */}
      <AdBlock />

      <div className="prose max-w-none">
        <p className="text-lg leading-relaxed">
          GenZPost helps professionals create engaging LinkedIn posts in seconds using
          advanced AI technology. Our mission is to democratize high-quality content
          creation for everyone, empowering users to build their personal brand with ease and confidence.
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-4">Our Founder</h2>
        <div className="flex flex-col md:flex-row gap-6 items-start mb-8">
          <div className="w-full md:w-3/4">
            <h3 className="text-xl font-medium">Rishit Agnihotri</h3>
            <p className="text-gray-600 mt-2 leading-relaxed">
              Full-stack developer with expertise in AI applications. Built GenZPost to solve
              his own challenges with consistent LinkedIn content creation. Currently pursuing
              a BS in Computer Science at UCSC, Rishit combines technical skill and creative vision
              to help others succeed.
            </p>
            <p className="mt-3">
              Connect with Rishit on{' '}
              <a
                href="www.linkedin.com/in/rishit-agnihotri-b3096b152"
                target="_blank"
                rel="noopener noreferrer"
                className="text-indigo-600 hover:underline"
              >
                LinkedIn
              </a>
              .
            </p>
          </div>
        </div>

        <h2 className="text-2xl font-semibold mt-8 mb-4">How It Works</h2>
        <ol className="list-decimal pl-5 space-y-3">
          <li className="font-medium">Enter your bullet points or key ideas</li>
          <li className="font-medium">Add images/links (optional)</li>
          <li className="font-medium">Select your preferred tone and style</li>
          <li className="font-medium">Receive a polished, ready-to-post LinkedIn update</li>
        </ol>

        <h2 className="text-2xl font-semibold mt-8 mb-4">Our Technology</h2>
        <ul className="list-disc pl-5 space-y-2">
          <li>GPT-4 for natural language generation</li>
          <li>Next.js for blazing fast performance</li>
          <li>Supabase for secure data storage</li>
          <li>Tailwind CSS for beautiful and responsive UI</li>
        </ul>

        <h2 className="text-2xl font-semibold mt-8 mb-4">Learn More</h2>
        <p>
          For insights on AI in content creation, see this{' '}
          <a
            href="https://www.linkedin.com/pulse/how-ai-changing-linkedin-content-creation-john-doe/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-indigo-600 hover:underline"
          >
            expert article
          </a>{' '}
          about how AI is transforming LinkedIn posts and digital branding.
        </p>
      </div>
    </div>
  )
}
