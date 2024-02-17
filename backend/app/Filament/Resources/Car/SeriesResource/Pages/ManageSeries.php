<?php

namespace App\Filament\Resources\Car\SeriesResource\Pages;

use App\Filament\Resources\Car\SeriesResource;
use Filament\Resources\Pages\ManageRecords;

class ManageSeries extends ManageRecords
{
    protected static string $resource = SeriesResource::class;

    protected function getActions(): array
    {
        return [
            \Filament\Actions\CreateAction::make(),
        ];
    }
}
