<?php

namespace App\Filament\Resources\Main\CarResource\Pages;

use App\Filament\Resources\Main\CarResource;
use App\Models\Car\Brand;
use App\Models\Car\Color;
use App\Models\Car\Cylinder;
use App\Models\Car\Fuel;
use App\Models\Car\Gear;
use App\Models\Car\Kind;
use App\Models\Car\Model;
use App\Models\Car\Row;
use App\Models\Car\Series;
use App\Models\Car\Transmission;
use App\Models\Car\Type;
use App\Models\Car\Year;
use Filament\Resources\Pages\ManageRecords;

class ManageCars extends ManageRecords
{
    protected static string $resource = CarResource::class;

    protected function getActions(): array
    {
        return [
            \Filament\Actions\CreateAction::make()
                ->mutateFormDataUsing(function (array $data): array {
                    $brand = Brand::whereId($data['car_brand_id'])->first();
                    $model = Model::whereId($data['car_model_id'])->first();
                    $type = Type::whereId($data['car_type_id'])->first();
                    $kind = Kind::whereId($data['car_kind_id'])->first();
                    $series = Series::whereId($data['car_series_id'])->first();
                    $cylinder = Cylinder::whereId($data['car_cylinder_id'])->first();
                    $transmission = Transmission::whereId($data['car_transmission_id'])->first();
                    $gear = Gear::whereId($data['car_gear_id'])->first();
                    $fuel = Fuel::whereId($data['car_fuel_id'])->first();
                    $color = Color::whereId($data['car_color_id'])->first();
                    $year = Year::whereId($data['car_year_id'])->first();
                    $row = Row::whereId($data['car_row_id'])->first();

                    $data['police_number'] = strtoupper($data['police_number']);
                    $data['chassis_number'] = strtoupper($data['chassis_number']);
                    $data['machine_number'] = strtoupper($data['machine_number']);
                    $data['slug'] = $brand->name. ' ' . $model->name . ' ' . $type->name . ' ' . $kind->name . ' (' . $series->name . ') ' . number_format(doubleval($cylinder->volume / 1000), 1) . ' ' . $transmission->name . ' ' . $gear->name . ' ' . $fuel->name . ' ' . $color->name . ' (' . $year->name . ') ' . $row->name;

                    return $data;
                }),
        ];
    }
}
