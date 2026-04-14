<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\SiteController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get("/banners", [SiteController::class, "listBanners"])->name("banners.list");

Route::get("/products/recommended", [SiteController::class, "listRecommendedProducts"])->name("products.recommended.list");

Route::get("/categories", [SiteController::class, "listCategories"])->name("categories.list");

Route::get("/categories/{category}/products", [SiteController::class, "listCategoryProducts"])->name("categories.products.list");

Route::post("/admin/login", [AuthController::class, "login"])->name("login");

Route::middleware("auth:sanctum")->group(function () {
    Route::get("/admin/me", [AuthController::class, "me"])->name("auth.me");
});
