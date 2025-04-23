<?php
declare(strict_types=1);

namespace App\Models\Product;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class ProductImage extends Model
{
    protected $fillable = [
        'product_id',
        'image'
    ];

    public function product(): BelongsTo
    {
        return $this->belongsTo(Product::class);
    }
}
