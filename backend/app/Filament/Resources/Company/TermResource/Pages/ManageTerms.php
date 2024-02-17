<?php

namespace App\Filament\Resources\Company\TermResource\Pages;

use App\Filament\Resources\Company\TermResource;
use Filament\Resources\Pages\ManageRecords;

class ManageTerms extends ManageRecords
{
    protected static string $resource = TermResource::class;

    protected function getActions(): array
    {
        return [
            \Filament\Actions\CreateAction::make()->createAnother(false),
        ];
    }
}
