<?php

namespace App\Filament\Resources\Main;

use App\Filament\Resources\Main\CarResource\Pages;
use App\Models\Car\Brand;
use App\Models\Main\Car;
use App\Models\Car\Cylinder;
use App\Models\Car\Kind;
use App\Models\Car\Model as CarModel;
use App\Models\Car\Transmission;
use App\Models\Car\Series;
use App\Models\Car\Gear;
use App\Models\Car\Fuel;
use App\Models\Car\Color;
use App\Models\Car\Row;
use App\Models\Car\Type;
use App\Models\Car\Year;
use App\Models\Photo\Official;
use App\Models\Photo\Original;
use App\Models\Photo\Outdoor;
use Filament\Actions\ReplicateAction;
use Filament\Forms\Components\DatePicker;
use Filament\Tables\Actions\ActionGroup;
use Filament\Forms\Components\FileUpload;
use Filament\Forms\Components\RichEditor;
use Filament\Forms\Components\Select;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Toggle;
use Filament\Forms\Form;
use Filament\Infolists\Components\Actions\Action as InfolistsAction;
use Filament\Infolists\Components\TextEntry;
use Filament\Infolists\Infolist;
use Filament\Resources\Resource;
use Filament\Tables\Actions\DeleteAction;
use Filament\Tables\Actions\DeleteBulkAction;
use Filament\Tables\Actions\EditAction;
use Filament\Tables\Actions\ViewAction;
use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Table;
use Filament\Infolists\Components\Grid;
use Filament\Infolists\Components\ImageEntry;
use Filament\Infolists\Components\RepeatableEntry;
use Filament\Infolists\Components\Tabs;
use Filament\Notifications\Notification;
use Filament\Support\Enums\ActionSize;
use Filament\Tables\Actions\Action;
use Filament\Tables\Columns\IconColumn;
use Filament\Tables\Columns\ImageColumn;
use Filament\Tables\Columns\ToggleColumn;
use Filament\Tables\Enums\ActionsPosition;
use Filament\Tables\Filters\SelectFilter;
use Filament\Tables\Filters\TernaryFilter;
use Illuminate\Support\Facades\Storage;
use Filament\Tables\Filters\Filter;
use Illuminate\Database\Eloquent\Builder;

class CarResource extends Resource
{
    protected static ?string $model = Car::class;

    protected static ?string $slug = 'main/cars';

    protected static ?string $recordTitleAttribute = 'police_number';

    protected static ?string $navigationGroup = 'Main';

    protected static ?string $navigationIcon = 'heroicon-o-circle-stack';

    protected static ?int $navigationSort = 0;

    public static function form(Form $form): Form
    {
        return $form
            ->schema([
                TextInput::make('police_number')
                    ->required()
                    ->placeholder('KB 1234 ST')
                    ->extraAlpineAttributes(['@input' => '$el.value = $el.value.toUpperCase()'])
                    ->afterStateUpdated(fn (string $state): string => strtoupper($state)),
                // ->unique(Car::class, 'police_number', ignoreRecord: true),

                TextInput::make('chassis_number')
                    ->columnSpan(2)
                    ->nullable()
                    ->extraAlpineAttributes(['@input' => '$el.value = $el.value.toUpperCase()'])
                    ->afterStateUpdated(fn (string $state): string => strtoupper($state)),
                // ->unique(Car::class, 'chassis_number', ignoreRecord: true),

                TextInput::make('machine_number')
                    ->nullable()
                    ->extraAlpineAttributes(['@input' => '$el.value = $el.value.toUpperCase()'])
                    ->afterStateUpdated(fn (string $state): string => strtoupper($state)),
                // ->unique(Car::class, 'machine_number', ignoreRecord: true),

                Select::make('car_brand_id')
                    ->live()
                    ->label('Brand')
                    ->searchable()
                    ->options(Brand::limit(10)->pluck('name', 'id'))
                    ->required()
                    ->afterStateUpdated(function ($set) {
                        $set('car_model_id', null);
                        $set('car_type_id', null);
                    }),

                Select::make('car_model_id')
                    ->searchable()
                    ->label('Model')
                    ->live()
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
                    })
                    ->afterStateUpdated(fn ($set) => $set('car_type_id', null)),

                Select::make('car_type_id')
                    ->searchable()
                    ->label('Type')
                    ->live()
                    ->required()
                    ->options(function (callable $get) {
                        if (!$get('car_model_id')) {
                            return;
                        } else {
                            $model = CarModel::find($get('car_model_id'));

                            if (!$model) {
                                return Type::limit(10)->pluck('name', 'id');
                            }

                            return $model->types->pluck('name', 'id');
                        }
                    }),

                Select::make('car_series_id')
                    ->label('Series')
                    ->live()
                    ->searchable()
                    ->options(Series::limit(10)->pluck('name', 'id'))
                    ->required(),

                Select::make('car_kind_id')
                    ->label('Kind')
                    ->live()
                    ->searchable()
                    ->options(Kind::limit(10)->pluck('name', 'id'))
                    ->required(),

                Select::make('car_cylinder_id')
                    ->label('Cylinder')
                    ->live()
                    ->searchable()
                    ->options(Cylinder::limit(10)->pluck('volume', 'id'))
                    ->required(),

                Select::make('car_transmission_id')
                    ->label('Transmission')
                    ->live()
                    ->searchable()
                    ->options(Transmission::limit(10)->pluck('name', 'id'))
                    ->required(),

                Select::make('car_gear_id')
                    ->label('Gear')
                    ->live()
                    ->searchable()
                    ->options(Gear::limit(10)->pluck('name', 'id'))
                    ->required(),

                Select::make('car_fuel_id')
                    ->label('Fuel')
                    ->live()
                    ->searchable()
                    ->options(Fuel::limit(10)->pluck('name', 'id'))
                    ->required(),

                Select::make('car_color_id')
                    ->label('Color')
                    ->live()
                    ->searchable()
                    ->options(Color::limit(10)->pluck('name', 'id'))
                    ->required(),

                Select::make('car_row_id')
                    ->label('Row')
                    ->live()
                    ->searchable()
                    ->options(Row::limit(10)->pluck('name', 'id'))
                    ->required(),

                Select::make('car_year_id')
                    ->label('Year')
                    ->live()
                    ->searchable()
                    ->options(Year::limit(10)->pluck('name', 'id'))
                    ->required(),

                TextInput::make('cash_mutation')
                    ->currencyMask(thousandSeparator: '.', decimalSeparator: ',', precision: 0)
                    ->required(),

                TextInput::make('credit_mutation')
                    ->currencyMask(thousandSeparator: '.', decimalSeparator: ',', precision: 0)
                    ->required(),

                TextInput::make('cash_non_mutation')
                    ->currencyMask(thousandSeparator: '.', decimalSeparator: ',', precision: 0)
                    ->required(),

                TextInput::make('credit_non_mutation')
                    ->currencyMask(thousandSeparator: '.', decimalSeparator: ',', precision: 0)
                    ->required(),

                TextInput::make('price')
                    ->currencyMask(thousandSeparator: '.', decimalSeparator: ',', precision: 0)
                    ->label('Price (OTR)')
                    ->required(),

                TextInput::make('number_of_keys')
                    ->numeric(),

                DatePicker::make('expire_at'),

                TextInput::make('note'),

                // TextInput::make('link_youtube')
                //     ->columnSpan(4)
                //     ->hidden(fn ($context) => $context === 'create'),

                // RichEditor::make('description')
                //     ->columnSpan(4)
                //     ->hidden(fn ($context) => $context === 'create'),
            ])->columns(4);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                TextColumn::make('police_number')
                    ->searchable(isIndividual: true, isGlobal: true)
                    ->sortable(),

                TextColumn::make('chassis_number')
                    ->searchable()
                    ->sortable()
                    ->toggleable(isToggledHiddenByDefault: true),

                TextColumn::make('machine_number')
                    ->searchable()
                    ->sortable()
                    ->toggleable(isToggledHiddenByDefault: true),

                TextColumn::make('slug')
                    ->label('Car')
                    // ->getStateUsing(function ($record) {
                    //     return $record->brand->name . ' ' . $record->model->name . ' ' . $record->type->name . ' ' . $record->kind->name . ' (' . $record->series->name . ') ' . number_format(doubleval($record->cylinder->volume / 1000), 1) . ' ' . $record->transmission->name . ' ' . $record->gear->name . ' ' . $record->fuel->name . ' ' . $record->color->name . ' (' . $record->year->name . ') ' . $record->row->name;
                    // })
                    ->getStateUsing(function ($record) {
                        return strtoupper($record->slug);
                    })
                    ->sortable()
                    ->searchable(isIndividual: true, isGlobal: true)
                    // ->wrap()
                    ->copyable()
                    ->copyMessage('Copied!')
                    ->copyMessageDuration(1500),

                TextColumn::make('cash_mutation')
                    // ->searchable()
                    ->numeric(
                        decimalPlaces: 0,
                        decimalSeparator: ',',
                        thousandsSeparator: '.',
                    )
                    ->sortable()
                    ->toggleable(isToggledHiddenByDefault: true),

                TextColumn::make('credit_mutation')
                    // ->searchable()
                    ->numeric(
                        decimalPlaces: 0,
                        decimalSeparator: ',',
                        thousandsSeparator: '.',
                    )
                    ->sortable()
                    ->toggleable(isToggledHiddenByDefault: true),

                TextColumn::make('cash_non_mutation')
                    // ->searchable()
                    ->numeric(
                        decimalPlaces: 0,
                        decimalSeparator: ',',
                        thousandsSeparator: '.',
                    )
                    ->sortable()
                    ->toggleable(isToggledHiddenByDefault: true),

                TextColumn::make('credit_non_mutation')
                    // ->searchable()
                    ->numeric(
                        decimalPlaces: 0,
                        decimalSeparator: ',',
                        thousandsSeparator: '.',
                    )
                    ->sortable()
                    ->toggleable(isToggledHiddenByDefault: true),

                TextColumn::make('price')
                    // ->searchable()
                    // ->getStateUsing(fn (Car $record): string => number_format(doubleval($record->price / 1000000), 1))
                    ->numeric(
                        decimalPlaces: 0,
                        decimalSeparator: ',',
                        thousandsSeparator: '.',
                    )
                    ->sortable()
                    ->toggleable(isToggledHiddenByDefault: true),

                ImageColumn::make('originals.image')
                    ->circular()
                    ->stacked()
                    ->limit(3)
                    // ->defaultImageUrl(url('/images/placeholder.png'))
                    ->limitedRemainingText(),

                ImageColumn::make('outdoors.image')
                    ->circular()
                    ->stacked()
                    ->limit(3)
                    ->limitedRemainingText(),

                ImageColumn::make('officials.image')
                    ->circular()
                    ->stacked()
                    ->limit(3)
                    ->limitedRemainingText(),

                // TextColumn::make('brand.name')
                //     ->searchable()
                //     ->sortable()
                //     ->toggleable(isToggledHiddenByDefault: true),

                // TextColumn::make('model.name')
                //     ->searchable()
                //     ->sortable()
                //     ->toggleable(isToggledHiddenByDefault: true),

                // TextColumn::make('type.name')
                //     ->searchable()
                //     ->sortable()
                //     ->toggleable(isToggledHiddenByDefault: true),

                // TextColumn::make('kind.name')
                //     ->searchable()
                //     ->sortable()
                //     ->toggleable(isToggledHiddenByDefault: true),

                // TextColumn::make('cylinder.volume')
                //     ->searchable()
                //     ->numeric(
                //         decimalPlaces: 0,
                //         decimalSeparator: ',',
                //         thousandsSeparator: '.',
                //     )
                //     ->sortable()
                //     ->toggleable(isToggledHiddenByDefault: true),

                // TextColumn::make('transmission.name')
                //     ->searchable()
                //     ->sortable()
                //     ->toggleable(isToggledHiddenByDefault: true),

                // TextColumn::make('series.name')
                //     ->searchable()
                //     ->sortable()
                //     ->toggleable(isToggledHiddenByDefault: true),

                // TextColumn::make('gear.name')
                //     ->searchable()
                //     ->sortable()
                //     ->toggleable(isToggledHiddenByDefault: true),

                // TextColumn::make('fuel.name')
                //     ->searchable()
                //     ->sortable()
                //     ->toggleable(isToggledHiddenByDefault: true),

                // TextColumn::make('color.name')
                //     ->searchable()
                //     ->sortable()
                //     ->toggleable(isToggledHiddenByDefault: true),

                // TextColumn::make('row.name')
                //     ->searchable()
                //     ->sortable()
                //     ->toggleable(isToggledHiddenByDefault: true),

                // TextColumn::make('year.name')
                //     ->searchable()
                //     ->sortable()
                //     ->toggleable(isToggledHiddenByDefault: true),

                TextColumn::make('location.name')
                    ->placeholder('Unknown')
                    // ->searchable()
                    ->searchable(isIndividual: true, isGlobal: false)
                    ->sortable(),

                IconColumn::make('is_ready')
                    ->sortable()
                    ->boolean(),

                // ToggleColumn::make('is_visible')
                //     // ->searchable()
                //     ->sortable(),

                TextColumn::make('note')
                    // ->searchable()
                    ->sortable()
                    ->toggleable(isToggledHiddenByDefault: true),

                TextColumn::make('created_at')
                    ->dateTime()
                    // ->date()
                    ->sortable(),
            ])
            ->filters([
                TernaryFilter::make('is_ready')
                    ->label('Availability')
                    ->boolean()
                    ->trueLabel('Ready')
                    ->falseLabel('Not Ready')
                    ->native(false),
                TernaryFilter::make('is_sold')
                    ->label('Sales Status')
                    ->boolean()
                    ->trueLabel('Sold out')
                    ->falseLabel('Open Sale')
                    ->native(false),
                TernaryFilter::make('is_visible')
                    ->label('Visibility')
                    ->boolean()
                    ->trueLabel('Visible')
                    ->falseLabel('Hidden')
                    ->native(false),
                SelectFilter::make('category')
                    ->placeholder('-')
                    ->native(false)
                    ->options([
                        'passenger' => 'Passenger',
                        'commercial' => 'Commercial',
                    ]),
                SelectFilter::make('borrowed_by')
                    ->placeholder('-')
                    ->native(false)
                    ->options([
                        'someone' => 'Someone',
                        'customer' => 'Customer',
                    ]),
                SelectFilter::make('photo_status')
                    ->placeholder('-')
                    ->native(false)
                    ->options([
                        'duplicate' => 'Duplicate',
                        'official' => 'Official',
                    ]),
                // buat filter utk "Yang Akan Tayang" yang status ny NULL utk field link youtube dan description
                Filter::make('upcoming')
                    ->query(fn (Builder $query): Builder => $query->where('link_youtube', null)->where('description', null)->whereIn('photo_status', array('duplicate', 'official'))),
            ])
            ->actions([
                ActionGroup::make([
                    // Action::make('view_promo')
                    //     ->url(fn ($record) => PromoResource::getUrl('view', ['record' => $record->id])),
                    ViewAction::make(),
                    // Action::make('link_youtube')
                    //     ->icon('heroicon-m-link')
                    //     ->form([
                    //         TextInput::make('link_youtube')
                    //             ->hiddenLabel(true)
                    //             ->default(fn (Car $record) => $record->link_youtube),
                    //     ])
                    //     ->action(function (array $data, Car $record): void {
                    //         $record->link_youtube = $data['link_youtube'];
                    //         $record->save();
                    //     }),
                    Action::make('edit_visibility')
                        ->icon('heroicon-m-eye')
                        ->form([
                            Toggle::make('is_visible')
                                ->default(fn (Car $record) => $record->is_visible),
                        ])
                        ->action(function (array $data, Car $record): void {
                            $record->is_visible = $data['is_visible'];
                            $record->save();
                        }),
                    EditAction::make()
                        ->mutateFormDataUsing(function (array $data): array {
                            $brand = Brand::whereId($data['car_brand_id'])->first();
                            $model = CarModel::whereId($data['car_model_id'])->first();
                            $type = Type::whereId($data['car_type_id'])->first();
                            $kind = Kind::whereId($data['car_kind_id'])->first();
                            $series = Series::whereId($data['car_series_id'])->first();
                            $cylinder = Cylinder::whereId($data['car_cylinder_id'])->first();
                            $transmission = Transmission::whereId($data['car_transmission_id'])->first();
                            $gear = Gear::whereId($data['car_gear_id'])->first();
                            $fuel = Fuel::whereId($data['car_fuel_id'])->first();
                            $color = Color::whereId($data['car_color_id'])->first();
                            $year = Year::whereId($data['car_year_id'])->first();
                            $row = Row::whereId($data['car_row_id'])->first();

                            $data['slug'] = $brand->name . ' ' . $model->name . ' ' . $type->name . ' ' . $kind->name . ' (' . $series->name . ') ' . number_format(doubleval($cylinder->volume / 1000), 1) . ' ' . $transmission->name . ' ' . $gear->name . ' ' . $fuel->name . ' ' . $color->name . ' (' . $year->name . ') ' . $row->name;

                            return $data;
                        }),
                    Action::make('description')
                        ->label('Description & link youtube')
                        ->icon('heroicon-m-pencil-square')
                        ->form([
                            TextInput::make('link_youtube')
                                ->required()
                                // ->hiddenLabel(true)
                                ->default(fn (Car $record) => $record->link_youtube),
                            RichEditor::make('description')
                                ->required()
                                // ->hiddenLabel(true)
                                ->default(fn (Car $record) => $record->description),
                        ])
                        ->action(function (array $data, Car $record): void {
                            $record->link_youtube = $data['link_youtube'];
                            $record->description = $data['description'];
                            $record->save();
                        }),
                    Action::make('upload_original')
                        ->icon('heroicon-m-photo')
                        ->form([
                            FileUpload::make('image')
                                // ->imageEditor()
                                // ->imageResizeMode('cover')

                                // ->imageCropAspectRatio('4:3')
                                ->multiple()
                                ->required()
                                // ->reorderable()
                                ->directory((fn (Car $record) => 'car-photos-original-attachments/' . $record->id))
                                ->image(),
                        ])
                        ->action(function (array $data, Car $car): void {
                            $original = Original::where('car_id', $car->id)->get();
                            if ($original) {
                                foreach ($original as $item) {
                                    Storage::disk('public')->delete($item->image);
                                    $item->delete();
                                }
                            }

                            $i = 0;
                            foreach ($data['image'] as $item) {
                                Original::create([
                                    'car_id' => $car->id,
                                    'image' => $item
                                ]);

                                $i++;
                            };
                        }),
                    Action::make('upload_outdoor')
                        ->icon('heroicon-m-photo')
                        ->form([
                            FileUpload::make('image')
                                // ->imageEditor()
                                // ->imageResizeMode('cover')

                                // ->imageCropAspectRatio('4:3')
                                ->multiple()
                                ->required()
                                // ->reorderable()
                                ->directory((fn (Car $record) => 'car-photos-outdoor-attachments/' . $record->id))
                                ->image(),
                        ])
                        ->action(function (array $data, Car $car): void {
                            $outdoor = Outdoor::where('car_id', $car->id)->get();
                            if ($outdoor) {
                                foreach ($outdoor as $item) {
                                    Storage::disk('public')->delete($item->image);
                                    $item->delete();
                                }
                            }

                            $i = 0;
                            foreach ($data['image'] as $item) {
                                Outdoor::create([
                                    'car_id' => $car->id,
                                    'image' => $item
                                ]);

                                $i++;
                            };
                        }),
                    Action::make('upload_official')
                        ->icon('heroicon-m-photo')
                        ->form([
                            FileUpload::make('image')
                                // ->imageEditor()
                                // ->imageResizeMode('cover')

                                // ->imageCropAspectRatio('1:1')
                                ->multiple()
                                ->required()
                                // ->reorderable()
                                ->directory((fn (Car $record) => 'car-photos-official-attachments/' . $record->id))
                                ->image(),
                        ])
                        ->action(function (array $data, Car $car): void {
                            $official = Official::where('car_id', $car->id)->get();
                            if ($official) {
                                foreach ($official as $item) {
                                    Storage::disk('public')->delete($item->image);
                                    $item->delete();
                                }
                            }

                            $i = 0;
                            foreach ($data['image'] as $item) {
                                Official::create([
                                    'car_id' => $car->id,
                                    'image' => $item
                                ]);

                                $i++;
                            };
                        }),
                    // ReplicateAction::make()
                    //     ->requiresConfirmation(),
                    DeleteAction::make(),
                    // ActionsAction::make('delete')
                    //     ->action(fn (Car $record) => $record->delete())
                    //     ->requiresConfirmation()
                ])
            ], position: ActionsPosition::BeforeCells)->defaultSort('created_at', 'desc');
        // ], position: ActionsPosition::BeforeCells);
        // ->groupedBulkActions([
        //     DeleteBulkAction::make(),
        // ]);
    }

    public static function infolist(Infolist $infolist): Infolist
    {
        return $infolist
            ->schema([
                Tabs::make('Label')
                    ->tabs([
                        Tabs\Tab::make('Registration')
                            ->schema([
                                Grid::make(3)
                                    ->schema([
                                        TextEntry::make('police_number')
                                            ->copyable()
                                            ->copyMessage('Copied!')
                                            ->copyMessageDuration(1500)
                                            ->color('gray'),
                                        TextEntry::make('number_of_keys')
                                            ->placeholder('-')
                                            ->copyable()
                                            ->copyMessage('Copied!')
                                            ->copyMessageDuration(1500)
                                            ->color('gray'),
                                        TextEntry::make('expire_at')
                                            ->placeholder('-')
                                            ->copyable()
                                            ->copyMessage('Copied!')
                                            ->copyMessageDuration(1500)
                                            ->color('gray'),
                                        TextEntry::make('machine_number')
                                            ->placeholder('-')
                                            ->copyable()
                                            ->copyMessage('Copied!')
                                            ->copyMessageDuration(1500)
                                            ->color('gray'),
                                        TextEntry::make('chassis_number')
                                            ->placeholder('-')
                                            ->copyable()
                                            ->copyMessage('Copied!')
                                            ->copyMessageDuration(1500)
                                            ->color('gray'),
                                    ]),
                            ]),
                        Tabs\Tab::make('Detail')
                            ->schema([
                                Grid::make(4)
                                    ->schema([
                                        // TextEntry::make('slug')
                                        //     ->getStateUsing(function ($record) {
                                        //         return $record->brand->name . ' ' . $record->model->name . ' ' . $record->type->name . ' ' . $record->kind->name . ' (' . $record->series->name . ') ' . number_format(doubleval($record->cylinder->volume / 1000), 1) . ' ' . $record->transmission->name . ' ' . $record->gear->name . ' ' . $record->fuel->name . ' ' . $record->color->name . ' (' . $record->year->name . ') ' . $record->row->name;
                                        //     })
                                        //     ->columnSpanFull()
                                        //     ->copyable()
                                        //     ->copyMessage('Copied!')
                                        //     ->copyMessageDuration(1500)
                                        //     ->color('gray'),
                                        TextEntry::make('brand.name')
                                            ->color('gray'),
                                        TextEntry::make('model.name')
                                            ->color('gray'),
                                        TextEntry::make('type.name')
                                            ->color('gray'),
                                        TextEntry::make('kind.name')
                                            ->color('gray'),
                                        TextEntry::make('cylinder.volume')
                                            ->numeric(
                                                decimalPlaces: 0,
                                                decimalSeparator: ',',
                                                thousandsSeparator: '.',
                                            )
                                            ->color('gray'),
                                        TextEntry::make('transmission.name')
                                            ->color('gray'),
                                        TextEntry::make('series.name')
                                            ->color('gray'),
                                        TextEntry::make('gear.name')
                                            ->color('gray'),
                                        TextEntry::make('fuel.name')
                                            ->color('gray'),
                                        TextEntry::make('color.name')
                                            ->color('gray'),
                                        TextEntry::make('row.name')
                                            ->color('gray'),
                                        TextEntry::make('year.name')
                                            ->color('gray'),
                                    ]),
                            ]),
                        Tabs\Tab::make('Pricing')
                            ->schema([
                                Grid::make(2)
                                    ->schema([
                                        TextEntry::make('cash_mutation')
                                            ->placeholder('-')
                                            ->numeric(
                                                decimalPlaces: 0,
                                                decimalSeparator: ',',
                                                thousandsSeparator: '.',
                                            )
                                            ->color('gray'),
                                        TextEntry::make('credit_mutation')
                                            ->placeholder('-')
                                            ->numeric(
                                                decimalPlaces: 0,
                                                decimalSeparator: ',',
                                                thousandsSeparator: '.',
                                            )
                                            ->color('gray'),
                                        TextEntry::make('cash_non_mutation')
                                            ->placeholder('-')
                                            ->numeric(
                                                decimalPlaces: 0,
                                                decimalSeparator: ',',
                                                thousandsSeparator: '.',
                                            )
                                            ->color('gray'),
                                        TextEntry::make('credit_non_mutation')
                                            ->placeholder('-')
                                            ->numeric(
                                                decimalPlaces: 0,
                                                decimalSeparator: ',',
                                                thousandsSeparator: '.',
                                            )
                                            ->color('gray'),
                                        TextEntry::make('price')
                                            ->placeholder('-')
                                            ->label('Price (OTR)')
                                            ->columnSpanFull()
                                            ->numeric(
                                                decimalPlaces: 0,
                                                decimalSeparator: ',',
                                                thousandsSeparator: '.',
                                            )
                                            ->color('gray'),
                                    ]),
                            ]),
                        Tabs\Tab::make('Description')
                            ->schema([
                                TextEntry::make('note')
                                    ->placeholder('-')
                                    ->columnSpanFull()
                                    ->copyable()
                                    ->copyMessage('Copied!')
                                    ->copyMessageDuration(1500)
                                    ->color('gray'),
                                TextEntry::make('description')
                                    ->placeholder('-')
                                    ->html()
                                    ->columnSpanFull()
                                    ->color('gray'),
                            ]),
                        Tabs\Tab::make('Photos')
                            ->schema([
                                RepeatableEntry::make('originals')
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
                                RepeatableEntry::make('outdoors')
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
                                RepeatableEntry::make('officials')
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
                        Tabs\Tab::make('Video')
                            ->schema([
                                TextEntry::make('link_youtube')
                                    ->url(fn (Car $record): string => $record->link_youtube ?? "")
                                    ->placeholder('-')
                                    ->openUrlInNewTab()
                                    ->color('gray'),
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
            'index' => Pages\ManageCars::route('/'),
        ];
    }
}
