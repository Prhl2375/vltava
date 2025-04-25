<?php

namespace App\Http\Controllers;

use App\Models\Banner;
use App\Models\Product\ProductRecommendation;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Blade;
use Illuminate\View\View;

class SiteController extends Controller
{
    public function indexAction(): View
    {
        $banners = Banner::all()->sortBy('order');
        $products = ProductRecommendation
            ::join("products", "products.id", "=", "product_recommendations.product_id")
            ->where("product_recommendations.enabled", "=", true)
            ->orderBy("product_recommendations.order")
            ->select("products.*")
            ->get();
        foreach($banners as $banner){
            $banner['text'] = Blade::render($banner['text']);
        }
        return view('pages.home',
            [
                'banners' => $banners,
                'products' => $products,
            ]
        );
    }
}
