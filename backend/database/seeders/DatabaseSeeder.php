<?php

namespace Database\Seeders;

use App\Models\User;
use App\Models\Store;
use App\Models\Product;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    use WithoutModelEvents;

    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // 🍯 Store 1: Honey Shop (Theme: Minimalist)
        $honeyStore = Store::create([
            'merchant_name' => 'Sunderban Natural Honey',
            'slug' => 'honey-shop',
            'custom_domain' => null,
            'theme_id' => 'minimalist',
            'primary_color' => '#d97706', // Amber Gold Hex code
            'text_color' => '#1f2937',
            'payment_status' => 'trial',
            'trial_ends_at' => now()->addDays(20),
        ]);

        $honeyStore->products()->createMany([
            ['name' => 'Premium Raw Khalisha Honey (500g)', 'price' => 650.00],
            ['name' => 'Organic Mustard Flower Honey (1kg)', 'price' => 800.00],
            ['name' => 'Wild Deep Forest Honey (250g)', 'price' => 450.00],
        ]);

        // 🛋️ Store 2: Furniture House (Theme: Bold & Industrial)
        $furnitureStore = Store::create([
            'merchant_name' => 'Otobi Vintage Crafts',
            'slug' => 'furniture-house',
            'custom_domain' => 'otobivintage.com', // Mocking a real domain routing scenario
            'theme_id' => 'bold',
            'primary_color' => '#0f172a', // Slate Dark
            'text_color' => '#f8fafc',
            'payment_status' => 'active',
            'trial_ends_at' => now()->subDays(5),
            'next_billing_at' => now()->addDays(25),
        ]);

        $furnitureStore->products()->createMany([
            ['name' => 'Minimalist Teak Wood Sofa Set', 'price' => 45000.00],
            ['name' => 'Ergonomic Premium Workstation Desk', 'price' => 12500.00],
            ['name' => 'Retro Walnut Lounge Chair', 'price' => 8900.00],
        ]);

        // 🧸 Store 3: Toy Emporium (Theme: Playfield)
        $toyStore = Store::create([
            'merchant_name' => 'Totto Playworld',
            'slug' => 'toy-box',
            'custom_domain' => null,
            'theme_id' => 'playfield',
            'primary_color' => '#ec4899', // Playful Pink
            'text_color' => '#000000',
            'payment_status' => 'trial',
            'trial_ends_at' => now()->addDays(14),
        ]);

        $toyStore->products()->createMany([
            ['name' => 'Handcrafted Eco-Wooden Train Set', 'price' => 1200.00],
            ['name' => 'Plush Royal Bengal Tiger Toy', 'price' => 750.00],
            ['name' => 'Interactive Smart Alphabet Board', 'price' => 1800.00],
        ]);
        
        // 🚫 Store 4: Suspended Shop (To verify subscription gate logic)
        Store::create([
            'merchant_name' => 'Expired Test Shop',
            'slug' => 'expired-shop',
            'theme_id' => 'minimalist',
            'payment_status' => 'past_due',
            'trial_ends_at' => now()->subDays(40),
        ]);
    }
}
