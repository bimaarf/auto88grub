<?php

namespace App\Filament\Resources\Car\BrandResource\Pages;

use App\Filament\Resources\Car\BrandResource;
use Filament\Resources\Pages\ManageRecords;

class ManageBrands extends ManageRecords
{
    protected static string $resource = BrandResource::class;

    protected function getActions(): array
    {
        return [
            \Filament\Actions\CreateAction::make(),
        ];
    }
}
