<?php

namespace App\Filament\Resources\Main;

use App\Filament\Resources\Main\EcommerceResource\Pages;
use App\Models\Main\Ecommerce;
use App\Models\Main\Car;
use Filament\Forms;
use Filament\Forms\Components\DatePicker;
use Filament\Forms\Components\Select;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Form;
use Filament\Infolists\Components;
use Filament\Infolists\Components\ImageEntry;
use Filament\Infolists\Components\RepeatableEntry;
use Filament\Infolists\Components\TextEntry;
use Filament\Infolists\Infolist;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Columns\ImageColumn;
use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Table;
use Illuminate\Support\Facades\Storage;

class EcommerceResource extends Resource
{
    protected static ?string $label = 'E-Commerce';

    protected static ?string $model = Ecommerce::class;

    protected static ?string $slug = 'main/ecommerces';

    protected static ?string $recordTitleAttribute = 'name';

    protected static ?string $navigationGroup = 'Main';

    protected static ?string $navigationIcon = 'heroicon-o-circle-stack';

    protected static ?int $navigationSort = 3;

    public static function form(Form $form): Form
    {
        return $form
            ->schema([
                Select::make('car_id')
                    ->label('Police number')
                    ->searchable()
                    // ->getSearchResultsUsing(fn (string $search): array => Car::where('police_number', 'like', "%{$search}%")->limit(50)->pluck('police_number', 'id')->toArray())
                    // ->getOptionLabelsUsing(fn (array $values): array => Car::whereIn('id', $values)->pluck('slug', 'id')->toArray())
                    ->options(Car::limit(10)->where('is_sold', 0)->pluck('police_number', 'id'))
                    ->required(),

                Forms\Components\Select::make('platform')
                    ->options([
                        'olx' => 'OLX',
                        'm123' => 'M123',
                        'momobil' => 'Momobil',
                        'jualo' => 'Jualo',
                        'cintamobil' => 'Cintamobil',
                    ])
                    ->required()
                    ->native(false),

                Forms\Components\Select::make('photo')
                    ->options([
                        'indoor' => 'Indoor',
                        'outdoor' => 'Outdoor',
                    ])
                    ->required()
                    ->native(false),

                Forms\Components\TextInput::make('link')
                    ->required()
                    ->unique(Ecommerce::class, 'link', ignoreRecord: true),

                DatePicker::make('posted_at')
                    ->required(),

                DatePicker::make('expired_at')
                    ->required(),

                TextInput::make('note'),
                // ->required(),
            ])->columns(1);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                TextColumn::make('car.police_number')
                    ->label('Police number')
                    ->searchable(isIndividual: true, isGlobal: true)
                    ->sortable(),

                TextColumn::make('posted_at')
                    ->date()
                    ->sortable(),

                TextColumn::make('expired_at')
                    ->date()
                    ->sortable(),

                TextColumn::make('note')
                    ->searchable(isIndividual: true, isGlobal: true)
                    ->sortable(),

                TextColumn::make('car.slug')
                    ->label('Car')
                    // ->getStateUsing(function ($record) {
                    //     return $record->brand->name . ' ' . $record->model->name . ' ' . $record->type->name . ' ' . $record->kind->name . ' (' . $record->series->name . ') ' . number_format(doubleval($record->cylinder->volume / 1000), 1) . ' ' . $record->transmission->name . ' ' . $record->gear->name . ' ' . $record->fuel->name . ' ' . $record->color->name . ' (' . $record->year->name . ') ' . $record->row->name;
                    // })
                    ->getStateUsing(function ($record) {
                        return strtoupper($record->car->slug);
                    })
                    ->sortable()
                    ->searchable(isIndividual: true, isGlobal: true),
                    // ->wrap()
                    // ->copyable()
                    // ->copyMessage('Copied!')
                    // ->copyMessageDuration(1500),

                TextColumn::make('link')
                    ->getStateUsing(function ($record) {
                        return 'Click here';
                    })
                    ->limit(30)
                    ->color('primary')
                    ->url(fn (Ecommerce $record): string => $record->link)
                    ->openUrlInNewTab()
                    ->sortable(),

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
            ])
            ->actions([
                // ActionGroup::make([
                // Tables\Actions\ViewAction::make(),
                Tables\Actions\EditAction::make(),
                Tables\Actions\DeleteAction::make(),
                // ])
            ],);
        // ], position: ActionsPosition::BeforeCells)->defaultSort('created_at', 'desc');
        // ->groupedBulkActions([
        //     Tables\Actions\DeleteBulkAction::make(),
    }

    public static function infolist(Infolist $infolist): Infolist
    {
        return $infolist
            ->schema([
                Components\Section::make()
                    ->schema([
                        TextEntry::make('car.police_number')
                            ->label('Police number'),
                        TextEntry::make('posted_at')
                            ->date(),
                    ])
                    ->columns(1)
                    ->inlineLabel()
            ]);
    }

    public static function getPages(): array
    {
        return [
            'index' => Pages\ManageEcommerces::route('/'),
        ];
    }
}
