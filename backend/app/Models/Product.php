<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Product extends Model
{
    protected $fillable = ['store_id', 'name', 'price', 'image_path'];

    public function store(): BelongsTo
    {
        return $this->belongsTo(Store::class);
    }
}