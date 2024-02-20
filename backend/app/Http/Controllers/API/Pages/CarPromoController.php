<?php

namespace App\Http\Controllers\API\Pages;

use App\Http\Controllers\Controller;
use App\Models\Main\Promo;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

class CarPromoController extends Controller
{
    public function showPromo()
    {
        $getData = Promo::with('car')
                        ->join('cars', 'cars.id', 'car_promos.car_id')
                        ->with([
                            'car.promos', 'car.documents', 'car.officials', 'car.originals', 'car.outdoors',
                            'car.location', 'car.brand', 'car.model', 'car.type', 'car.cylinder', 'car.transmission', 'car.series',
                            'car.gear', 'car.fuel', 'car.color', 'car.row', 'car.year'
                        ])
                        ->get(['car_promos.*', 'cars.slug', 'cars.description']);

        $getData->transform(function ($promo) {
            $promo->title = $promo->slug;
            $promo->slug = Str::slug($promo->title);
            return $promo;
        });
        return $getData;
    }
}
