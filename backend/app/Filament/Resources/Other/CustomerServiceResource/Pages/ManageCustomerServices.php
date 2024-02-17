<?php

namespace App\Filament\Resources\Other\CustomerServiceResource\Pages;

use App\Filament\Resources\Other\CustomerServiceResource;
use Filament\Resources\Pages\ManageRecords;

class ManageCustomerServices extends ManageRecords
{
    protected static string $resource = CustomerServiceResource::class;

    protected function getActions(): array
    {
        return [
            \Filament\Actions\CreateAction::make(),
        ];
    }
}
