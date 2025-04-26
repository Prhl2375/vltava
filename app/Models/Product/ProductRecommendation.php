<?php
declare(strict_types=1);

namespace App\Models\Product;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasOne;
use Illuminate\Support\Facades\Log;
use Spatie\EloquentSortable\Sortable;
use Spatie\EloquentSortable\SortableTrait;

class ProductRecommendation extends Model implements Sortable
{
    use SortableTrait;
    protected $fillable = [
        'order',
        'enabled',
        'product_id'
    ];

    public $sortable = [
        'order_column_name' => 'order',
        'sort_when_creating' => true
    ];


    public static function boot(): void
    {
        parent::boot();
        static::creating(function ($recommendation) {
            Log::info($recommendation);
            if($recommendation->product_id){
                $product = Product::find($recommendation->product_id);
                if($product && !$product['enabled']){
                    $recommendation->enabled = false;
                }
            }
        });
        static::updating(function ($recommendation) {
            if($recommendation->product_id){
                $product = Product::find($recommendation->product_id);
                if($product && !$product['enabled']){
                    $recommendation->enabled = false;
                }
            }
        });
    }

    public function product(): BelongsTo
    {
        return $this->belongsTo(Product::class);
    }
}
