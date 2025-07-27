import dynamic from 'next/dynamic'
const AdBlock = dynamic(() => import('../about/AdBlock'), { ssr: false })

export const metadata = {
  title: 'About GenZPost',
  description: 'Learn about our AI-powered LinkedIn post generator and team.',
}

export default function AboutPage() {
  return (
    <div className="max-w-4xl mx-auto my-8 p-6 bg-white rounded-lg shadow prose prose-indigo">
      <h1>About GenZPost</h1>
      <p>
        GenZPost helps professionals create engaging LinkedIn posts in seconds using advanced AI technology. Our mission is to democratize high-quality content creation for everyone, empowering users to build their personal brand with ease and confidence.
      </p>

      <h2>Our Founder</h2>
      <p>
        Rishit Agnihotri is a full-stack developer and AI enthusiast who created GenZPost to solve his own challenges with consistent LinkedIn content creation. Currently pursuing a BS in Computer Science at UCSC, Rishit combines technical skill and creative vision to help others succeed.
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

      <h2>How It Works</h2>
      <ol>
        <li>Enter your bullet points or key ideas</li>
        <li>Add images or links (optional)</li>
        <li>Select your preferred tone and style</li>
        <li>Receive a polished, ready-to-post LinkedIn update</li>
      </ol>

      <h2>Our Technology</h2>
      <ul>
        <li>GPT-4 for natural language generation</li>
        <li>Next.js for blazing fast performance</li>
        <li>Supabase for secure data storage</li>
        <li>Tailwind CSS for beautiful and responsive UI</li>
      </ul>

      <h2>Learn More</h2>
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

      <AdBlock />
    </div>
  )
}
