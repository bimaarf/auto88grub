<?php

namespace App\Filament\Resources\Car\KindResource\Pages;

use App\Filament\Resources\Car\KindResource;
use Filament\Resources\Pages\ManageRecords;

class ManageKinds extends ManageRecords
{
    protected static string $resource = KindResource::class;

    protected function getActions(): array
    {
        return [
            \Filament\Actions\CreateAction::make()->createAnother(false),
        ];
    }
}
