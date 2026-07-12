<?php

namespace App\Http\Controllers;

use App\Models\Store;
use App\Models\Product;
use App\Models\Order;
use Illuminate\Http\Request;

class DashboardController extends Controller
{
    // ১. মার্চেন্টের স্টোরের প্রোডাক্ট লিস্ট ও অর্ডার ডেটা
    public function getDashboardStats($storeId)
    {
        $products = Product::where('store_id', $storeId)->get();
        $orders = Order::where('store_id', $storeId)->with('items.product')->latest()->get();
        
        return response()->json([
            'products' => $products,
            'orders' => $orders
        ]);
    }

    // ২. নতুন প্রোডাক্ট অ্যাড করা
    public function addProduct(Request $request)
    {
        $validated = $request->validate([
            'store_id' => 'required|exists:stores,id',
            'name' => 'required|string|max:255',
            'price' => 'required|numeric|min:0',
        ]);

        $product = Product::create($validated);

        return response()->json(['message' => 'Product added!', 'product' => $product], 201);
    }

    // ৩. কাস্টমারের অর্ডার প্লেস করা (Public API)
    public function checkout(Request $request)
    {
        $validated = $request->validate([
            'store_id' => 'required|exists:stores,id',
            'customer_name' => 'required|string',
            'customer_phone' => 'required|string',
            'delivery_address' => 'required|string',
            'items' => 'required|array',
            'items.*.product_id' => 'required|exists:products,id',
            'items.*.quantity' => 'required|integer|min:1',
            'items.*.price' => 'required|numeric'
        ]);

        $totalAmount = collect($validated['items'])->sum(function($item) {
            return $item['quantity'] * $item['price'];
        });

        $order = Order::create([
            'store_id' => $validated['store_id'],
            'customer_name' => $validated['customer_name'],
            'customer_phone' => $validated['customer_phone'],
            'delivery_address' => $validated['delivery_address'],
            'total_amount' => $totalAmount,
        ]);

        foreach ($validated['items'] as $item) {
            $order->items()->create($item);
        }

        return response()->json(['message' => 'Order placed successfully!', 'order_id' => $order->id], 201);
    }
}