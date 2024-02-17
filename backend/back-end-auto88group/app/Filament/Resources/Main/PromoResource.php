<?php

namespace App\Filament\Resources\Main;

use App\Filament\Resources\Main\PromoResource\Pages;
use App\Models\Main\Car;
use App\Models\Main\Promo;
use App\Models\Other\Leasing;
use App\Models\Photo\Official;
use App\Models\Photo\Original;
use App\Models\Photo\Outdoor;
use Filament\Tables\Actions\Action;
use Filament\Tables\Actions\DeleteAction;
use Filament\Tables\Actions\ActionGroup;
use Filament\Tables\Actions\EditAction;
use Filament\Tables\Actions\ReplicateAction;
use Filament\Tables\Actions\ViewAction;
use Filament\Forms;
use Filament\Forms\Components\FileUpload;
use Filament\Infolists\Components\Grid;
use Filament\Forms\Components\Select;
use Filament\Infolists\Components\Tabs;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Toggle;
use Filament\Forms\Form;
use Filament\Infolists\Components;
use Filament\Infolists\Components\ImageEntry;
use Filament\Infolists\Components\RepeatableEntry;
use Filament\Infolists\Components\TextEntry;
use Filament\Infolists\Infolist;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Columns\IconColumn;
use Filament\Tables\Columns\ImageColumn;
use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Columns\ToggleColumn;
use Filament\Tables\Enums\ActionsPosition;
use Filament\Tables\Table;
use Illuminate\Support\Facades\Storage;

class PromoResource extends Resource
{
    protected static ?string $model = Promo::class;

    protected static ?string $slug = 'main/promos';

    protected static ?string $recordTitleAttribute = 'name';

    protected static ?string $navigationGroup = 'Main';

    protected static ?string $navigationIcon = 'heroicon-o-circle-stack';

    protected static ?int $navigationSort = 1;

    public static function form(Form $form): Form
    {
        return $form
            ->schema([
                Select::make('car_id')
                    ->label('Police number')
                    ->searchable()
                    ->options(Car::limit(10)->where('is_sold', 0)->pluck('police_number', 'id'))
                    ->required(),

                TextInput::make('price')
                    ->default(0)
                    ->currencyMask(thousandSeparator: '.', decimalSeparator: ',', precision: 0)
                    ->required(),

                TextInput::make('discount')
                    ->default(0)
                    ->currencyMask(thousandSeparator: '.', decimalSeparator: ',', precision: 0)
                    ->required(),

                TextInput::make('down_payment')
                    ->default(0)
                    ->currencyMask(thousandSeparator: '.', decimalSeparator: ',', precision: 0)
                    ->required(),

                TextInput::make('total_down_payment')
                    ->default(0)
                    ->currencyMask(thousandSeparator: '.', decimalSeparator: ',', precision: 0)
                    ->required(),

                TextInput::make('payment_to_dealer')
                    ->default(0)
                    ->currencyMask(thousandSeparator: '.', decimalSeparator: ',', precision: 0)
                    ->required(),

                TextInput::make('on_the_road')
                    ->default(0)
                    ->currencyMask(thousandSeparator: '.', decimalSeparator: ',', precision: 0)
                    ->required(),

                TextInput::make('monthly_installment')
                    ->default(0)
                    ->currencyMask(thousandSeparator: '.', decimalSeparator: ',', precision: 0)
                    ->required(),

                TextInput::make('installment_period')
                    ->default(0)
                    ->currencyMask(thousandSeparator: '.', decimalSeparator: ',', precision: 0)
                    ->required(),

                TextInput::make('deviasi')
                    ->label('Deviasi (%)')
                    ->default(0)
                    ->currencyMask(decimalSeparator: '.', precision: 2)
                    ->required(),

                TextInput::make('rate')
                    ->label('Rate (%)')
                    ->default(0)
                    ->currencyMask(decimalSeparator: '.', precision: 2)
                    ->required(),

                TextInput::make('mrp')
                    ->label('MRP')
                    ->default(0)
                    ->currencyMask(thousandSeparator: '.', decimalSeparator: ',', precision: 0)
                    ->required(),

                Select::make('leasing_id')
                    ->label('Leasing')
                    ->searchable()
                    ->options(Leasing::limit(10)->pluck('name', 'id'))
                    ->required(),

                Select::make('insurance')
                    ->options([
                        'TLO' => 'TLO',
                        'ALL RISK' => 'ALL RISK',
                        'COMBI 1' => 'COMBI 1',
                        'COMBI 2' => 'COMBI 2',
                        'COMBI 3' => 'COMBI 3',
                        'COMBI 4' => 'COMBI 4',
                        'COMBI 5' => 'COMBI 5',
                    ])
                    ->required(),

                Select::make('guarantee')
                    ->options([
                        '1 YEAR' => '1 YEAR',
                        '2 YEAR' => '2 YEAR',
                        '3 YEAR' => '3 YEAR',
                        '4 YEAR' => '4 YEAR',
                        '5 YEAR' => '5 YEAR',
                        '6 YEAR' => '6 YEAR',
                    ]),

                Select::make('administration')
                    ->options([
                        'ADDM' => 'ADDM',
                        'ADDB' => 'ADDB',
                    ])
                    ->required(),
            ])->columns(4);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                TextColumn::make('car.police_number')
                    ->label('Police Number')
                    ->searchable(isIndividual: true, isGlobal: true)
                    ->sortable(),

                ImageColumn::make('image')
                    ->url(fn (Promo $record): string => '../storage/' . $record->image)
                    ->openUrlInNewTab()
                    ->height(80),

                TextColumn::make('car.slug')
                    ->searchable(isIndividual: true, isGlobal: true)
                    ->getStateUsing(function ($record) {
                        return strtoupper($record->car->slug);
                    })
                    ->sortable()
                    ->copyable()
                    ->copyMessage('Copied!')
                    ->copyMessageDuration(1500),

                TextColumn::make('down_payment')
                    ->numeric(
                        decimalPlaces: 0,
                        decimalSeparator: ',',
                        thousandsSeparator: '.',
                    )
                    ->sortable(),

                TextColumn::make('monthly_installment')
                    ->numeric(
                        decimalPlaces: 0,
                        decimalSeparator: ',',
                        thousandsSeparator: '.',
                    )
                    ->sortable(),

                // ToggleColumn::make('is_guarantee')
                //     ->sortable()
                //     ->searchable(),

                // IconColumn::make('is_guarantee')
                //     ->sortable()
                //     ->boolean(),

                TextColumn::make('leasing.name')
                    ->sortable()
                    ->searchable(),

                TextColumn::make('guarantee')
                    ->sortable()
                    ->searchable(),

                ToggleColumn::make('is_pinned')
                    ->sortable()
                    ->searchable(),

                ToggleColumn::make('is_visible')
                    ->sortable()
                    ->searchable(),

                ToggleColumn::make('is_done')
                    ->sortable()
                    ->searchable(),

                ImageColumn::make('car.originals.image')
                    ->circular()
                    ->stacked()
                    ->limit(3)
                    // ->defaultImageUrl(url('/images/placeholder.png'))
                    ->limitedRemainingText(),

                ImageColumn::make('car.outdoors.image')
                    ->circular()
                    ->stacked()
                    ->limit(3)
                    ->limitedRemainingText(),

                ImageColumn::make('car.officials.image')
                    ->circular()
                    ->stacked()
                    ->limit(3)
                    ->limitedRemainingText(),

                TextColumn::make('created_at')
                    // ->dateTime()
                    ->date()
                    ->sortable(),
            ])
            ->actions([
                ActionGroup::make([
                    ViewAction::make(),
                    // Action::make('edit_visibility')
                    //     ->icon('heroicon-m-eye')
                    //     ->form([
                    //         Toggle::make('is_visible')
                    //             ->default(fn (Promo $record) => $record->is_visible),
                    //     ])
                    //     ->action(function (array $data, Promo $record): void {
                    //         $record->is_visible = $data['is_visible'];
                    //         $record->save();
                    //     }),
                    // Action::make('edit_as_done')
                    //     ->icon('heroicon-m-eye')
                    //     ->form([
                    //         Toggle::make('is_done')
                    //             ->default(fn (Promo $record) => $record->is_done),
                    //     ])
                    //     ->action(function (array $data, Promo $record): void {
                    //         $record->is_done = $data['is_done'];
                    //         $record->save();
                    //     }),
                    EditAction::make(),
                    // ->before(function ($record) {
                    //     ($record->image != null) ??  Storage::disk('public')->delete($record->image);
                    // }),
                    Action::make('upload_image')
                        ->icon('heroicon-m-photo')
                        ->form([
                            FileUpload::make('image')
                                ->label('Image')
                                ->directory('car-promos-attachments')
                                ->image(),
                        ])
                        ->action(function (array $data, Promo $record): void {
                            if ($record->image != null) {
                                Storage::disk('public')->delete($record->image);
                            };

                            $record->image = $data['image'];
                            $record->save();
                        }),
                    ReplicateAction::make()
                        ->excludeAttributes(['image', 'is_visible', 'is_done', 'is_guarantee'])
                        ->requiresConfirmation(),
                    DeleteAction::make()
                        ->before(function ($record) {
                            if ($record->image != null) {
                                Storage::disk('public')->delete($record->image);
                            };
                        }),
                ])
            ], position: ActionsPosition::BeforeCells)->defaultSort('created_at', 'desc');
        // ->groupedBulkActions([
        //     Tables\Actions\DeleteBulkAction::make(),
        // ]);
    }

    public static function infolist(Infolist $infolist): Infolist
    {
        return $infolist
            ->schema([
                Tabs::make('Label')
                    ->tabs([
                        Tabs\Tab::make('Detail')
                            ->schema([
                                Grid::make(4)
                                    ->schema([
                                        TextEntry::make('car.police_number')
                                            ->label('Police Number')
                                            ->color('gray'),

                                        TextEntry::make('price')
                                            ->placeholder('-')
                                            ->numeric(
                                                decimalPlaces: 0,
                                                decimalSeparator: ',',
                                                thousandsSeparator: '.',
                                            )
                                            ->color('gray'),

                                        TextEntry::make('discount')
                                            ->placeholder('-')
                                            ->numeric(
                                                decimalPlaces: 0,
                                                decimalSeparator: ',',
                                                thousandsSeparator: '.',
                                            )
                                            ->color('gray'),

                                        TextEntry::make('down_payment')
                                            ->placeholder('-')
                                            ->numeric(
                                                decimalPlaces: 0,
                                                decimalSeparator: ',',
                                                thousandsSeparator: '.',
                                            )
                                            ->color('gray'),

                                        TextEntry::make('total_down_payment')
                                            ->placeholder('-')
                                            ->numeric(
                                                decimalPlaces: 0,
                                                decimalSeparator: ',',
                                                thousandsSeparator: '.',
                                            )
                                            ->color('gray'),

                                        TextEntry::make('payment_to_dealer')
                                            ->placeholder('-')
                                            ->numeric(
                                                decimalPlaces: 0,
                                                decimalSeparator: ',',
                                                thousandsSeparator: '.',
                                            )
                                            ->color('gray'),

                                        TextEntry::make('on_the_road')
                                            ->placeholder('-')
                                            ->numeric(
                                                decimalPlaces: 0,
                                                decimalSeparator: ',',
                                                thousandsSeparator: '.',
                                            )
                                            ->color('gray'),

                                        TextEntry::make('monthly_installment')
                                            ->placeholder('-')
                                            ->numeric(
                                                decimalPlaces: 0,
                                                decimalSeparator: ',',
                                                thousandsSeparator: '.',
                                            )
                                            ->color('gray'),

                                        TextEntry::make('installment_period')
                                            ->placeholder('-')
                                            ->numeric(
                                                decimalPlaces: 0,
                                                decimalSeparator: ',',
                                                thousandsSeparator: '.',
                                            )
                                            ->color('gray'),

                                        TextEntry::make('deviasi')
                                            ->label('Deviasi (%)')
                                            ->placeholder('-')
                                            ->numeric(
                                                decimalSeparator: '.',
                                                decimalPlaces: 2,
                                            )
                                            ->color('gray'),

                                        TextEntry::make('rate')
                                            ->label('Rate (%)')
                                            ->placeholder('-')
                                            ->numeric(
                                                decimalSeparator: '.',
                                                decimalPlaces: 2,
                                            )
                                            ->color('gray'),

                                        TextEntry::make('mrp')
                                            ->label('MRP')
                                            ->placeholder('-')
                                            ->numeric(
                                                decimalPlaces: 0,
                                                decimalSeparator: ',',
                                                thousandsSeparator: '.',
                                            )
                                            ->color('gray'),

                                        TextEntry::make('leasing.name')
                                            ->color('gray'),

                                        TextEntry::make('insurance')
                                            ->color('gray'),

                                        TextEntry::make('guarantee')
                                            ->color('gray'),

                                        TextEntry::make('administration')
                                            ->color('gray'),
                                    ]),
                            ]),
                        Tabs\Tab::make('Description')
                            ->schema([
                                TextEntry::make('car.slug')
                                    ->placeholder('-')
                                    ->columnSpanFull()
                                    ->copyable()
                                    ->copyMessage('Copied!')
                                    ->copyMessageDuration(1500)
                                    ->color('gray'),
                            ]),
                        Tabs\Tab::make('Photos')
                            ->schema([
                                RepeatableEntry::make('car.originals')
                                    ->placeholder('-')
                                    ->schema([
                                        ImageEntry::make('image')
                                            ->height(160)
                                            ->square()
                                            ->hiddenLabel(true)
                                            ->url(fn (Original $record): string => '../storage/' . $record->image)
                                            ->openUrlInNewTab(),
                                    ])
                                    ->grid(4)
                                    ->contained(false),
                                RepeatableEntry::make('car.outdoors')
                                    ->placeholder('-')
                                    ->schema([
                                        ImageEntry::make('image')
                                            ->height(160)
                                            ->square()
                                            ->hiddenLabel(true)
                                            ->url(fn (Outdoor $record): string => '../storage/' . $record->image)
                                            ->openUrlInNewTab(),
                                    ])
                                    ->grid(4)
                                    ->contained(false),
                                RepeatableEntry::make('car.officials')
                                    ->placeholder('-')
                                    ->schema([
                                        ImageEntry::make('image')
                                            ->height(160)
                                            ->square()
                                            ->hiddenLabel(true)
                                            ->url(fn (Official $record): string => '../storage/' . $record->image)
                                            ->openUrlInNewTab(),
                                    ])
                                    ->grid(4)
                                    ->contained(false)
                            ]),
                        Tabs\Tab::make('updated_at')
                            ->label('Updated at')
                            ->schema([
                                TextEntry::make('updated_at')
                                    ->dateTime()
                                    ->placeholder('-')
                                    ->columnSpanFull()
                                    ->color('gray'),
                            ]),
                    ])->columnSpanFull()
            ]);
    }

    public static function getPages(): array
    {
        return [
            'index' => Pages\ManagePromos::route('/'),
        ];
    }
}
