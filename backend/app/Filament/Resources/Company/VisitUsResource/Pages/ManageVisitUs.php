<?php

namespace App\Filament\Resources\Company\VisitUsResource\Pages;

use App\Filament\Resources\Company\VisitUsResource;
use Filament\Resources\Pages\ManageRecords;

class ManageVisitUs extends ManageRecords
{
    protected static string $resource = VisitUsResource::class;

    protected function getActions(): array
    {
        return [
            \Filament\Actions\CreateAction::make()->createAnother(false),
        ];
    }
}
