export default function Loading() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-emerald-950 flex items-center justify-center">
      <div className="text-center">
        <div className="w-16 h-16 border-4 border-green-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
        <p className="text-white text-lg">Loading admin dashboard...</p>
      </div>
    </div>
  )
}
