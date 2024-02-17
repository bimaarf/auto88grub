<?php

namespace App\Filament\Resources\Other\YoutubeResource\Pages;

use App\Filament\Resources\Other\YoutubeResource;
use Filament\Resources\Pages\ManageRecords;

class ManageYoutubes extends ManageRecords
{
    protected static string $resource = YoutubeResource::class;

    // protected function getActions(): array
    // {
    //     return [
    //         \Filament\Actions\CreateAction::make(),
    //     ];
    // }
}
