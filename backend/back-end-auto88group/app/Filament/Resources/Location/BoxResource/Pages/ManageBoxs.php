<?php

namespace App\Filament\Resources\Location\BoxResource\Pages;

use App\Filament\Resources\Location\BoxResource;
use Filament\Resources\Pages\ManageRecords;

class ManageBoxs extends ManageRecords
{
    protected static string $resource = BoxResource::class;

    protected function getActions(): array
    {
        return [
            \Filament\Actions\CreateAction::make(),
        ];
    }
}
