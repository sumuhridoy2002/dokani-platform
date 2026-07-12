export default function PlayfieldTheme({ store }: { store: any }) {
    return (
    <div className="min-h-screen bg-amber-50/40 font-mono py-12 px-4">
        <div className="max-w-4xl mx-auto bg-white border-4 border-black rounded-3xl p-8 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
        <h1 className="text-4xl font-black text-center border-b-4 border-black pb-6">🎈 {store.config.name} 🧸</h1>
        <div className="grid sm:grid-cols-2 gap-6 mt-8">
            {store.products.map((p: any) => (
            <div key={p.id} className="border-4 border-black rounded-2xl p-4 bg-white hover:translate-x-1 hover:translate-y-1 transition-transform">
                <h3 className="text-lg font-bold">{p.name}</h3>
                <div className="bg-[var(--primary)] text-black font-bold inline-block px-3 py-1 border-2 border-black rounded-full mt-2">
                {p.price} ৳
                </div>
            </div>
            ))}
        </div>
        </div>
    </div>
    )
}