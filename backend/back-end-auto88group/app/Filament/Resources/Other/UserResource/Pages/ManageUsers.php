<?php

namespace App\Filament\Resources\Other\UserResource\Pages;

use App\Filament\Resources\Other\UserResource;
use Filament\Resources\Pages\ManageRecords;

class ManageUsers extends ManageRecords
{
    protected static string $resource = UserResource::class;

    protected function getActions(): array
    {
        return [
            \Filament\Actions\CreateAction::make(),
        ];
    }
}
