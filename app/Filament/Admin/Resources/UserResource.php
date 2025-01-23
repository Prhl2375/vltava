<?php

namespace App\Filament\Admin\Resources;

use App\Enums\UserRole;
use App\Filament\Admin\Resources\UserResource\Pages;
use App\Models\User;
use Filament\Forms\Components\Select;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Form;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Columns\BooleanColumn;
use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Table;
use Illuminate\Database\Eloquent\Model;

class UserResource extends Resource
{
    protected static ?string $model = User::class;

    protected static ?string $navigationIcon = 'carbon-user-profile-alt';

    public static ?int $navigationSort = 1;

    public static function form(Form $form): Form
    {
        return $form
            ->schema([
                TextInput::make('name')
                    ->required()
                    ->label('Full Name'),

                TextInput::make('email')
                    ->email()
                    ->required()
                    ->label('Email Address'),

                TextInput::make('password')
                    ->password()
                    ->required()
                    ->label('Password')
                    ->dehydrateStateUsing(fn ($state) => bcrypt($state)),
                Select::make('role')
                    ->label('User Role')
                    ->required()
                    ->options(UserRole::class)
                    ->default('user'),
                TextInput::make('created_at')
                    ->disabled()
                    ->label('Created at'),
                TextInput::make('updated_at')
                    ->disabled()
                    ->label('Updated at'),
                TextInput::make('email_verified_at')
                    ->disabled()
                    ->label('Email verified at'),
            ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                TextColumn::make('name'),
                TextColumn::make('email'),
                TextColumn::make('role')
            ])
            ->filters([
                //
            ])
            ->actions([
                Tables\Actions\EditAction::make(),
                Tables\Actions\DeleteAction::make(),
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
            'index' => Pages\ListUsers::route('/'),
            'create' => Pages\CreateUser::route('/create'),
            'edit' => Pages\EditUser::route('/{record}/edit'),
        ];
    }
    public static function canViewAny(): bool
    {
        return auth()->user()->role == 'admin' || 'moderator';
    }
    public static function canCreate(): bool
    {
        return auth()->user()->role == 'admin';
    }

    public static function canEdit(Model $record): bool
    {
        return auth()->user()->role == 'admin';
    }

    public static function canDelete(Model $record): bool
    {
        return auth()->user()->role == 'admin';
    }
    public static function canDeleteAny(): bool
    {
        return auth()->user()->role == 'admin';
    }
}
