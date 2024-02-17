<?php

namespace App\Filament\Resources\Gallery;

use App\Filament\Resources\Gallery\StoryResource\Pages;
use App\Models\Gallery\Story;
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

class StoryResource extends Resource
{
    protected static ?string $model = Story::class;

    protected static ?string $slug = 'gallery/stories';

    protected static ?string $recordTitleAttribute = 'name';

    protected static ?string $navigationGroup = 'Gallery';

    protected static ?string $navigationIcon = 'heroicon-o-circle-stack';

    protected static ?int $navigationSort = 1;

    public static function form(Form $form): Form
    {
        return $form
            ->schema([
                Forms\Components\Select::make('category')
                    ->options([
                        'education' => 'Education',
                        'quote' => 'Quote',
                        'cover' => 'Cover',
                        'calendar' => 'Calendar',
                        'advantage' => 'Advantage',
                        'photoshoot' => 'Photoshoot',
                        'poem' => 'Poem',
                    ])
                    ->required()
                    ->native(false),

                Forms\Components\FileUpload::make('image')
                    ->label('Image')
                    ->required()
                    ->directory('gallery-stories-attachments')
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
            'index' => Pages\ManageStories::route('/'),
        ];
    }
}
