import MinimalistTheme from "@/components/themes/MinimalistTheme"
import BoldTheme from "@/components/themes/BoldTheme"
import PlayfieldTheme from "@/components/themes/PlayfieldTheme"
import { notFound } from "next/navigation"

async function fetchTenantData(tenant: string) {
  const res = await fetch(`http://localhost:8000/api/resolve-store?identifier=${tenant}`, {
    cache: 'no-store' 
  })
  
  if (!res.ok) return null
  return res.json()
}

// params-এর টাইপ প্রমিজ (Promise) হিসেবে ডিফাইন করা হয়েছে
export default async function TenantPage({ params }: { params: Promise<{ tenant: string }> }) {
  
  // ২. params-কে await করা হয়েছে যাতে উইন্ডোজে undefined এরর না আসে
  const resolvedParams = await params;
  const tenantIdentifier = resolvedParams.tenant;

  console.log("Captured Tenant Identifier:", tenantIdentifier) // এখন টার্মিনালে 'honey-shop' দেখতে পাবেন

  if (!tenantIdentifier) return notFound()

  const store = await fetchTenantData(tenantIdentifier)

  if (!store) return notFound()

  if (store.status === 'suspended') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-red-50 text-red-900 font-sans p-6">
        <div className="text-center max-w-md bg-white border border-red-200 p-8 rounded-2xl shadow-sm">
          <h2 className="text-2xl font-bold mb-2">দোকানটি সাময়িকভবে বন্ধ আছে</h2>
          <p className="text-sm text-gray-600">Your 30-day trial phase or subscription period has expired. Please fulfill the 199 BDT monthly subscription renewal charge.</p>
        </div>
      </div>
    )
  }

  const cssVariables = {
    '--primary': store.config.primary_color,
    '--text-main': store.config.text_color,
  } as React.CSSProperties

  return (
    <div style={cssVariables}>
      {store.config.theme === 'minimalist' && <MinimalistTheme store={store} />}
      {store.config.theme === 'bold' && <BoldTheme store={store} />}
      {store.config.theme === 'playfield' && <PlayfieldTheme store={store} />}
    </div>
  )
}