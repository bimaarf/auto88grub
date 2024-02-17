<?php

namespace App\Filament\Resources\Area\ProvinceResource\Pages;

use App\Filament\Resources\Area\ProvinceResource;
use Filament\Resources\Pages\ManageRecords;

class ManageProvinces extends ManageRecords
{
    protected static string $resource = ProvinceResource::class;

    protected function getActions(): array
    {
        return [
            \Filament\Actions\CreateAction::make(),
        ];
    }
}
