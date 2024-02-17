<?php

namespace App\Filament\Resources\Car;

use App\Filament\Resources\Car\TypeResource\Pages;
use App\Models\Car\Brand;
use App\Models\Car\Model as CarModel;
use App\Models\Car\Type;
use Filament\Forms;
use Filament\Forms\Form;
use Filament\Infolists\Components;
use Filament\Infolists\Components\TextEntry;
use Filament\Infolists\Infolist;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Table;

class TypeResource extends Resource
{
    protected static ?string $model = Type::class;

    protected static ?string $slug = 'car/types';

    protected static ?string $recordTitleAttribute = 'name';

    protected static ?string $navigationGroup = 'Car';

    protected static ?string $navigationIcon = 'heroicon-o-circle-stack';

    protected static ?int $navigationSort = 3;

    public static function form(Form $form): Form
    {
        return $form
            ->schema([
                Forms\Components\Select::make('car_brand_id')
                    ->live()
                    ->relationship('brand', 'name')
                    ->searchable()
                    ->options(Brand::limit(10)->pluck('name', 'id'))
                    ->required()

                    // ->columnSpan(fn(callable $get) => !empty($get('car_brand_id')) ? 1 : 2)

                    ->afterStateUpdated(fn ($set) => $set('car_model_id', null)),

                Forms\Components\Select::make('car_model_id')
                    ->searchable()
                    ->live()

                    // ->disabled(function (callable $get) {
                    //     if (!$get('car_brand_id')) {
                    //         return true;
                    //     } else {
                    //         return false;
                    //     };
                    // })

                    // ->disabled(fn(callable $get) => empty($get('car_brand_id')))

                    // ->visible(fn(callable $get) => $get('car_brand_id'))

                    ->required()
                    ->options(function (callable $get) {
                        if (!$get('car_brand_id')) {
                            return;
                        } else {
                            $brand = Brand::find($get('car_brand_id'));

                            if (!$brand) {
                                return CarModel::limit(10)->pluck('name', 'id');
                            }

                            return $brand->models->pluck('name', 'id');
                        }
                    }),

                Forms\Components\TextInput::make('name')
                    ->required()
                    ->unique(Type::class, 'name', ignoreRecord: true)
                    ->columnSpan(2),
            ])->columns(2);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                Tables\Columns\TextColumn::make('brand.name')
                    ->searchable()
                    ->sortable(),

                Tables\Columns\TextColumn::make('model.name')
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
                        TextEntry::make('brand.name'),
                        TextEntry::make('model.name'),
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
            'index' => Pages\ManageTypes::route('/'),
        ];
    }
}
