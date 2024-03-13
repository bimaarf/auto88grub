<?php

namespace App\Filament\Resources\Company;

use App\Filament\Resources\Company\PrivacyPolicyResource\Pages;
use App\Models\Company\PrivacyPolicy;
use Filament\Forms;
use Filament\Forms\Form;
use Filament\Infolists\Components;
use Filament\Infolists\Components\ImageEntry;
use Filament\Infolists\Infolist;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Infolists\Components\TextEntry;
use Filament\Tables\Table;
use Illuminate\Support\Facades\Storage;

class PrivacyPolicyResource extends Resource
{
    protected static ?string $model = PrivacyPolicy::class;

    protected static ?string $slug = 'company/policy';

    protected static ?string $recordTitleAttribute = 'title';

    protected static ?string $navigationGroup = 'Company';

    protected static ?string $navigationIcon = 'heroicon-o-circle-stack';

    protected static ?int $navigationSort = 7;

    public static function form(Form $form): Form
    {
        return $form
            ->schema([
                Forms\Components\Section::make()
                    ->schema([
                        Forms\Components\TextInput::make('title')
                            ->required()
                            ->unique(PrivacyPolicy::class, 'title', ignoreRecord: true),

                        Forms\Components\RichEditor::make('body')
                            ->required()
                            ->unique(PrivacyPolicy::class, 'body', ignoreRecord: true),

                        Forms\Components\FileUpload::make('image')
                            ->label('Image')
                            ->required()
                            ->directory('company-privacy-policy-attachments')
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
                        TextEntry::make('body')->html(),
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
            'index' => Pages\ManagePrivacyPolicy::route('/'),
        ];
    }
}
