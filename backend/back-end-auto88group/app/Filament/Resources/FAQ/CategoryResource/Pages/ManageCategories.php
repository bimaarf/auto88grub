<?php

namespace App\Filament\Resources\FAQ\CategoryResource\Pages;

use App\Filament\Resources\FAQ\CategoryResource;
use Filament\Resources\Pages\ManageRecords;

class ManageCategories extends ManageRecords
{
    protected static string $resource = CategoryResource::class;

    protected function getActions(): array
    {
        return [
            \Filament\Actions\CreateAction::make(),
        ];
    }
}
