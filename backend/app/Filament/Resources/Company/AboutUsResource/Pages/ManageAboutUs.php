<?php

namespace App\Filament\Resources\Company\AboutUsResource\Pages;

use App\Filament\Resources\Company\AboutUsResource;
use Filament\Resources\Pages\ManageRecords;

class ManageAboutUs extends ManageRecords
{
    protected static string $resource = AboutUsResource::class;

    protected function getActions(): array
    {
        return [
            \Filament\Actions\CreateAction::make()->createAnother(false),
        ];
    }
}
