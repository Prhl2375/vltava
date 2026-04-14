<?php

namespace App\Enums;

use Filament\Support\Contracts\HasLabel;

enum ProductCategoryType: string implements HasLabel
{
    case Bar = 'bar';
    case Menu = 'menu';
    public function getLabel(): string
    {
        return $this->value;
    }
}
