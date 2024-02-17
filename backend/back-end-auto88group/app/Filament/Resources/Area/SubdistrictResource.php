<?php

namespace App\Filament\Resources\Area;

use App\Filament\Resources\Area\SubdistrictResource\Pages;
use App\Models\Area\Province;
use App\Models\Area\City;
use App\Models\Area\District;
use App\Models\Area\Subdistrict;
use Filament\Forms;
use Filament\Forms\Form;
use Filament\Infolists\Components;
use Filament\Infolists\Components\TextEntry;
use Filament\Infolists\Infolist;
use Filament\Notifications\Notification;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Table;

class SubdistrictResource extends Resource
{
    protected static ?string $model = Subdistrict::class;

    protected static ?string $slug = 'area/subdistricts';

    protected static ?string $recordTitleAttribute = 'name';

    protected static ?string $navigationGroup = 'Area';

    protected static ?string $navigationIcon = 'heroicon-o-circle-stack';

    protected static ?int $navigationSort = 3;

    public static function form(Form $form): Form
    {
        return $form
            ->schema([
                Forms\Components\Select::make('area_province_id')
                    ->live()
                    ->relationship('province', 'name')
                    ->searchable()
                    ->required()
                    ->options(Province::limit(10)->pluck('name', 'id'))
                    ->afterStateUpdated(fn ($set) => $set('area_city_id', null)),

                Forms\Components\Select::make('area_city_id')
                    ->live()
                    ->searchable()
                    ->required()
                    ->options(function (callable $get) {
                        if (!$get('area_province_id')) {
                            return;
                        } else {
                            $province = Province::find($get('area_province_id'));

                            if (!$province) {
                                return City::limit(10)->pluck('name', 'id');
                            }

                            return $province->cities->pluck('name', 'id');
                        }
                    })
                    ->afterStateUpdated(fn ($set) => $set('area_district_id', null)),

                Forms\Components\Select::make('area_district_id')
                    ->live()
                    ->searchable()
                    ->required()
                    ->options(function (callable $get) {
                        if (!$get('area_city_id')) {
                            return;
                        } else {
                            $city = City::find($get('area_city_id'));

                            if (!$city) {
                                return District::limit(10)->pluck('name', 'id');
                            }

                            return $city->districts->pluck('name', 'id');
                        }
                    }),

                Forms\Components\TextInput::make('name')
                    ->required()
                    ->unique(Subdistrict::class, 'name', ignoreRecord: true),
            ])->columns(2);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                Tables\Columns\TextColumn::make('province.name')
                    ->searchable()
                    ->sortable(),

                Tables\Columns\TextColumn::make('city.name')
                    ->searchable()
                    ->sortable(),

                Tables\Columns\TextColumn::make('district.name')
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
                Tables\Actions\DeleteAction::make()
                    ->before(function (Tables\Actions\DeleteAction $action, $record) {
                        // buat proteksi jangan hapus misal cek di tabel prospek, atau lainnya
                        // ...
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
                        TextEntry::make('province.name'),
                        TextEntry::make('city.name'),
                        TextEntry::make('district.name'),
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
            'index' => Pages\ManageSubdistricts::route('/'),
        ];
    }
}
