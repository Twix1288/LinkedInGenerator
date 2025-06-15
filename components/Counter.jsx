export default function Counter({ remaining }) {
  return (
    <div className="mb-4 p-3 bg-indigo-50 rounded-lg">
      <p className="text-indigo-800 text-sm font-medium">
        You have <span className="font-bold">{remaining}</span> free generations left today
      </p>
    </div>
  )
}