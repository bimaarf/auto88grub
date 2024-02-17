<?php

namespace App\Filament\Resources\Area\SubdistrictResource\Pages;

use App\Filament\Resources\Area\SubdistrictResource;
use App\Models\Area\Subdistrict;
use Filament\Notifications\Notification;
use Filament\Resources\Pages\ManageRecords;
use Illuminate\Validation\ValidationException;

class ManageSubdistricts extends ManageRecords
{
    protected static string $resource = SubdistrictResource::class;

    protected function getActions(): array
    {
        return [
            \Filament\Actions\CreateAction::make()
                ->mutateFormDataUsing(
                    function (array $data): array {
                        $not_unique = Subdistrict::where([
                            ['area_province_id', '=', $data['area_province_id']],
                            ['area_city_id', '=', $data['area_city_id']],
                            ['area_district_id', '=', $data['area_district_id']],
                            ['name', '=', $data['name']]
                        ])->exists();

                        if ($not_unique) {
                            Notification::make()
                                ->danger()
                                ->title('Failed to create')
                                ->body('Province, City, District and Subdistrict combination is not unique')
                                ->send();

                            throw ValidationException::withMessages(['Province, City, District and Subdistrict combination is not unique']);
                        }

                        return $data;
                    },
                ),
        ];
    }
}
