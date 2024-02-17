<?php

namespace App\Filament\Resources\Description\DetailResource\Pages;

use App\Filament\Resources\Description\DetailResource;
use Filament\Resources\Pages\ManageRecords;

class ManageDetails extends ManageRecords
{
    protected static string $resource = DetailResource::class;

    protected function getActions(): array
    {
        return [
            \Filament\Actions\CreateAction::make(),
        ];
    }
}
