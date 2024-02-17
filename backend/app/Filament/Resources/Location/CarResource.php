<?php

namespace App\Filament\Resources\Location;

use App\Filament\Resources\Location\CarResource\Pages;
use App\Models\Location\Car;
use Filament\Forms;
use Filament\Forms\Form;
use Filament\Infolists\Components\IconEntry;
use Filament\Infolists\Components\TextEntry;
use Filament\Infolists\Infolist;
use Filament\Resources\Resource;
use Filament\Infolists\Components;
use Filament\Tables;
use Filament\Tables\Table;

class CarResource extends Resource
{
    protected static ?string $label = 'Car Location';

    protected static ?string $model = Car::class;

    protected static ?string $slug = 'location/cars';

    protected static ?string $recordTitleAttribute = 'name';

    protected static ?string $navigationGroup = 'Location';

    protected static ?string $navigationIcon = 'heroicon-o-circle-stack';

    protected static ?int $navigationSort = 1;

    public static function form(Form $form): Form
    {
        return $form
            ->schema([
                Forms\Components\TextInput::make('latitude')
                    ->label('Latitude')
                    ->numeric()
                    ->required(),

                Forms\Components\TextInput::make('longitude')
                    ->label('Longitude')
                    ->numeric()
                    ->required(),

                Forms\Components\TextInput::make('name')
                    ->required()
                    ->live(onBlur: true)
                    ->unique(Car::class, 'name', ignoreRecord: true),

                Forms\Components\TextInput::make('limitation')
                    ->live()
                    ->label('Limitation')
                    ->numeric()
                    ->rules(['integer', 'min:0'])
                    ->disabled(fn ($get) => $get('is_unlimited'))
                    ->required(),

                Forms\Components\Toggle::make('is_visible')
                    ->onColor('success')
                    ->offColor('danger')
                    ->label('Visible to users.')
                    ->default(true),

                Forms\Components\Toggle::make('is_unlimited')
                    ->live()
                    ->onColor('success')
                    ->offColor('danger')
                    ->label('Set to unlimited.')
                    ->default(false)
                    ->afterStateUpdated(fn (string $operation, $state, Forms\Set $set) => $operation == true ? $set('limitation', 0) : null),
            ])->columns(2);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                Tables\Columns\TextColumn::make('name')
                    ->searchable()
                    ->sortable(),

                Tables\Columns\TextColumn::make('latitude')
                    ->searchable()
                    ->sortable()
                    ->toggleable(isToggledHiddenByDefault: true),

                Tables\Columns\TextColumn::make('longitude')
                    ->searchable()
                    ->sortable()
                    ->toggleable(isToggledHiddenByDefault: true),

                Tables\Columns\IconColumn::make('is_unlimited')
                    ->label('Unlimited')
                    ->boolean(),

                Tables\Columns\TextColumn::make('limitation')
                    ->searchable()
                    ->sortable(),

                Tables\Columns\IconColumn::make('is_visible')
                    ->label('Visibility')
                    ->boolean(),

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
                        TextEntry::make('name'),
                        TextEntry::make('latitude'),
                        TextEntry::make('longitude'),
                        IconEntry::make('is_unlimited')
                            ->label('Unlimited')
                            ->boolean(),
                        TextEntry::make('limitation'),
                        IconEntry::make('is_visible')
                            ->label('Visibility')
                            ->boolean(),
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
            'index' => Pages\ManageCars::route('/'),
        ];
    }
}
