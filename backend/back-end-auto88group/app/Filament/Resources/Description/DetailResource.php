<?php

namespace App\Filament\Resources\Description;

use App\Filament\Resources\Description\DetailResource\Pages;
use App\Models\Description\Category;
use App\Models\Description\Detail;
use Filament\Forms;
use Filament\Forms\Form;
use Filament\Infolists\Components;
use Filament\Infolists\Infolist;
use Filament\Infolists\Components\TextEntry;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Table;

class DetailResource extends Resource
{
    protected static ?string $model = Detail::class;

    protected static ?string $slug = 'description/models';

    protected static ?string $recordTitleAttribute = 'name';

    protected static ?string $navigationGroup = 'Description';

    protected static ?string $navigationIcon = 'heroicon-o-circle-stack';

    protected static ?int $navigationSort = 1;

    public static function form(Form $form): Form
    {
        return $form
            ->schema([
                Forms\Components\Select::make('description_category_id')
                    ->relationship('category', 'name')
                    ->searchable()
                    ->options(Category::limit(10)->pluck('name', 'id'))
                    ->required(),

                Forms\Components\TextInput::make('name')
                    ->required()
                    ->unique(Detail::class, 'name', ignoreRecord: true),
            ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                Tables\Columns\TextColumn::make('category.name')
                    ->searchable()
                    ->sortable(),

                Tables\Columns\TextColumn::make('name')
                    ->searchable()
                    ->sortable(),

                Tables\Columns\TextColumn::make('updated_at')
                    ->label('Last Updated')
                    ->dateTime()
                    ->sortable(),
            ])
            ->actions([
                Tables\Actions\ViewAction::make(),
                Tables\Actions\EditAction::make(),
                Tables\Actions\DeleteAction::make(),
            ])
            ->groupedBulkActions([
                Tables\Actions\DeleteBulkAction::make(),
            ]);
    }

    public static function infolist(Infolist $infolist): Infolist
    {
        return $infolist
            ->schema([
                Components\Section::make()
                    ->schema([
                        TextEntry::make('category.name'),
                        TextEntry::make('name'),
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
            'index' => Pages\ManageDetails::route('/'),
        ];
    }
}
