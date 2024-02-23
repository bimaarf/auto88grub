<?php

namespace App\Http\Controllers\API\Pages;

use App\Http\Controllers\Controller;
use App\Models\Main\Promo;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Illuminate\Support\Collection;

class CarPromoController extends Controller
{
    public function filter(Request $request)
    {
        $input = $request->all();

        $query = Promo::with('car')
            ->join('cars', 'cars.id', 'car_promos.car_id')
            ->with([
                'car.documents', 'car.officials', 'car.originals', 'car.outdoors',
                'car.location', 'car.brand', 'car.model', 'car.type', 'car.cylinder', 'car.transmission', 'car.series',
                'car.gear', 'car.fuel', 'car.color', 'car.row', 'car.year'
            ]);

        foreach ($input as $key => $value) {
            if ($key === 'perPage' || $key === 'price' || empty($value)) {
                continue;
            }

            $query->whereHas('car', function ($q) use ($key, $value) {
                $q->where("cars.car_{$key}_id", $value);
            });
        }

        if (isset($input['price'])) {
            $query->where('car_promos.price', '<', $input['price']);
        }

        $perPage = $request->input('perPage', 10);
        $cars = $query->paginate($perPage);

        // Transform the paginated items
        $cars->getCollection()->transform(function ($car) {
            $car->title = $car->slug;
            $car->slug = Str::slug($car->title);
            return $car;
        });

        return $cars;
    }

    public function showPromo(Request $request)
    {
        $page = $request->query('page', 1);
        $perPage = $request->query('perPage', 10);
        $getData = Promo::with('car')
                        ->join('cars', 'cars.id', 'car_promos.car_id')
                        ->with(['car.documents', 'car.officials', 'car.originals', 'car.outdoors',
                            'car.location', 'car.brand', 'car.model', 'car.type', 'car.cylinder', 'car.transmission', 'car.series',
                            'car.gear', 'car.fuel', 'car.color', 'car.row', 'car.year'
                        ])
                        ->paginate($perPage, ['car_promos.*', 'cars.slug', 'cars.description'], 'page', $page);

        $getData->transform(function ($promo) {
            $promo->title = $promo->slug;
            $promo->slug = Str::slug($promo->title);
            return $promo;
        });
        return $getData;
    }
}
