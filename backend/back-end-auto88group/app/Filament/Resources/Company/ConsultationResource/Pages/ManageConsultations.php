<?php

namespace App\Filament\Resources\Company\ConsultationResource\Pages;

use App\Filament\Resources\Company\ConsultationResource;
use Filament\Resources\Pages\ManageRecords;

class ManageConsultations extends ManageRecords
{
    protected static string $resource = ConsultationResource::class;

    protected function getActions(): array
    {
        return [
            \Filament\Actions\CreateAction::make()->createAnother(false),
        ];
    }
}
