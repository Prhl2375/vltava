<?php

namespace App\Http\Controllers;

use App\Models\Banner;
use App\Models\Product\ProductImage;
use App\Models\Product\ProductRecommendation;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Blade;
use Illuminate\View\View;

class SiteController extends Controller
{
    public function indexAction(): View
    {
        $banners = Banner::all()->sortBy('order');
        $products = ProductRecommendation::getHomeProducts();
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
