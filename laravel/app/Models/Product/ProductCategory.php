<?php

declare(strict_types=1);

namespace App\Models\Product;

use App\Enums\ProductCategoryType;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Support\Str;

class ProductCategory extends Model
{
    protected $casts = [
        'type' => ProductCategoryType::class,
    ];
    protected $fillable = [
        'name',
        'slug',
        'enabled',
        'type'
    ];

    public static function boot()
    {
        parent::boot();
        static::creating(function ($category) {
            $category->slug = Str::slug($category->name);
        });
    }
    public function products(): HasMany
    {
        return $this->hasMany(Product::class, "category_id");
    }
    public function scopeActiveCategory(Builder $query, ProductCategoryType $categoryType): Builder
    {
        $query->where([
            'enabled' => true,
            'type' => $categoryType,
        ]);
        return $query;
    }
}
