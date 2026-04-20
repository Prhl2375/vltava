<?php

namespace App\Filament\Admin\Pages;

use App\Models\About;
use Filament\Actions\Action;
use Filament\Forms\Components\FileUpload;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\TimePicker;
use Filament\Forms\Concerns\InteractsWithForms;
use Filament\Forms\Contracts\HasForms;
use Filament\Forms\Form;
use Filament\Notifications\Notification;
use Filament\Pages\Page;

class AboutPage extends Page implements HasForms
{
    use InteractsWithForms;

    protected static ?string $navigationIcon = 'heroicon-o-information-circle';
    protected static string $view = 'filament.admin.pages.about-page';
    protected static ?string $title = 'About';
    protected static ?string $navigationLabel = 'About';
    protected static ?int $navigationSort = 10;

    public ?array $data = [];

    public function mount(): void
    {
        $about = About::getInstance();
        $this->form->fill($about?->toArray() ?? []);
    }

    public function form(Form $form): Form
    {
        return $form
            ->schema([
                TextInput::make('name')
                    ->label('Name')
                    ->maxLength(255),
                TextInput::make('address')
                    ->label('Address')
                    ->maxLength(255),
                TextInput::make('phone')
                    ->label('Phone')
                    ->tel()
                    ->maxLength(255),
                TextInput::make('email')
                    ->label('Email')
                    ->email()
                    ->maxLength(255),
                TimePicker::make('opens_at')
                    ->label('Opens at')
                    ->seconds(false)
                    ->native(false)
                    ->extraInputAttributes(['lang' => 'uk']),
                TimePicker::make('closes_at')
                    ->label('Closes at')
                    ->seconds(false)
                    ->native(false)
                    ->extraInputAttributes(['lang' => 'uk']),
                FileUpload::make('video_guide')
                    ->label('Video Guide')
                    ->directory('video')
                    ->acceptedFileTypes(['video/mp4', 'video/webm', 'video/ogg', 'video/quicktime'])
                    ->rules(["max:102400"])
                    ->visibility('public'),
            ])
            ->statePath('data');
    }

    public function save(): void
    {
        $data = $this->form->getState();
        About::getInstance()->update($data);

        Notification::make()
            ->title('Saved successfully')
            ->success()
            ->send();
    }

    protected function getFormActions(): array
    {
        return [
            Action::make('save')
                ->label('Save changes')
                ->submit('save'),
        ];
    }
}
