<?php

namespace App\Filament\Resources\Main\EcommerceResource\Pages;

use App\Filament\Resources\Main\EcommerceResource;
use Filament\Resources\Pages\ManageRecords;

class ManageEcommerces extends ManageRecords
{
    protected static string $resource = EcommerceResource::class;

    protected function getActions(): array
    {
        return [
            \Filament\Actions\CreateAction::make()->createAnother(false),
        ];
    }

    public function getTabs(): array
    {
        return [
            'OLX' => \Filament\Resources\Components\Tab::make()->query(fn ($query) => $query->where('platform', 'olx')->where('photo', 'indoor')),
            'OLX (Outdoor)' => \Filament\Resources\Components\Tab::make()->query(fn ($query) => $query->where('platform', 'olx')->where('photo', 'outdoor')),
            'M123' => \Filament\Resources\Components\Tab::make()->query(fn ($query) => $query->where('platform', 'm123')->where('photo', 'indoor')),
            'Momobil' => \Filament\Resources\Components\Tab::make()->query(fn ($query) => $query->where('platform', 'momobil')->where('photo', 'indoor')),
            'Jualo' => \Filament\Resources\Components\Tab::make()->query(fn ($query) => $query->where('platform', 'jualo')->where('photo', 'indoor')),
            'Jualo (Outdoor)' => \Filament\Resources\Components\Tab::make()->query(fn ($query) => $query->where('platform', 'jualo')->where('photo', 'outdoor')),
            'Cintamobil' => \Filament\Resources\Components\Tab::make()->query(fn ($query) => $query->where('platform', 'cintamobil')->where('photo', 'indoor')),
            'Cintamobil (Outdoor)' => \Filament\Resources\Components\Tab::make()->query(fn ($query) => $query->where('platform', 'cintamobil')->where('photo', 'outdoor')),
        ];
    }
}
