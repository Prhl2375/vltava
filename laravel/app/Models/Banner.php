<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Storage;
use Spatie\EloquentSortable\Sortable;
use Spatie\EloquentSortable\SortableTrait;

class Banner extends Model implements Sortable
{
    use SortableTrait;

    protected $fillable = [
        'name',
        'mobile_image',
        'desktop_image',
        'text',
        'order'
    ];

    protected static function booted(): void
    {
        static::deleting(function (Banner $banner) {
            Storage::disk('public')->delete($banner->mobile_image);
            Storage::disk('public')->delete($banner->desktop_image);
        });
    }

    public $sortable = [
        'order_column_name' => 'order',
        'sort_when_creating' => true
    ];
}
