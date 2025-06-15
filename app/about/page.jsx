export default function About() {
  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h1 className="text-2xl font-bold text-gray-900 mb-4">About GenZPost</h1>
      <div className="prose max-w-none">
        <p>
          GenZPost helps you create engaging LinkedIn posts in seconds using AI.
        </p>
        <h2 className="text-xl font-semibold mt-6">How It Works</h2>
        <ol className="list-decimal pl-5 space-y-2">
          <li>Enter your bullet points</li>
          <li>Add image/link (optional)</li>
          <li>Choose tone</li>
          <li>Get polished post</li>
        </ol>
      </div>
    </div>
  )
}