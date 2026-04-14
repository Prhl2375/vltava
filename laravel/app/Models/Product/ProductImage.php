<?php

declare(strict_types=1);

namespace App\Models\Product;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Support\Facades\Storage;
use Spatie\EloquentSortable\Sortable;
use Spatie\EloquentSortable\SortableTrait;

class ProductImage extends Model implements Sortable
{
    use SortableTrait;

    protected $fillable = [
        'product_id',
        'order',
        'image'
    ];

    public $sortable = [
        'order_column_name' => 'order',
        'sort_when_creating' => true
    ];

    public function product(): BelongsTo
    {
        return $this->belongsTo(Product::class);
    }

    protected static function booted(): void
    {
        static::deleting(function (ProductImage $image) {
            Storage::disk('public')->delete($image->image);
        });
    }
}
