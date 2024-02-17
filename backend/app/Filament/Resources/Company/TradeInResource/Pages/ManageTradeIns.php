<?php

namespace App\Filament\Resources\Company\TradeInResource\Pages;

use App\Filament\Resources\Company\TradeInResource;
use Filament\Resources\Pages\ManageRecords;

class ManageTradeIns extends ManageRecords
{
    protected static string $resource = TradeInResource::class;

    protected function getActions(): array
    {
        return [
            \Filament\Actions\CreateAction::make()->createAnother(false),
        ];
    }
}
