<?php

namespace App\Models\Product;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;

class ProductCategory extends Model
{
    protected $fillable = [
        'name',
        'slug'
    ];

    public static function booted()
    {
        static::creating(function ($category) {
            $category->slug = Str::slug($category->name);
        });
        static::updating(function ($category) {
            if($category->isDirty('name')) {
                $category->slug = Str::slug($category->name);
            }
        });
    }
}
