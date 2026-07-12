"use client";
import { useEffect, useState, use } from 'react';

export default function MerchantDashboard({ params }: { params: Promise<{ storeId: string }> }) {
  const { storeId } = use(params);
  const [data, setData] = useState<any>({ products: [], orders: [] });
  const [newName, setNewName] = useState("");
  const [newPrice, setNewPrice] = useState("");

  const loadStats = async () => {
    const res = await fetch(`http://localhost:8000/api/dashboard/stats/${storeId}`);
    if (res.ok) setData(await res.json());
  };

  useEffect(() => { loadStats(); }, [storeId]);

  const handleAddProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    await fetch("http://localhost:8000/api/dashboard/products", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ store_id: storeId, name: newName, price: parseFloat(newPrice) })
    });
    setNewName(""); setNewPrice("");
    loadStats();
  };

  return (
    <div className="p-8 max-w-7xl mx-auto font-sans grid grid-cols-1 lg:grid-cols-3 gap-8 bg-slate-50 min-h-screen">
      
      {/* বাম কলাম: প্রোডাক্ট আপলোড ফর্ম */}
      <div className="bg-white p-6 rounded-2xl border shadow-sm h-fit">
        <h2 className="text-xl font-bold mb-4">Add New Product</h2>
        <form onSubmit={handleAddProduct} className="space-y-4">
          <input type="text" placeholder="Product Name" value={newName} onChange={e => setNewName(e.target.value)} className="w-full p-2 border rounded-lg" required />
          <input type="number" placeholder="Price (BDT)" value={newPrice} onChange={e => setNewPrice(e.target.value)} className="w-full p-2 border rounded-lg" required   />
          <button type="submit" className="w-full py-2 bg-blue-600 text-white font-medium rounded-lg">Upload Product</button>
        </form>

        <h3 className="text-lg font-semibold mt-8 mb-2">Current Inventory</h3>
        <ul className="divide-y text-sm">
          {data.products.map((p: any) => (
            <li key={p.id} className="py-2 flex justify-between"><span>{p.name}</span><strong>৳{p.price}</strong></li>
          ))}
        </ul>
      </div>

      {/* ডান কলাম: লাইভ অর্ডার ট্র্যাকার */}
      <div className="lg:col-span-2 bg-white p-6 rounded-2xl border shadow-sm">
        <h2 className="text-2xl font-bold mb-4">Incoming Shop Orders</h2>
        <div className="space-y-4">
          {data.orders.length === 0 ? <p className="text-gray-400">No orders received yet.</p> : 
            data.orders.map((order: any) => (
              <div key={order.id} className="p-4 border rounded-xl bg-slate-50 flex justify-between items-start">
                <div>
                  <h4 className="font-bold text-slate-900">{order.customer_name} ({order.customer_phone})</h4>
                  <p className="text-xs text-gray-500 mb-2">{order.delivery_address}</p>
                  <div className="text-xs text-slate-700">
                    {order.items.map((i: any) => (
                      <div key={i.id}>• {i.product?.name} x {i.quantity}</div>
                    ))}
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-sm px-2 py-1 bg-yellow-100 text-yellow-800 rounded-full font-medium">{order.status}</span>
                  <div className="text-lg font-bold text-blue-600 mt-2">৳{order.total_amount}</div>
                </div>
              </div>
          ))}
        </div>
      </div>

    </div>
  );
}