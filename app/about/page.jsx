import dynamic from 'next/dynamic'

const AdBlock = dynamic(() => import('./AdBlock'), { ssr: false })

export const metadata = {
  title: 'About GenZPost',
  description: 'Discover how GenZPost uses cutting-edge AI to help professionals craft impactful LinkedIn posts easily.',
}

export default function AboutPage() {
  return (
    <main className="max-w-4xl mx-auto my-12 p-8 bg-white rounded-lg shadow-lg prose prose-indigo prose-lg">
      <h1 className="text-4xl font-bold mb-8">About GenZPost</h1>

      <AdBlock />

      <section>
        <p>
          GenZPost empowers professionals, students, founders, and marketers by transforming
          their raw ideas into polished, engaging LinkedIn posts in seconds — no writing
          expertise required. Using advanced AI technology, we democratize content creation,
          helping you amplify your professional brand with ease and confidence.
        </p>
        <p>
          Whether you’re sharing accomplishments, insights, or company updates, GenZPost
          delivers tailored posts optimized for LinkedIn engagement.
        </p>
      </section>

      <section className="mt-12">
        <h2 className="text-3xl font-semibold mb-6">Meet Our Founder</h2>
        <div className="flex flex-col md:flex-row items-start gap-8">
          <div className="w-36 h-36 bg-gray-200 rounded-full mx-auto md:mx-0 flex-shrink-0">
            {/* Replace with actual founder photo */}
          </div>
          <div>
            <h3 className="text-2xl font-medium">Rishit Agnihotri</h3>
            <p className="mt-3 text-gray-700 leading-relaxed">
              Rishit is a passionate full-stack developer and AI enthusiast who created GenZPost
              to overcome his own challenges with consistent content creation on LinkedIn.
              Currently pursuing a Bachelor of Science in Computer Science at UCSC, he
              combines deep technical expertise with a vision to help others build authentic
              professional voices effortlessly.
            </p>
            <p className="mt-2 text-gray-600 italic text-sm">
              Connect with Rishit on LinkedIn to follow the journey and latest updates.
            </p>
          </div>
        </div>
      </section>

      <section className="mt-12">
        <h2 className="text-3xl font-semibold mb-6">How GenZPost Works</h2>
        <ol className="list-decimal pl-6 space-y-4 text-gray-700">
          <li>
            <strong>Input Your Ideas:</strong> Start by sharing bullet points, key accomplishments,
            or thoughts you'd like to express.
          </li>
          <li>
            <strong>Customize Your Post:</strong> Optionally add images or links to enrich your post,
            and choose your tone — professional, casual, or inspirational.
          </li>
          <li>
            <strong>Generate AI-Powered Content:</strong> Our AI crafts a polished LinkedIn post
            that reflects your voice and goals.
          </li>
          <li>
            <strong>Review and Share:</strong> Preview the result, make edits if needed, then post
            it directly to LinkedIn or save it for later.
          </li>
        </ol>
      </section>

      <section className="mt-12">
        <h2 className="text-3xl font-semibold mb-6">Our Technology Stack</h2>
        <ul className="list-disc pl-6 space-y-3 text-gray-700">
          <li><strong>GPT-4:</strong> State-of-the-art natural language processing for human-like content.</li>
          <li><strong>Next.js:</strong> Fast, SEO-friendly framework for optimal user experience.</li>
          <li><strong>Supabase:</strong> Secure and scalable backend for data and authentication.</li>
          <li><strong>Tailwind CSS:</strong> Modern, responsive UI styling framework.</li>
          <li><strong>Google AdSense:</strong> Supports platform growth while maintaining UX.</li>
        </ul>
      </section>

      <section className="mt-12 text-center">
        <h2 className="text-3xl font-semibold mb-6">Join Thousands Elevating Their LinkedIn Presence</h2>
        <p className="max-w-xl mx-auto text-gray-600 leading-relaxed">
          Whether you want to impress recruiters, share your startup journey, or grow your
          professional network, GenZPost makes it effortless to communicate confidently.
          Experience how AI can elevate your personal brand — starting today.
        </p>
      </section>
    </main>
  )
}
