import Link from "next/link"

export default function PlatformLandingPage() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans">
      <header className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        <div className="text-xl font-bold tracking-tight">dokani<span className="text-blue-600">.platform</span></div>
        <Link href="/register" className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium">
          Create Your Store
        </Link>
      </header>

      <main className="max-w-4xl mx-auto text-center py-20 px-6">
        <h1 className="text-5xl font-extrabold tracking-tight mb-4">
          Launch Your E-commerce Site in 60 Seconds
        </h1>
        <p className="text-lg text-slate-600 mb-8 max-w-xl mx-auto">
          Get beautiful dynamic themes, fully integrated localized order systems, and scalable backend structure natively optimized.
        </p>
        <Link href="/register" className="px-8 py-4 bg-slate-900 text-white font-medium rounded-xl shadow-lg">
          Get Started Now (199 BDT/mo)
        </Link>
      </main>
    </div>
  )
}