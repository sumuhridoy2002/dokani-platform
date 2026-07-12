export default function BoldTheme({ store }: { store: any }) {
    return (
    <div className="min-h-screen bg-gray-50">
        <div className="bg-slate-900 text-white py-24 px-12 text-center">
        <h1 className="text-6xl font-black uppercase tracking-tighter mb-4">{store.config.name}</h1>
        <p className="text-amber-400 font-medium tracking-widest">PREMIUM INDUSTRIAL COMFORT</p>
        </div>
        <div className="max-w-7xl mx-auto px-8 py-16 grid md:grid-cols-2 gap-12">
        {store.products.map((p: any) => (
            <div key={p.id} className="bg-white p-6 rounded-xl shadow-sm flex items-center justify-between">
            <div>
                <h3 className="text-2xl font-bold tracking-tight">{p.name}</h3>
                <p className="text-xl font-black mt-2 text-[var(--primary)]">{p.price} BDT</p>
            </div>
            <button className="bg-slate-900 text-white px-6 py-4 rounded-xl hover:opacity-90 font-bold">
                Buy Now
            </button>
            </div>
        ))}
        </div>
    </div>
    )
}