<?php

namespace App\Filament\Resources\Area\DistrictResource\Pages;

use App\Filament\Resources\Area\DistrictResource;
use App\Models\Area\District;
use Filament\Notifications\Notification;
use Filament\Resources\Pages\ManageRecords;
use Illuminate\Validation\ValidationException;

class ManageDistricts extends ManageRecords
{
    protected static string $resource = DistrictResource::class;

    protected function getActions(): array
    {
        return [
            \Filament\Actions\CreateAction::make()
                ->mutateFormDataUsing(
                    function (array $data): array {
                        $not_unique = District::where([
                            ['area_province_id', '=', $data['area_province_id']],
                            ['area_city_id', '=', $data['area_city_id']],
                            ['name', '=', $data['name']]
                        ])->exists();

                        if ($not_unique) {
                            Notification::make()
                                ->danger()
                                ->title('Failed to create')
                                ->body('Province, City and District combination is not unique')
                                ->send();

                            throw ValidationException::withMessages(['Province, City and District combination is not unique']);
                        }

                        return $data;
                    },
                ),
        ];
    }
}
