<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Store extends Model
{
    protected $fillable = [
        'merchant_name', 'slug', 'custom_domain', 
        'theme_id', 'primary_color', 'text_color', 
        'payment_status', 'trial_ends_at', 'next_billing_at'
    ];

    public function products(): HasMany
    {
        return $this->hasMany(Product::class);
    }

    public function user(): HasMany
    {
        return $this->belongsTo(User::class);
    }

    public function orders(): HasMany
    {
        return $this->hasMany(Order::class);
    }
}