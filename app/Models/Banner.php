<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
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

    public $sortable = [
        'order_column_name' => 'order',
        'sort_when_creating' => true
    ];
}
