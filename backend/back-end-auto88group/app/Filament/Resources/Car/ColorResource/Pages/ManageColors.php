<?php

namespace App\Filament\Resources\Car\ColorResource\Pages;

use App\Filament\Resources\Car\ColorResource;
use Filament\Resources\Pages\ManageRecords;

class ManageColors extends ManageRecords
{
    protected static string $resource = ColorResource::class;

    protected function getActions(): array
    {
        return [
            \Filament\Actions\CreateAction::make(),
        ];
    }
}
