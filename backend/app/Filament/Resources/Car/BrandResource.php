<?php

namespace App\Filament\Resources\Car;

use App\Filament\Resources\Car\BrandResource\Pages;
use App\Models\Car\Brand;
use App\Models\Main\Car;
use Filament\Forms;
use App\Models\Car\Model as CarModel;
use Filament\Forms\Form;
use Filament\Infolists\Components;
use Filament\Infolists\Components\TextEntry;
use Filament\Infolists\Infolist;
use Filament\Notifications\Notification;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Table;

class BrandResource extends Resource
{
    protected static ?string $model = Brand::class;

    protected static ?string $slug = 'car/brands';

    protected static ?string $recordTitleAttribute = 'name';

    protected static ?string $navigationGroup = 'Car';

    protected static ?string $navigationIcon = 'heroicon-o-circle-stack';

    protected static ?int $navigationSort = 1;

    public static function form(Form $form): Form
    {
        return $form
            ->schema([
                Forms\Components\TextInput::make('name')
                    ->required()
                    ->unique(Brand::class, 'name', ignoreRecord: true),
            ])->columns(1);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
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
                        if (CarModel::where('car_brand_id', $record->id)->count() > 0) {
                            Notification::make()
                                ->warning()
                                ->title('Failed to delete')
                                ->body('Because it has been used in "model" table')
                                // You might want some notifications to not automatically close and require the user to close them manually. This can be achieved by making the notification persistent:
                                // ->persistent()
                                // ->actions([
                                //     Action::make('subscribe')
                                //         ->button()
                                //         ->url(route('subscribe'), shouldOpenInNewTab: true),
                                // ])
                                ->send();

                            $action->cancel();
                        } else if (Car::where('car_brand_id', $record->id)->count() > 0) {
                            Notification::make()
                                ->warning()
                                ->title('Failed to delete')
                                ->body('Because it has been used in "car" table')
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
            'index' => Pages\ManageBrands::route('/'),
        ];
    }
}
