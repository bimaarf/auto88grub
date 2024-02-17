<?php

namespace App\Filament\Resources\Car\TypeResource\Pages;

use App\Filament\Resources\Car\TypeResource;
use App\Models\Car\Type;
use Filament\Notifications\Notification;
use Filament\Resources\Pages\ManageRecords;
use Illuminate\Validation\ValidationException;

class ManageTypes extends ManageRecords
{
    protected static string $resource = TypeResource::class;

    protected function getActions(): array
    {
        return [
            \Filament\Actions\CreateAction::make()
                ->mutateFormDataUsing(
                    function (array $data): array {
                        $not_unique = Type::where([
                            ['car_brand_id', '=', $data['car_brand_id']],
                            ['car_model_id', '=', $data['car_model_id']],
                            ['name', '=', $data['name']]
                        ])->exists();

                        if ($not_unique) {
                            Notification::make()
                                ->danger()
                                ->title('Failed to create')
                                ->body('Brand, Model and Type combination is not unique')
                                ->send();

                            throw ValidationException::withMessages(['Brand, Model and Type combination is not unique']);
                        }

                        return $data;
                    },
                ),
        ];
    }
}
