<?php

namespace App\Http\Controllers\API\Pages;

use App\Http\Controllers\Controller;
use App\Models\Car\Brand;
use App\Models\Car\Color;
use App\Models\Car\Cylinder;
use App\Models\Car\Fuel;
use App\Models\Car\Gear;
use App\Models\Car\Kind;
use App\Models\Car\Model;
use App\Models\Car\Series;
use App\Models\Car\Transmission;
use App\Models\Car\Type;
use App\Models\Main\Car;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Illuminate\Support\Collection;

class CarController extends Controller
{
    public function getComponents()
    {
        $data['brand'] = Brand::all();
        $data['model'] = Model::all();
        $data['type'] = Type::all();
        $data['kind'] = Kind::all();
        $data['cylinder'] = Cylinder::all();
        $data['transmission'] = Transmission::all();
        $data['series'] = Series::all();
        $data['gear'] = Gear::all();
        $data['fuel'] = Fuel::all();
        $data['color'] = Color::all();
        return response()->json(['data' => $data]);
    }

    public function filter(Request $request)
    {
        $input = $request->all();

        $query = Car::with([
            'promos', 'documents', 'officials', 'originals', 'outdoors',
            'location', 'brand', 'model', 'type', 'cylinder', 'transmission', 'series',
            'gear', 'fuel', 'color', 'row', 'year'
        ]);

        foreach ($input as $key => $value) {
            if ($key === 'perPage' || $key === 'price' || empty($value)) {
                continue;
            }

            $query->where(function ($q) use ($key, $value) {
                $q->where("car_{$key}_id", $value);
            });
        }

        if (isset($input['price'])) {
            $query->where('price', '<=', $input['price']);
        }

        $perPage = $request->input('perPage', 10);
        $cars = $query->paginate($perPage);
        $cars->getCollection()->transform(function ($car) {
            $car->title = $car->slug;
            $car->slug = Str::slug($car->title);
            return $car;
        });
        return $cars;
    }

    public function getNew(Request $request)
    {
        $page = $request->query('page', 1);
        $perPage = $request->query('perPage', 10);
        $getCar = Car::with([
            'promos', 'documents', 'officials', 'originals', 'outdoors',
            'location', 'brand', 'model', 'type', 'cylinder', 'transmission', 'series',
            'gear', 'fuel', 'color', 'row', 'year'
        ])
            ->orderBy('id', 'DESC')
            ->paginate($perPage, ['*'], 'page', $page);
        $getCar->getCollection()->transform(function ($car) {
            $car->title = $car->slug;
            $car->slug = Str::slug($car->title);
            return $car;
        });

        return $getCar;
    }
    public function showCar(Request $request)
    {
        $page = $request->query('page', 1);
        $perPage = $request->query('perPage', 10);

        $getCar = Car::with([
            'promos', 'documents', 'officials', 'originals', 'outdoors',
            'location', 'brand', 'model', 'type', 'cylinder', 'transmission', 'series',
            'gear', 'fuel', 'color', 'row', 'year'
        ])
            ->orderBy('id', 'DESC')
            ->paginate($perPage, ['*'], 'page', $page);
        $getCar->getCollection()->transform(function ($car) {
            $car->title = $car->slug;
            $car->slug = Str::slug($car->title);
            return $car;
        });
        return $getCar;
    }


    public function previewCar($slug, $carId)
    {
        $getCar = Car::with([
            'promos', 'documents', 'officials', 'originals', 'outdoors',
            'location', 'brand', 'model', 'type', 'cylinder', 'transmission', 'series',
            'gear', 'fuel', 'color', 'row', 'year'
        ])->where('id', $carId)->first();

        if (!$getCar) {
            return response()->json(['message' => 'Car not found'], 404);
        }

        $getCar->title = $getCar->slug;
        $getCar->slug = Str::slug($getCar->title);

        return $getCar;
    }
}
