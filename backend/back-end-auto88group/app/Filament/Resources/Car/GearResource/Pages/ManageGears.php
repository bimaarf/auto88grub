<?php

namespace App\Filament\Resources\Car\GearResource\Pages;

use App\Filament\Resources\Car\GearResource;
use Filament\Resources\Pages\ManageRecords;

class ManageGears extends ManageRecords
{
    protected static string $resource = GearResource::class;

    protected function getActions(): array
    {
        return [
            \Filament\Actions\CreateAction::make(),
        ];
    }
}
