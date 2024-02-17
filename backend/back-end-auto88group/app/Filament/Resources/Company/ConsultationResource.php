<?php

namespace App\Filament\Resources\Company;

use App\Filament\Resources\Company\ConsultationResource\Pages;
use App\Models\Company\Consultation;
use Filament\Forms;
use Filament\Forms\Form;
use Filament\Infolists\Components;
use Filament\Infolists\Components\ImageEntry;
use Filament\Infolists\Infolist;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Infolists\Components\TextEntry;
use Filament\Notifications\Notification;
use Filament\Tables\Table;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Storage;

class ConsultationResource extends Resource
{
    protected static ?string $model = Consultation::class;

    protected static ?string $slug = 'company/consultations';

    protected static ?string $recordTitleAttribute = 'title';

    protected static ?string $navigationGroup = 'Company';

    protected static ?string $navigationIcon = 'heroicon-o-circle-stack';

    protected static ?int $navigationSort = 1;

    public static function form(Form $form): Form
    {
        return $form
            ->schema([
                Forms\Components\Section::make()
                    ->schema([
                        Forms\Components\TextInput::make('title')
                            ->required()
                            ->unique(Consultation::class, 'title', ignoreRecord: true),

                        Forms\Components\TextInput::make('body')
                            ->required()
                            ->unique(Consultation::class, 'body', ignoreRecord: true),

                        Forms\Components\FileUpload::make('image')
                            ->label('Image')
                            ->required()
                            ->directory('company-consultation-attachments')
                            ->image(),
                    ]),
            ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                Tables\Columns\TextColumn::make('title')
                    ->searchable()
                    ->sortable(),

                Tables\Columns\TextColumn::make('body')
                    ->searchable()
                    ->sortable(),

                Tables\Columns\ImageColumn::make('image')
                    ->label('Image'),

                Tables\Columns\TextColumn::make('updated_at')
                    ->label('Last Updated')
                    ->dateTime()
                    ->sortable(),
            ])
            ->actions([
                Tables\Actions\ViewAction::make(),
                Tables\Actions\EditAction::make()
                    ->before(function ($record) {
                        Storage::disk('public')->delete($record->image);
                    }),
                Tables\Actions\DeleteAction::make()
                    ->before(function ($record) {
                        Storage::disk('public')->delete($record->image);
                    })
                ]);
            // ->groupedBulkActions([
            //     Tables\Actions\DeleteBulkAction::make(),
            // ]);
    }

    public static function infolist(Infolist $infolist): Infolist
    {
        return $infolist
            ->schema([
                Components\Section::make()
                    ->schema([
                        TextEntry::make('title'),
                        TextEntry::make('body'),
                        ImageEntry::make('image'),
                        TextEntry::make('updated_at')
                            ->dateTime(),
                    ])
                    ->columns(1)
                    ->inlineLabel()
            ]);
    }

    public static function getPages(): array
    {
        return [
            'index' => Pages\ManageConsultations::route('/'),
        ];
    }
}
