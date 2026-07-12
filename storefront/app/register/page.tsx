"use client"
import { useState } from "react"

export default function RegisterMerchant() {
  const [storeName, setStoreName] = useState("")
  const [slug, setSlug] = useState("")

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault()
    // Laravel API-তে নতুন স্টোর রেজিস্টার করার রিকোয়েস্ট পাঠাবে
    const res = await fetch("http://localhost:8000/api/register-store", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: storeName, identifier: slug })
    })
    if (res.ok) {
      window.location.href = `/shop/${slug}`
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-100 p-6">
      <form onSubmit={handleRegister} className="bg-white p-8 rounded-2xl shadow-sm border max-w-md w-full space-y-4">
        <h2 className="text-xl font-bold">Open Your Dokani Instance</h2>
        <div>
          <label className="text-xs font-semibold text-gray-600 block mb-1">Store Name</label>
          <input type="text" onChange={e => setStoreName(e.target.value)} className="w-full p-2 border rounded-lg" placeholder="Sunderban Honey Shop" required />
        </div>
        <div>
          <label className="text-xs font-semibold text-gray-600 block mb-1">Desired URL Slug</label>
          <div className="flex items-center border rounded-lg overflow-hidden">
            <span className="bg-gray-100 px-3 text-sm text-gray-500 py-2">/shop/</span>
            <input type="text" onChange={e => setSlug(e.target.value.toLowerCase().replace(/ /g, "-"))} className="w-full p-2 focus:outline-none" placeholder="honey-shop" required />
          </div>
        </div>
        <button type="submit" className="w-full py-2 bg-blue-600 text-white rounded-lg font-medium">Create Live Store</button>
      </form>
    </div>
  )
}