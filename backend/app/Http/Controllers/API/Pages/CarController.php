<?php

namespace App\Http\Controllers\API\Pages;

use App\Http\Controllers\Controller;
use App\Models\Main\Car;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

class CarController extends Controller
{
    public function showCar()

    {
        // 'kind'
        $getCar = Car::with([
            'promos', 'documents', 'officials', 'originals', 'outdoors',
            'location', 'brand', 'model', 'type' ,'cylinder', 'transmission', 'series',
            'gear', 'fuel', 'color', 'row', 'year'
        ])->get();
        $getCar->transform(function ($car) {
            $car->title = $car->slug;
            $car->slug = Str::slug($car->title);
            return $car;
        });

        return $getCar;
    }
    public function previewCar($slug, $carId)
    {
        // 'kind',
        $getCar = Car::with([
            'promos', 'documents', 'officials', 'originals', 'outdoors',
            'location', 'brand', 'model', 'type', 'cylinder', 'transmission', 'series',
            'gear', 'fuel', 'color', 'row', 'year'
        ])->where('id', $carId)->first();

        if (!$getCar) {
            return response()->json(['message' => 'Car not found'], 404);
        }

        // Transformasi slug
        $getCar->title = $getCar->slug;
        $getCar->slug = Str::slug($getCar->title);

        return $getCar;
    }
}
