<?php

namespace App\Filament\Resources\Job;

use App\Filament\Resources\Job\VacancyResource\Pages;
use App\Models\Job\Vacancy;
use App\Models\Job\Application;
use Filament\Forms;
use Filament\Forms\Components\SpatieTagsInput;
use Filament\Forms\Form;
use Filament\Infolists\Components;
use Filament\Infolists\Infolist;
use Filament\Infolists\Components\TextEntry;
use Filament\Notifications\Notification;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Table;

class VacancyResource extends Resource
{
    protected static ?string $label = 'Vacancy';

    protected static ?string $model = Vacancy::class;

    protected static ?string $slug = 'job/categories';

    protected static ?string $recordTitleAttribute = 'name';

    protected static ?string $navigationGroup = 'Job';

    protected static ?string $navigationIcon = 'heroicon-o-circle-stack';

    protected static ?int $navigationSort = 0;

    public static function form(Form $form): Form
    {
        return $form
            ->schema([
                Forms\Components\TextInput::make('name')
                    ->required()
                    ->unique(Vacancy::class, 'name', ignoreRecord: true),

                Forms\Components\TextInput::make('department')
                    ->required()
                    ->unique(Vacancy::class, 'department', ignoreRecord: true),

                Forms\Components\TextInput::make('experience')
                    ->required()
                    ->unique(Vacancy::class, 'experience', ignoreRecord: true),

                Forms\Components\TextInput::make('placement')
                    ->required(),

                Forms\Components\RichEditor::make('description')
                    ->required()
                    ->columnSpan(2),

                Forms\Components\RichEditor::make('condition')
                    ->required()
                    ->columnSpan(2),
            ])->columns(2);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                Tables\Columns\TextColumn::make('name')
                    ->searchable()
                    ->sortable(),

                Tables\Columns\TextColumn::make('department')
                    ->searchable()
                    ->sortable(),

                Tables\Columns\TextColumn::make('experience')
                    ->searchable()
                    ->sortable(),

                Tables\Columns\TextColumn::make('placement')
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
                Tables\Actions\DeleteAction::make()
                    ->before(function (Tables\Actions\DeleteAction $action, $record) {
                        if (Application::where('job_vacancy_id', $record->id)->count() > 0) {
                            Notification::make()
                                ->warning()
                                ->title('Failed to delete')
                                ->body('Because it has been used in another table')
                                ->send();

                            $action->cancel();
                        }
                    })
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
                        TextEntry::make('name'),
                        TextEntry::make('department'),
                        TextEntry::make('experience'),
                        TextEntry::make('placement'),
                        TextEntry::make('description')->html(),
                        TextEntry::make('condition')->html(),
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
            'index' => Pages\ManageVacancies::route('/'),
        ];
    }
}
