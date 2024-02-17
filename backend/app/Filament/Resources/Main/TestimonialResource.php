<?php

namespace App\Filament\Resources\Main;

use App\Filament\Resources\Main\TestimonialResource\Pages;
use App\Models\Main\Car;
use App\Models\Main\Testimonial;
use Filament\Tables\Actions\DeleteAction;
use Filament\Tables\Actions\ActionGroup;
use Filament\Tables\Actions\EditAction;
use Filament\Tables\Actions\ViewAction;
use Filament\Forms;
use Filament\Forms\Components\DateTimePicker;
use Filament\Forms\Components\Select;
use Filament\Forms\Form;
use Filament\Infolists\Components;
use Filament\Infolists\Components\ImageEntry;
use Filament\Infolists\Components\TextEntry;
use Filament\Infolists\Infolist;
use Filament\Resources\Resource;
use Filament\Tables\Columns\ImageColumn;
use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Enums\ActionsPosition;
use Filament\Tables\Table;
use Illuminate\Support\Facades\Storage;

class TestimonialResource extends Resource
{
    protected static ?string $model = Testimonial::class;

    protected static ?string $slug = 'main/testimonials';

    protected static ?string $recordTitleAttribute = 'name';

    protected static ?string $navigationGroup = 'Main';

    protected static ?string $navigationIcon = 'heroicon-o-circle-stack';

    protected static ?int $navigationSort = 4;

    public static function form(Form $form): Form
    {
        return $form
            ->schema([
                Select::make('car_id')
                    ->label('Police number')
                    ->searchable()
                    ->options(Car::limit(10)->where('is_sold', 1)->where('is_visible', 1)->pluck('police_number', 'id'))
                    ->required(),

                Forms\Components\FileUpload::make('image')
                    ->label('Image')
                    ->required()
                    ->directory('car-testimonials-attachments')
                    ->image(),

                Forms\Components\TextInput::make('name')
                    ->required()
                    ->unique(Testimonial::class, 'name', ignoreRecord: true),

                Forms\Components\TextInput::make('description')
                    ->required()
                    ->unique(Testimonial::class, 'description', ignoreRecord: true),

                Forms\Components\TextInput::make('link')
                    ->required()
                    ->unique(Testimonial::class, 'link', ignoreRecord: true),

                DateTimePicker::make('testimoni_at')
                    ->required(),
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

                ImageColumn::make('image')
                    ->url(fn (Testimonial $record): string => '../storage/' . $record->image)
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

                TextColumn::make('name')
                    ->searchable(isIndividual: true, isGlobal: true)
                    ->sortable(),

                TextColumn::make('description')
                    ->searchable(isIndividual: true, isGlobal: true)
                    ->sortable(),

                TextColumn::make('link')
                    ->getStateUsing(function ($record) {
                        return 'Click here';
                    })
                    ->limit(30)
                    ->color('primary')
                    ->url(fn (Testimonial $record): string => $record->link)
                    ->openUrlInNewTab()
                    ->sortable(),

                TextColumn::make('testimoni_at')
                    ->dateTime()
                    ->sortable(),

                TextColumn::make('created_at')
                    ->dateTime()
                    ->sortable(),
            ])
            ->actions([
                ActionGroup::make([
                    ViewAction::make(),
                    // Action::make('edit_visibility')
                    //     ->icon('heroicon-m-eye')
                    //     ->form([
                    //         Toggle::make('is_visible')
                    //             ->default(fn (Testimonial $record) => $record->is_visible),
                    //     ])
                    //     ->action(function (array $data, Testimonial $record): void {
                    //         $record->is_visible = $data['is_visible'];
                    //         $record->save();
                    //     }),
                    // Action::make('edit_as_done')
                    //     ->icon('heroicon-m-eye')
                    //     ->form([
                    //         Toggle::make('is_done')
                    //             ->default(fn (Testimonial $record) => $record->is_done),
                    //     ])
                    //     ->action(function (array $data, Testimonial $record): void {
                    //         $record->is_done = $data['is_done'];
                    //         $record->save();
                    //     }),
                    EditAction::make(),
                    // ->before(function ($record) {
                    //     ($record->image != null) ??  Storage::disk('public')->delete($record->image);
                    // }),
                    // Action::make('upload_image')
                    //     ->icon('heroicon-m-photo')
                    //     ->form([
                    //         FileUpload::make('image')
                    //             ->label('Image')
                    //             ->directory('car-testimonials-attachments')
                    //             ->image(),
                    //     ])
                    //     ->action(function (array $data, Testimonial $record): void {
                    //         if ($record->image != null) {
                    //             Storage::disk('public')->delete($record->image);
                    //         };

                    //         $record->image = $data['image'];
                    //         $record->save();
                    //     }),
                    // ReplicateAction::make()
                    //     ->excludeAttributes(['image', 'is_visible', 'is_done', 'is_guarantee'])
                    //     ->requiresConfirmation(),
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
                Components\Section::make()
                    ->schema([
                        TextEntry::make('car.police_number')
                            ->label('Police number'),
                        ImageEntry::make('image')
                            ->height(150),
                        TextEntry::make('name'),
                        TextEntry::make('description'),
                        TextEntry::make('link')
                            ->color('primary')
                            ->url(fn (Testimonial $record): string => $record->link)
                            ->openUrlInNewTab(),
                        TextEntry::make('testimoni_at')
                            ->dateTime(),
                        TextEntry::make('created_at')
                            ->dateTime(),
                    ])
                    ->columns(1)
                    ->inlineLabel()
            ]);
    }

    public static function getPages(): array
    {
        return [
            'index' => Pages\ManageTestimonials::route('/'),
        ];
    }
}
