<?php

namespace App\Filament\Resources\FAQ\QuestionResource\Pages;

use App\Filament\Resources\FAQ\QuestionResource;
use Filament\Resources\Pages\ManageRecords;

class ManageQuestions extends ManageRecords
{
    protected static string $resource = QuestionResource::class;

    protected function getActions(): array
    {
        return [
            \Filament\Actions\CreateAction::make(),
        ];
    }
}
