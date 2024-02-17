<?php

namespace App\Filament\Resources\Job\VacancyResource\Pages;

use App\Filament\Resources\Job\VacancyResource;
use Filament\Resources\Pages\ManageRecords;

class ManageVacancies extends ManageRecords
{
    protected static string $resource = VacancyResource::class;

    protected function getActions(): array
    {
        return [
            \Filament\Actions\CreateAction::make(),
        ];
    }
}
