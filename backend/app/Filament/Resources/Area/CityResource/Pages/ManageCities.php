<?php

namespace App\Filament\Resources\Area\CityResource\Pages;

use App\Filament\Resources\Area\CityResource;
use Filament\Resources\Pages\ManageRecords;

class ManageCities extends ManageRecords
{
    protected static string $resource = CityResource::class;

    protected function getActions(): array
    {
        return [
            \Filament\Actions\CreateAction::make(),
        ];
    }
}
