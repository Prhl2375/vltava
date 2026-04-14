<?php

namespace App\Models\Product;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class ProductVariant extends Model
{
    protected $fillable = [
        'name',
        'product_id',
        'price',
        'weight',
        'volume',
    ];
    public function product(): BelongsTo
    {
        return $this->belongsTo(Product::class);
    }
}
