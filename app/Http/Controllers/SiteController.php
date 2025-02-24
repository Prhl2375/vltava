<?php

namespace App\Http\Controllers;

use App\Models\Banner;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Blade;
use Illuminate\View\View;

class SiteController extends Controller
{
    public function indexAction(): View
    {
        $banners = Banner::all()->sortBy('order');
        foreach($banners as $banner){
            $banner['text'] = Blade::render($banner['text']);
        }
        return view('pages.home',
            [
                'banners' => $banners,
            ]
        );
    }
}
