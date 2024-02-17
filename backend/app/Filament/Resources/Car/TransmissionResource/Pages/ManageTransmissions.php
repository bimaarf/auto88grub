<?php

namespace App\Filament\Resources\Car\TransmissionResource\Pages;

use App\Filament\Resources\Car\TransmissionResource;
use Filament\Resources\Pages\ManageRecords;

class ManageTransmissions extends ManageRecords
{
    protected static string $resource = TransmissionResource::class;

    protected function getActions(): array
    {
        return [
            \Filament\Actions\CreateAction::make(),
        ];
    }
}
