<?php

namespace App\Filament\Resources\Car\FuelResource\Pages;

use App\Filament\Resources\Car\FuelResource;
use Filament\Resources\Pages\ManageRecords;

class ManageFuels extends ManageRecords
{
    protected static string $resource = FuelResource::class;

    protected function getActions(): array
    {
        return [
            \Filament\Actions\CreateAction::make(),
        ];
    }
}
