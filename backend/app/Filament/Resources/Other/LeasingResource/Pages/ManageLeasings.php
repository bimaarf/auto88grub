<?php

namespace App\Filament\Resources\Other\LeasingResource\Pages;

use App\Filament\Resources\Other\LeasingResource;
use Filament\Resources\Pages\ManageRecords;

class ManageLeasings extends ManageRecords
{
    protected static string $resource = LeasingResource::class;

    protected function getActions(): array
    {
        return [
            \Filament\Actions\CreateAction::make(),
        ];
    }
}
