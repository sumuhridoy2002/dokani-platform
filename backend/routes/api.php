<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Models\Store;
use App\Http\Controllers\DashboardController;

Route::get('/resolve-store', function (Request $request) {
    $identifier = $request->query('identifier'); // e.g., honey.dokani.site or domain.com

    $store = Store::where('slug', $identifier)
                  ->orWhere('custom_domain', $identifier)
                  ->with('products')
                  ->first();

    if (!$store) {
        return response()->json(['error' => 'Store Not Found'], 404);
    }

    // Automated Check: Is the trial or subscription active?
    $isTrialValid = $store->payment_status === 'trial' && now()->lessThan($store->trial_ends_at);
    $isSubscriptionValid = $store->payment_status === 'active' && now()->lessThan($store->next_billing_at);

    if (!$isTrialValid && !$isSubscriptionValid) {
        return response()->json([
            'store_name' => $store->merchant_name,
            'status' => 'suspended'
        ]);
    }

    return response()->json([
        'status' => 'active',
        'config' => [
            'theme' => $store->theme_id,
            'primary_color' => $store->primary_color,
            'text_color' => $store->text_color,
            'name' => $store->merchant_name
        ],
        'products' => $store->products
    ]);
});

Route::post('/register-store', function (Request $request) {
    // ১. আপনার টেবিলের কলাম (slug) অনুযায়ী ইউনিক চেক এবং ভ্যালিডেশন
    $validated = $request->validate([
        'name' => 'required|string|max:255',
        'identifier' => 'required|string|alpha_dash|unique:stores,slug|max:100'
    ]);

    // ২. আপনার মডেলের সঠিক কলাম নেম ম্যাপ করে ডেটা ইনসার্ট
    $store = Store::create([
        'merchant_name' => $validated['name'],
        'slug'          => $validated['identifier'], // honey-shop, khalas-honey ইত্যাদি
        'custom_domain' => null,
        'theme_id'      => 'minimalist',
        'primary_color' => '#d97706', // আপনার ফ্রন্টএন্ড এপিআই রেসপন্সের সাথে ম্যাচ করা কালার
        'text_color'    => '#1f2937',
        'payment_status'=> 'trial',   // ডিফল্ট ট্রায়াল স্ট্যাটাস
        'trial_ends_at' => now()->addDays(30), // ৩০ দিনের ট্রায়াল পিরিয়ড
    ]);

    // ৩. নেক্সট জেএস ফ্রন্টএন্ডে রিডাইরেক্ট করার জন্য রেসপন্স পাঠানো
    return response()->json([
        'message' => 'Store created successfully!',
        'store'   => $store
    ], 201);
});

Route::get('/dashboard/stats/{storeId}', [DashboardController::class, 'getDashboardStats']);
Route::post('/dashboard/products', [DashboardController::class, 'addProduct']);
Route::post('/checkout', [DashboardController::class, 'checkout']);