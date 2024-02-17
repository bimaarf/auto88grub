<?php

namespace App\Filament\Resources\Main;

use App\Filament\Resources\Main\DocumentResource\Pages;
use App\Models\Main\Document;
use App\Models\Main\Car;
use Filament\Forms;
use Filament\Forms\Components\Select;
use Filament\Tables\Actions\ActionGroup;
use Filament\Forms\Form;
use Filament\Infolists\Components;
use Filament\Infolists\Components\ImageEntry;
use Filament\Infolists\Components\TextEntry;
use Filament\Infolists\Infolist;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Enums\ActionsPosition;
use Filament\Tables\Table;
use Illuminate\Support\Facades\Storage;

class DocumentResource extends Resource
{
    protected static ?string $model = Document::class;

    protected static ?string $slug = 'main/documents';

    protected static ?string $recordTitleAttribute = 'name';

    protected static ?string $navigationGroup = 'Main';

    protected static ?string $navigationIcon = 'heroicon-o-circle-stack';

    protected static ?int $navigationSort = 2;

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

                Forms\Components\Select::make('category')
                    ->options([
                        'bpkb' => 'BPKB',
                        'stnk' => 'STNK',
                        'notice_pajak' => 'Notice Pajak',
                        'sh' => 'SH',
                        'gesekan' => 'Gesekan',
                        'kwitansi' => 'Kwitansi',
                        'faktur' => 'Faktur',
                        'sertifikat_nik' => 'Sertifikat NIK',
                        'ktp_pembeli' => 'KTP Pembeli',
                        'kir' => 'Kir',
                        'kartu_uji_timbang' => 'Kartu Uji Timbang',
                        'surat_buka_blokir_samsat' => 'Surat Buka Blokir Samsat',
                        'surat_buka_blokir_leasing' => 'Surat Buka Blokir Leasing',
                    ])
                    ->required()
                    ->native(false),

                Forms\Components\FileUpload::make('image')
                    ->label('Image')
                    ->openable()
                    // ->reorderable()
                    // ->appendFiles()
                    ->downloadable()
                    ->required()
                    ->directory('car-documents-attachments')
                    ->image(),
            ])->columns(1);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                TextColumn::make('car.police_number')
                    ->label('Police Number')
                    ->searchable(isIndividual: true, isGlobal: true)
                    ->sortable(),

                // Tables\Columns\TextColumn::make('category')
                //     ->searchable()
                //     ->searchable(isIndividual: true, isGlobal: true)
                //     ->sortable(),

                Tables\Columns\ImageColumn::make('image')
                    ->label('Image')
                    ->url(fn (Document $record): string => '../storage/' . $record->image)
                    ->openUrlInNewTab()
                    ->height(80),

                Tables\Columns\TextColumn::make('updated_at')
                    ->dateTime()
                    ->sortable(),

                TextColumn::make('created_at')
                    ->dateTime()
                    ->sortable(),
            ])
            ->actions([
                // ActionGroup::make([
                Tables\Actions\ViewAction::make(),
                Tables\Actions\EditAction::make()
                    ->before(function ($record) {
                        Storage::disk('public')->delete($record->image);
                    }),
                Tables\Actions\DeleteAction::make()
                    ->before(function ($record) {
                        Storage::disk('public')->delete($record->image);
                    })
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
                        // TextEntry::make('category'),
                        ImageEntry::make('image')
                            ->url(fn (Document $record): string => '../storage/' . $record->image)
                            ->openUrlInNewTab()
                            ->height(300),
                        TextEntry::make('created_at')
                            ->dateTime(),
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
            'index' => Pages\ManageDocuments::route('/'),
        ];
    }
}
