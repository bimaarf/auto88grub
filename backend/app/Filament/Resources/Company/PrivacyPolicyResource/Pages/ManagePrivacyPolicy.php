<?php

namespace App\Filament\Resources\Company\PrivacyPolicyResource\Pages;

use App\Filament\Resources\Company\PrivacyPolicyResource;
use Filament\Resources\Pages\ManageRecords;

class ManagePrivacyPolicy extends ManageRecords
{
    protected static string $resource = PrivacyPolicyResource::class;

    protected function getActions(): array
    {
        return [
            \Filament\Actions\CreateAction::make()->createAnother(false),
        ];
    }
}
