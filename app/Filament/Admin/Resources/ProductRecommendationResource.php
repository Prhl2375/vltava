<?php

namespace App\Filament\Admin\Resources;

use App\Filament\Admin\Resources\ProductRecommendationResource\Pages;
use App\Filament\Admin\Resources\ProductRecommendationResource\RelationManagers;
use App\Models\Product\Product;
use App\Models\Product\ProductRecommendation;
use Filament\Forms;
use Filament\Forms\Components\Repeater;
use Filament\Forms\Components\Select;
use Filament\Forms\Components\Toggle;
use Filament\Forms\Form;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Columns\IconColumn;
use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Table;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\SoftDeletingScope;

class ProductRecommendationResource extends Resource
{
    protected static ?string $model = ProductRecommendation::class;

    protected static ?string $navigationIcon = 'heroicon-o-rectangle-stack';

    public static function form(Form $form): Form
    {
        return $form
            ->schema([
                Select::make('product_id')
                    ->options(Product::all()->pluck('name', 'id'))
                    ->searchable(),
                Toggle::make('enabled')
                    ->default(true),
            ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->reorderable('order')
            ->defaultSort('order')
            ->columns([
                TextColumn::make('product.name')
                    ->label('Product name'),
                TextColumn::make('product.slug')
                    ->label('Product slug'),
                IconColumn::make('enabled')
                    ->boolean()
            ])
            ->filters([
                //
            ])
            ->actions([
                Tables\Actions\EditAction::make(),
            ])
            ->bulkActions([
                Tables\Actions\BulkActionGroup::make([
                    Tables\Actions\DeleteBulkAction::make(),
                ]),
            ]);
    }

    public static function getRelations(): array
    {
        return [
            //
        ];
    }

    public static function getPages(): array
    {
        return [
            'index' => Pages\ListProductRecommendations::route('/'),
            'create' => Pages\CreateProductRecommendation::route('/create'),
            'edit' => Pages\EditProductRecommendation::route('/{record}/edit'),
        ];
    }
}
