<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Order extends Model {
    protected $fillable = ['store_id', 'customer_name', 'customer_phone', 'delivery_address', 'total_amount', 'status'];

    public function items(): HasMany
    {
        return $this->hasMany(OrderItem::class);
    }
}