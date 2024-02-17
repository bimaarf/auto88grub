<?php

namespace App\Filament\Resources\Other;

use App\Filament\Resources\Other\CustomerServiceResource\Pages;
use App\Models\Other\CustomerService;
use Filament\Forms;
use Filament\Forms\Form;
use Filament\Infolists\Components;
use Filament\Infolists\Components\TextEntry;
use Filament\Infolists\Infolist;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Table;

class CustomerServiceResource extends Resource
{
    protected static ?string $model = CustomerService::class;

    protected static ?string $slug = 'other/customer-services';

    protected static ?string $recordTitleAttribute = 'name';

    protected static ?string $navigationGroup = 'Other';

    protected static ?string $navigationIcon = 'heroicon-o-circle-stack';

    protected static ?int $navigationSort = 1;

    public static function form(Form $form): Form
    {
        return $form
            ->schema([
                Forms\Components\TextInput::make('name')
                    ->required()
                    ->unique(CustomerService::class, 'name', ignoreRecord: true),

                Forms\Components\TextInput::make('phone_number')
                    ->prefix('62')
                    ->required()
                    ->unique(CustomerService::class, 'phone_number', ignoreRecord: true)
                    ->dehydrateStateUsing(fn (string $state): string => '62' . $state),
            ])->columns(1);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                Tables\Columns\TextColumn::make('name')
                    ->searchable()
                    ->sortable(),

                Tables\Columns\TextColumn::make('phone_number')
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
                        TextEntry::make('name'),
                        TextEntry::make('phone_number'),
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
            'index' => Pages\ManageCustomerServices::route('/'),
        ];
    }
}
