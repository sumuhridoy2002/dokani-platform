<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('stores', function (Blueprint $table) {
            $table->id();
            $table->string('merchant_name');
            $table->string('slug')->unique(); // honey, toys, furniture
            $table->string('custom_domain')->nullable()->unique();
            
            // Design Configs
            $table->string('theme_id')->default('minimalist'); // minimalist, bold, playfield
            $table->string('primary_color')->default('#eab308'); // tailwind yellow-500
            $table->string('text_color')->default('#1f2937');
            
            // Subscriptions (199 BDT/mo, 1 Month Trial)
            $table->string('payment_status')->default('trial'); // trial, active, past_due
            $table->timestamp('trial_ends_at')->default(now()->addDays(30));
            $table->timestamp('next_billing_at')->nullable();
            $table->timestamps();
        });

        Schema::create('products', function (Blueprint $table) {
            $table->id();
            $table->foreignId('store_id')->constrained()->onDelete('cascade');
            $table->string('name');
            $table->decimal('price', 10, 2);
            $table->string('image_path')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('products');
        Schema::dropIfExists('stores');
    }
};
