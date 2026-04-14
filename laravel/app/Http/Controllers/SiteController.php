<?php

namespace App\Http\Controllers;

use App\Enums\ProductCategoryType;
use App\Models\Banner;
use App\Models\Product\Product;
use App\Models\Product\ProductCategory;
use App\Models\Product\ProductImage;
use App\Models\Product\ProductRecommendation;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Blade;
use Illuminate\Support\Facades\Log;
use Illuminate\View\View;

class SiteController extends Controller
{
    public function home(): View
    {
        $banners = Banner::all()->sortBy('order');
        $products = ProductRecommendation::getHomeProducts();
        foreach ($banners as $banner) {
            $banner['text'] = Blade::render($banner['text']);
        }
        return view(
            'pages.home',
            compact('banners', 'products')
        );
    }

    public function listBanners(): JsonResponse
    {
        $banners = Banner::all()->sortBy('order');
        foreach ($banners as $banner) {
            $banner['text'] = Blade::render($banner['text']);
        }
        return response()->json($banners);
    }

    public function listRecommendedProducts(): JsonResponse
    {
        $products = ProductRecommendation::getHomeProducts();
        return response()->json($products);
    }

    public function listCategories(): JsonResponse
    {
        $categories = ProductCategory::all();
        Log::info($categories);
        return response()->json([
            "categories" => $categories,
            "categoryTypes" => ProductCategoryType::cases()
        ]);
    }

    public function listCategoryProducts(string $category): JsonResponse
    {
        $products = ProductCategory::where("slug", $category)
            ->firstOrFail()
            ->products()
            ->with(["variants", "images"])
            ->get();
        return response()->json($products);
    }

    public function menu(): View
    {
        $categoryTypes = ProductCategoryType::cases();
        $categories = [];
        $activeCategory = '';
        foreach ($categoryTypes as $categoryType) {
            $category = ProductCategory::activeCategory($categoryType)->get();
            $categories[$categoryType->name] = $category;
            if ($categoryType == ProductCategoryType::Menu) {
                $activeCategory = $category[0];
            }
        }
        return view('pages.menu', compact('categories', 'activeCategory'));
    }
}
