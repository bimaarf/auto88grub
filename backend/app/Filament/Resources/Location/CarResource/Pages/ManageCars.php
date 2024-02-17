<?php

namespace App\Filament\Resources\Location\CarResource\Pages;

use App\Filament\Resources\Location\CarResource;
use Filament\Resources\Pages\ManageRecords;

class ManageCars extends ManageRecords
{
    protected static string $resource = CarResource::class;

    protected function getActions(): array
    {
        return [
            \Filament\Actions\CreateAction::make(),
        ];
    }
}
