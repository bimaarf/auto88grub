<?php

namespace App\Filament\Resources\Gallery;

use App\Filament\Resources\Gallery\FeedResource\Pages;
use App\Models\Gallery\Feed;
use Filament\Forms;
use Filament\Forms\Form;
use Filament\Infolists\Components;
use Filament\Infolists\Components\ImageEntry;
use Filament\Infolists\Components\TextEntry;
use Filament\Infolists\Infolist;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Table;
use Illuminate\Support\Facades\Storage;

class FeedResource extends Resource
{
    protected static ?string $model = Feed::class;

    protected static ?string $slug = 'gallery/feeds';

    protected static ?string $recordTitleAttribute = 'name';

    protected static ?string $navigationGroup = 'Gallery';

    protected static ?string $navigationIcon = 'heroicon-o-circle-stack';

    protected static ?int $navigationSort = 0;

    public static function form(Form $form): Form
    {
        return $form
            ->schema([
                Forms\Components\Select::make('category')
                    ->options([
                        'advantage' => 'Advantage',
                        'recruitment' => 'Recruitment',
                        'cover' => 'Cover (3:4)',
                    ])
                    ->required()
                    ->native(false),

                Forms\Components\FileUpload::make('image')
                    ->label('Image')
                    ->required()
                    ->directory('gallery-feeds-attachments')
                    ->image(),
            ])->columns(1);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->reorderable('order_column')
            ->columns([
                Tables\Columns\TextColumn::make('category')
                    ->searchable()
                    ->sortable(),

                Tables\Columns\ImageColumn::make('image')
                    ->label('Image')
                    ->height(100),

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
                        TextEntry::make('category'),
                        ImageEntry::make('image')
                            ->height(300),
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
            'index' => Pages\ManageFeeds::route('/'),
        ];
    }
}
