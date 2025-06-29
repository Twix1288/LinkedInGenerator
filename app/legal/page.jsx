'use client';
export default function Legal() {
  return (
    <div className="bg-white rounded-lg shadow p-6 max-w-4xl mx-auto my-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">Legal Information</h1>
      
      <div className="prose max-w-none">
        <section className="mb-10">
          <h2 className="text-2xl font-semibold mb-4">Privacy Policy</h2>
          
          <h3 className="text-xl font-medium mt-4">Information We Collect</h3>
          <p>
            We collect minimal data necessary to provide our service, including:
          </p>
          <ul className="list-disc pl-5 space-y-1">
            <li>Content you input for post generation</li>
            <li>Anonymous usage statistics</li>
            <li>Device information for troubleshooting</li>
          </ul>

          <h3 className="text-xl font-medium mt-4">Data Usage</h3>
          <p>
            Your data is used solely to:
          </p>
          <ul className="list-disc pl-5 space-y-1">
            <li>Generate requested LinkedIn posts</li>
            <li>Improve our service quality</li>
            <li>Prevent abuse of our systems</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Terms of Service</h2>
          
          <h3 className="text-xl font-medium mt-4">Acceptable Use</h3>
          <p>
            By using GenZPost, you agree not to:
          </p>
          <ul className="list-disc pl-5 space-y-1">
            <li>Generate harmful or illegal content</li>
            <li>Attempt to reverse engineer our systems</li>
            <li>Use our service for spamming</li>
          </ul>

          <h3 className="text-xl font-medium mt-4">Service Limitations</h3>
          <p>
            We reserve the right to:
          </p>
          <ul className="list-disc pl-5 space-y-1">
            <li>Limit free tier usage</li>
            <li>Modify or discontinue features</li>
            <li>Terminate abusive accounts</li>
          </ul>
        </section>
      </div>
    </div>
  )
}