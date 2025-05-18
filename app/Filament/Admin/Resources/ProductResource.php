<?php

namespace App\Filament\Admin\Resources;

use App\Filament\Admin\Resources\ProductResource\Pages;
use App\Filament\Admin\Resources\ProductResource\RelationManagers;
use App\Imports\ProductsImport;
use App\Models\Product\Product;
use App\Models\Product\ProductCategory;
use Filament\Actions\CreateAction;
use Filament\Facades\Filament;
use Filament\Forms;
use Filament\Forms\Components\FileUpload;
use Filament\Forms\Components\Repeater;
use Filament\Forms\Components\Select;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Toggle;
use Filament\Forms\Form;
use Filament\Notifications\Notification;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Actions\Action;
use Filament\Tables\Actions\BulkAction;
use Filament\Tables\Columns\BooleanColumn;
use Filament\Tables\Columns\IconColumn;
use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Table;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Database\Eloquent\SoftDeletingScope;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Storage;
use Livewire\Component;
use Maatwebsite\Excel\Facades\Excel;

class ProductResource extends Resource
{
    protected static ?string $model = Product::class;

    protected static ?string $navigationIcon = 'fluentui-food-16-o';

    public static function form(Form $form): Form
    {
        return $form
            ->schema([
                TextInput::make('name')
                    ->required(),
                TextInput::make('slug')
                    ->label('Slug(optional, generated automatically if left empty)'),
                TextInput::make('description'),
                Select::make('category_id')
                    ->options(ProductCategory::all()->pluck('name', 'id')),
                Repeater::make('images')
                    ->relationship()
                    ->schema([
                        FileUpload::make('image')
                            ->directory('images/products')
                            ->image(),
                        Toggle::make('main')
                    ]),
                Repeater::make('variants')
                    ->relationship()
                    ->schema([
                        TextInput::make('name')
                            ->required(),
                        TextInput::make('price')
                            ->required()
                            ->numeric(),
                        TextInput::make('weight')
                            ->integer(),
                        TextInput::make('volume')
                            ->numeric(),
                    ]),
                Toggle::make('enabled')
                    ->default(true),
            ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->headerActions([
                Action::make('import products from excel')
                    ->form([
                        FileUpload::make('spreadsheet')
                            ->required()
                            ->disk('local')
                            ->directory('SpreadsheatsImportProducts')
                            ->acceptedFileTypes([
                                'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
                                'application/vnd.ms-excel'
                            ]),
                    ])
                    ->action(function(array $data){
                        if($data['spreadsheet']){
                            $file = $data['spreadsheet'];
                            $filePath = Storage::path($data['spreadsheet']);
                            Excel::import(new ProductsImport, $filePath);
                            Notification::make()
                                ->title('Imported successfully!')
                                ->success()
                                ->send();
                        }
                    })
            ])
            ->columns([
                TextColumn::make('name')
                    ->limit(35),
                TextColumn::make('slug'),
                TextColumn::make('category.name')
                    ->limit(25),
                TextColumn::make('description')
                    ->limit(25),
                TextColumn::make('prices'),
                IconColumn::make('enabled')
                    ->boolean(),
            ])
            ->filters([
                Tables\Filters\SelectFilter::make('category_id')
                    ->options(ProductCategory::all()->pluck('name', 'id')),
            ], layout: Tables\Enums\FiltersLayout::AboveContent)
            ->actions([
                Tables\Actions\EditAction::make(),
            ])
            ->bulkActions([
                Tables\Actions\DeleteBulkAction::make(),
                BulkAction::make('changeCategory')
                    ->icon('carbon-category-new-each')
                    ->form([
                        Select::make('category_id')
                            ->relationship('category', 'name')
                            ->required()
                    ])
                    ->action(function (Collection $records, array $data, Component $livewire) {
                        $records->each(function ($record) use ($data) {
                            $record->update([
                                'category_id' => (int)$data['category_id'],
                            ]);
                        });
                        Notification::make()
                            ->title('Category changed successfully!')
                            ->success()
                            ->send();
                        $livewire->js('window.location.reload()');
                    }),
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
            'index' => Pages\ListProducts::route('/'),
            'create' => Pages\CreateProduct::route('/create'),
            'edit' => Pages\EditProduct::route('/{record}/edit'),
        ];
    }
}
