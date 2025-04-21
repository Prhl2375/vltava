<?php

namespace App\Models\Product;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Support\Str;

class Product extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'slug',
        'description',
        'price',
        'enabled',
        'category_id',
        'images'
    ];
    public static function boot(){
        parent::boot();
        static::creating(function ($product) {
            $product->slug = Str::slug($product->name);
        });
    }
    public function images(): HasMany
    {
        return $this->hasMany(ProductImage::class);
    }
    public function category(): BelongsTo
    {
        return $this->belongsTo(ProductCategory::class);
    }
}
