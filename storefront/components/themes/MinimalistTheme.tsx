interface Product {
    id: number;
    name: string;
    price: string;
  }
  
  interface StoreData {
    config: { name: string; primary_color: string };
    products: Product[];
  }
  
  export default function MinimalistTheme({ store }: { store: StoreData }) {
    return (
      <div className="max-w-6xl mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold mb-8">{store.config.name}</h1>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {store.products.map((product) => (
            <div key={product.id} className="border p-4 rounded-xl shadow-sm bg-white">
              <div className="h-48 bg-gray-100 rounded-lg mb-4 flex items-center justify-center text-gray-400">
                No Image
              </div>
              <h3 className="font-semibold text-lg text-gray-800">{product.name}</h3>
              <p className="text-gray-600 mt-1">৳ {product.price}</p>
              
              <a 
                href={`/shop/${store.config.name.toLowerCase().replace(/ /g, "-")}/product/${product.id}`}
                className="mt-4 block text-center py-2 rounded-lg text-white font-medium text-sm"
                style={{ backgroundColor: store.config.primary_color }}
              >
                View Details
              </a>
            </div>
          ))}
        </div>
      </div>
    )
  }