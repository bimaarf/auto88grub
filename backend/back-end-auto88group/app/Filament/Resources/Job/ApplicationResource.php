<?php

namespace App\Filament\Resources\Job;

use App\Filament\Resources\Job\ApplicationResource\Pages;
use App\Models\Job\Vacancy;
use App\Models\Job\Application;
use Filament\Forms;
use Filament\Forms\Form;
use Filament\Infolists\Components;
use Filament\Infolists\Components\IconEntry;
use Filament\Infolists\Infolist;
use Filament\Resources\Resource;
use Filament\Infolists\Components\TextEntry;
use Filament\Tables;
use Filament\Tables\Table;

class ApplicationResource extends Resource
{
    protected static ?string $model = Application::class;

    protected static ?string $slug = 'job/models';

    protected static ?string $recordTitleAttribute = 'name';

    protected static ?string $navigationGroup = 'Job';

    protected static ?string $navigationIcon = 'heroicon-o-circle-stack';

    protected static ?int $navigationSort = 1;

    public static function form(Form $form): Form
    {
        return $form
            ->schema([
                Forms\Components\Select::make('job_vacancy_id')
                    ->relationship('vacancy', 'name')
                    ->searchable()
                    ->options(Vacancy::limit(10)->pluck('name', 'id'))
                    ->required(),

                Forms\Components\TextInput::make('name')
                    ->required()
                    ->unique(Application::class, 'name', ignoreRecord: true),
            ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                Tables\Columns\TextColumn::make('vacancy.name')
                    ->searchable()
                    ->sortable(),

                Tables\Columns\TextColumn::make('name')
                    ->searchable()
                    ->sortable(),

                Tables\Columns\TextColumn::make('phone_number')
                    ->searchable()
                    ->sortable()
                    ->toggleable(isToggledHiddenByDefault: true),

                Tables\Columns\TextColumn::make('email')
                    ->searchable()
                    ->sortable()
                    ->toggleable(isToggledHiddenByDefault: true),

                Tables\Columns\TextColumn::make('domicile')
                    ->searchable()
                    ->sortable(),

                Tables\Columns\TextColumn::make('education')
                    ->searchable()
                    ->sortable(),

                Tables\Columns\TextColumn::make('major')
                    ->searchable()
                    ->sortable(),

                Tables\Columns\IconColumn::make('fresh_graduate')
                    ->boolean(),

                Tables\Columns\TextColumn::make('updated_at')
                    ->label('Last Updated')
                    ->dateTime()
                    ->sortable(),
            ])
            ->actions([
                Tables\Actions\ViewAction::make(),
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
                        TextEntry::make('vacancy.name'),
                        TextEntry::make('name'),
                        TextEntry::make('phone_number'),
                        TextEntry::make('email'),
                        TextEntry::make('domicile'),
                        TextEntry::make('education'),
                        TextEntry::make('major'),
                        IconEntry::make('fresh_graduate')
                            ->boolean(),
                        TextEntry::make('file')
                            ->url(fn (Application $record): string => '../storage/' . $record->file)
                            ->openUrlInNewTab(),
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
            'index' => Pages\ManageApplications::route('/'),
        ];
    }
}
