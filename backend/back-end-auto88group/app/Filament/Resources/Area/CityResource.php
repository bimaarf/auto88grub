<?php

namespace App\Filament\Resources\Area;

use App\Filament\Resources\Area\CityResource\Pages;
use App\Models\Area\Province;
use App\Models\Area\City;
use App\Models\Area\District;
use Filament\Forms;
use Filament\Forms\Form;
use Filament\Infolists\Components;
use Filament\Infolists\Infolist;
use Filament\Infolists\Components\TextEntry;
use Filament\Notifications\Notification;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Table;

class CityResource extends Resource
{
    protected static ?string $model = City::class;

    protected static ?string $slug = 'area/cities';

    protected static ?string $recordTitleAttribute = 'name';

    protected static ?string $navigationGroup = 'Area';

    protected static ?string $navigationIcon = 'heroicon-o-circle-stack';

    protected static ?int $navigationSort = 1;

    public static function form(Form $form): Form
    {
        return $form
            ->schema([
                Forms\Components\Select::make('area_province_id')
                    ->relationship('province', 'name')
                    ->searchable()
                    ->options(Province::limit(10)->pluck('name', 'id'))
                    ->required(),

                Forms\Components\TextInput::make('name')
                    ->required()
                    ->unique(City::class, 'name', ignoreRecord: true),
            ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                Tables\Columns\TextColumn::make('province.name')
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
                        if (District::where('area_city_id', $record->id)->count() > 0) {
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
                        TextEntry::make('province.name'),
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
            'index' => Pages\ManageCities::route('/'),
        ];
    }
}
