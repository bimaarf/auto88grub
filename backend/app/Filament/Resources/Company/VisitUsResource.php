<?php

namespace App\Filament\Resources\Company;

use App\Filament\Resources\Company\VisitUsResource\Pages;
use App\Models\Company\VisitUs;
use Filament\Forms;
use Filament\Forms\Form;
use Filament\Infolists\Components;
use Filament\Infolists\Infolist;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Infolists\Components\TextEntry;
use Filament\Tables\Table;
use Illuminate\Support\Facades\Storage;

class VisitUsResource extends Resource
{
    protected static ?string $label = 'Visit Us';

    protected static ?string $navigationLabel = 'Visit Us';

    protected static ?string $pluralLabel = 'Visit Us';

    protected static ?string $model = VisitUs::class;

    protected static ?string $slug = 'company/visitus';

    protected static ?string $recordTitleAttribute = 'title';

    protected static ?string $navigationGroup = 'Company';

    protected static ?string $navigationIcon = 'heroicon-o-circle-stack';

    protected static ?int $navigationSort = 5;

    public static function form(Form $form): Form
    {
        return $form
            ->schema([
                Forms\Components\Section::make()
                    ->schema([
                        Forms\Components\TextInput::make('title')
                            ->required()
                            ->unique(VisitUs::class, 'title', ignoreRecord: true),

                        Forms\Components\TextInput::make('body')
                            ->required()
                            ->unique(VisitUs::class, 'body', ignoreRecord: true),

                        Forms\Components\TextInput::make('google_maps')
                            ->required()
                            ->unique(VisitUs::class, 'google_maps', ignoreRecord: true),

                        Forms\Components\TextInput::make('direction')
                            ->required()
                            ->unique(VisitUs::class, 'direction', ignoreRecord: true),
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
                        // TextEntry::make('google_maps'),
                        TextEntry::make('direction')
                            ->copyable()
                            ->copyMessage('Copied!')
                            ->copyMessageDuration(1500),
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
            'index' => Pages\ManageVisitUs::route('/'),
        ];
    }
}
