<?php

namespace App\Filament\Resources\Car\CylinderResource\Pages;

use App\Filament\Resources\Car\CylinderResource;
use Filament\Resources\Pages\ManageRecords;

class ManageCylinders extends ManageRecords
{
    protected static string $resource = CylinderResource::class;

    protected function getActions(): array
    {
        return [
            \Filament\Actions\CreateAction::make(),
        ];
    }
}
