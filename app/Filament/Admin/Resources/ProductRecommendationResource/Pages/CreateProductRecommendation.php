<?php

namespace App\Filament\Admin\Resources\ProductRecommendationResource\Pages;

use App\Filament\Admin\Resources\ProductRecommendationResource;
use Filament\Actions;
use Filament\Resources\Pages\CreateRecord;

class CreateProductRecommendation extends CreateRecord
{
    protected static string $resource = ProductRecommendationResource::class;
}
