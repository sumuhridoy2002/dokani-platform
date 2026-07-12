import { notFound } from "next/navigation"

async function fetchProductData(tenant: string, productId: string) {
  const res = await fetch(`http://localhost:8000/api/resolve-store?identifier=${tenant}`, { cache: 'no-store' })
  if (!res.ok) return null
  const store = await res.json()
  
  const product = store.products.find((p: any) => p.id === parseInt(productId))
  return { store, product }
}

export default async function ProductDetailPage({ params }: { params: Promise<{ tenant: string, id: string }> }) {
  const { tenant, id } = await params
  const data = await fetchProductData(tenant, id)

  if (!data || !data.product) return notFound()
  const { store, product } = data

  return (
    <div className="max-w-6xl mx-auto p-6 font-sans">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-gray-100 aspect-square rounded-xl flex items-center justify-center text-gray-400">
          {product.image_path ? <img src={product.image_path} alt={product.name} /> : "No Image Available"}
        </div>
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">{product.name}</h1>
          <p className="text-2xl font-semibold mb-6" style={{ color: store.config.primary_color }}>
            ৳ {product.price}
          </p>
          <button 
            className="w-full md:w-auto px-8 py-3 rounded-lg font-medium text-white transition-opacity hover:opacity-90"
            style={{ backgroundColor: store.config.primary_color }}
          >
            Add to Bag
          </button>
        </div>
      </div>
    </div>
  )
}