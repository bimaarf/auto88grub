<?php

namespace App\Filament\Resources\Company\CreditResource\Pages;

use App\Filament\Resources\Company\CreditResource;
use Filament\Resources\Pages\ManageRecords;

class ManageCredits extends ManageRecords
{
    protected static string $resource = CreditResource::class;

    protected function getActions(): array
    {
        return [
            \Filament\Actions\CreateAction::make()->createAnother(false),
        ];
    }
}
