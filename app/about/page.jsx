import dynamic from 'next/dynamic'
const AdBlock = dynamic(() => import('../about/AdBlock'), { ssr: false })

export const metadata = {
  title: 'About GenZPost',
  description: 'Learn about our AI-powered LinkedIn post generator and team.',
}

export default function AboutPage() {
  return (
    <div className="max-w-6xl mx-auto my-12 px-6 md:px-12 lg:px-16 bg-white rounded-lg shadow-lg">
      <header className="text-center py-10">
        <h1 className="text-4xl font-extrabold text-indigo-700 mb-4">About GenZPost</h1>
        <p className="text-gray-600 max-w-3xl mx-auto text-lg">
          Empowering professionals with AI-generated LinkedIn posts that create impact and build personal brands.
        </p>
      </header>

      <section className="grid grid-cols-1 md:grid-cols-3 gap-10 items-center mb-12">
        <div className="md:col-span-1 flex justify-center">
          {/* Placeholder for founder image */}
          <img
            src="/images/founder.jpg"
            alt="Rishit Agnihotri"
            className="rounded-full w-48 h-48 object-cover shadow-md"
            loading="lazy"
          />
        </div>
        <div className="md:col-span-2 prose prose-indigo max-w-none">
          <h2 className="text-2xl font-semibold mb-3">Our Founder</h2>
          <p>
            Rishit Agnihotri is a full-stack developer and AI enthusiast who created GenZPost to solve his own challenges with consistent LinkedIn content creation. 
            Currently pursuing a BS in Computer Science at UCSC, Rishit combines technical skill and creative vision to help others succeed.
          </p>
          <p>
            Connect with Rishit on{' '}
            <a
              href="https://www.linkedin.com/in/rishit-agnihotri-b3096b152"
              target="_blank"
              rel="noopener noreferrer"
              className="text-indigo-600 hover:underline"
            >
              LinkedIn
            </a>
            .
          </p>
        </div>
      </section>

      <section className="mb-12 prose prose-indigo max-w-none">
        <h2 className="text-2xl font-semibold mb-4">How It Works</h2>
        <p>GenZPost uses AI technology to transform your ideas into polished, engaging LinkedIn posts in just a few clicks.</p>
        <ol className="list-decimal list-inside space-y-2">
          <li>Enter your bullet points or key ideas.</li>
          <li>Add optional images or links to support your post.</li>
          <li>Choose your preferred tone and style.</li>
          <li>Receive a ready-to-post LinkedIn update instantly.</li>
        </ol>
      </section>

      <section className="mb-12 prose prose-indigo max-w-none">
        <h2 className="text-2xl font-semibold mb-4">Our Technology</h2>
        <ul className="list-disc list-inside space-y-2">
          <li>Powered by GPT-4, the most advanced AI language model.</li>
          <li>Built with Next.js for fast and responsive user experience.</li>
          <li>Uses Supabase for secure and reliable data storage.</li>
          <li>Styled with Tailwind CSS for beautiful and mobile-friendly design.</li>
        </ul>
      </section>

      <section className="mb-12 prose prose-indigo max-w-none">
        <h2 className="text-2xl font-semibold mb-4">Learn More</h2>
        <p>
          For insights on AI and LinkedIn content creation, check out this{' '}
          <a
            href="https://www.linkedin.com/pulse/how-ai-changing-linkedin-content-creation-john-doe/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-indigo-600 hover:underline"
          >
            expert article
          </a>{' '}
          on how AI is revolutionizing digital branding.
        </p>
      </section>

      <AdBlock />
    </div>
  )
}