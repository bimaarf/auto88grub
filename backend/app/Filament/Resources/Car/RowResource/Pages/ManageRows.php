<?php

namespace App\Filament\Resources\Car\RowResource\Pages;

use App\Filament\Resources\Car\RowResource;
use Filament\Resources\Pages\ManageRecords;

class ManageRows extends ManageRecords
{
    protected static string $resource = RowResource::class;

    protected function getActions(): array
    {
        return [
            \Filament\Actions\CreateAction::make(),
        ];
    }
}
