<?php

namespace App\Filament\Admin\Resources\ProductRecommendationResource\Pages;

use App\Filament\Admin\Resources\ProductRecommendationResource;
use Filament\Actions;
use Filament\Resources\Pages\EditRecord;

class EditProductRecommendation extends EditRecord
{
    protected static string $resource = ProductRecommendationResource::class;

    protected function getHeaderActions(): array
    {
        return [
            Actions\DeleteAction::make(),
        ];
    }
}
