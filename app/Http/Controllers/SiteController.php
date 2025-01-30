<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\View\View;

class SiteController extends Controller
{
    public function indexAction(): View
    {
        return view('site.home');
    }
}
