<?php

namespace App\Filament\Resources\Main\TestimonialResource\Pages;

use App\Filament\Resources\Main\TestimonialResource;
use Filament\Resources\Pages\ManageRecords;
use Filament\Resources\Pages\ListRecords;

class ManageTestimonials extends ManageRecords
{
    protected static string $resource = TestimonialResource::class;

    protected function getActions(): array
    {
        return [
            \Filament\Actions\CreateAction::make(),
        ];
    }
}
