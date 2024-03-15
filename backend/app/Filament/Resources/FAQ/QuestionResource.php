<?php

namespace App\Filament\Resources\FAQ;

use App\Filament\Resources\FAQ\QuestionResource\Pages;
use App\Models\FAQ\Category;
use App\Models\FAQ\Question;
use Filament\Forms;
use Filament\Forms\Form;
use Filament\Infolists\Components;
use Filament\Infolists\Infolist;
use Filament\Resources\Resource;
use Filament\Infolists\Components\TextEntry;
use Filament\Tables;
use Filament\Tables\Table;

class QuestionResource extends Resource
{
    protected static ?string $model = Question::class;

    protected static ?string $slug = 'faq/models';

    protected static ?string $recordTitleAttribute = 'name';

    protected static ?string $navigationGroup = 'FAQ';

    protected static ?string $navigationIcon = 'heroicon-o-circle-stack';

    protected static ?int $navigationSort = 1;

    public static function form(Form $form): Form
    {
        return $form
            ->schema([
                Forms\Components\Select::make('faq_category_id')
                    ->relationship('category', 'name')
                    ->searchable()
                    ->options(Category::limit(10)->pluck('name', 'id'))
                    ->required(),

                Forms\Components\TextInput::make('question')
                    ->required()
                    ->unique(Question::class, 'question', ignoreRecord: true),
                Forms\Components\TextInput::make('answer')
                    ->required()
                    ->unique(Question::class, 'answer', ignoreRecord: true),
            ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                Tables\Columns\TextColumn::make('category.name')
                    ->searchable()
                    ->sortable(),

                Tables\Columns\TextColumn::make('question')
                    ->searchable()
                    ->sortable(),
                Tables\Columns\TextColumn::make('answer')
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
                        TextEntry::make('question'),
                        TextEntry::make('answer'),
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
            'index' => Pages\ManageQuestions::route('/'),
        ];
    }
}
