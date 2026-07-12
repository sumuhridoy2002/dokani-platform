export default async function CheckoutPage({ params }: { params: Promise<{ tenant: string }> }) {
    const { tenant } = await params;
  
    return (
      <div className="max-w-4xl mx-auto p-6 font-sans">
        <h1 className="text-2xl font-bold mb-6">Completing Your Order at `{tenant}`</h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2 space-y-4 bg-white p-6 border rounded-xl">
            <h2 className="text-lg font-semibold">Shipping Details</h2>
            <input type="text" placeholder="Full Name" className="w-full p-2 border rounded-lg" />
            <input type="text" placeholder="Phone Number" className="w-full p-2 border rounded-lg" />
            <textarea placeholder="Delivery Address" className="w-full p-2 border rounded-lg" rows={3}></textarea>
          </div>
          <div className="bg-gray-50 p-6 border rounded-xl h-fit">
            <h2 className="text-lg font-semibold mb-4">Summary</h2>
            <button className="w-full py-3 bg-gray-900 text-white rounded-lg font-medium">
              Cash on Delivery
            </button>
          </div>
        </div>
      </div>
    )
  }