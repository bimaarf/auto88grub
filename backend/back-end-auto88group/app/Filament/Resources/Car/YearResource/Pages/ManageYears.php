<?php

namespace App\Filament\Resources\Car\YearResource\Pages;

use App\Filament\Resources\Car\YearResource;
use Filament\Resources\Pages\ManageRecords;

class ManageYears extends ManageRecords
{
    protected static string $resource = YearResource::class;

    protected function getActions(): array
    {
        return [
            \Filament\Actions\CreateAction::make(),
        ];
    }
}
