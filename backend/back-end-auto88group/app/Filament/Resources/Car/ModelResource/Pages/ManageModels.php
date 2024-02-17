<?php

namespace App\Filament\Resources\Car\ModelResource\Pages;

use App\Filament\Resources\Car\ModelResource;
use Filament\Resources\Pages\ManageRecords;

class ManageModels extends ManageRecords
{
    protected static string $resource = ModelResource::class;

    protected function getActions(): array
    {
        return [
            \Filament\Actions\CreateAction::make(),
        ];
    }
}
