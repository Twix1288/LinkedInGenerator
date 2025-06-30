import Script from 'next/script'

export default function About() {
  return (
    <div className="max-w-4xl mx-auto my-8 p-6 bg-white rounded-lg shadow">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">About GenZPost</h1>

      {/* AdSense Ad only on about page */}
      <div className="text-center mb-4">
  <script
    id="adsbygoogle-init"
    strategy="afterInteractive"
    src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-3182066441920648"
    crossOrigin="anonymous"
  />
  <ins
    className="adsbygoogle"
    style={{ display: 'block' }}
    data-ad-client="ca-pub-3182066441920648"
    data-ad-slot="5702324134"
    data-ad-format="auto"
    data-full-width-responsive="true"
  />
  <script id="adsbygoogle-load" strategy="afterInteractive">
    {`
      (adsbygoogle = window.adsbygoogle || []).push({});
    `}
  </script>
</div>

      <div className="prose max-w-none">
        <p className="text-lg">
          GenZPost helps professionals create engaging LinkedIn posts in seconds using
          advanced AI technology. Our mission is to democratize high-quality content
          creation for everyone.
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-4">Our Founder</h2>
        <div className="flex flex-col md:flex-row gap-6 items-start mb-8">
          <div className="w-full md:w-1/4">
            <div className="w-32 h-32 bg-gray-200 rounded-full mx-auto md:mx-0"></div>
          </div>
          <div className="w-full md:w-3/4">
            <h3 className="text-xl font-medium">Rishit Agnihotri</h3>
            <p className="text-gray-600 mt-2">
              Full-stack developer with expertise in AI applications. Built GenZPost to solve
              his own challenges with consistent LinkedIn content creation. Currently heading
              into UCSC to work for a BS in Computer Science.
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
          <li>Tailwind CSS for beautiful interfaces</li>
        </ul>
      </div>
    </div>
  )
}
