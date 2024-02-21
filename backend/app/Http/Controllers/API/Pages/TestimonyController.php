<?php

namespace App\Http\Controllers\API\Pages;

use App\Http\Controllers\Controller;
use App\Models\Main\Testimonial;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

class TestimonyController extends Controller
{
    public function show(Request $request)
    {
        $page = $request->query('page', 1);
    $perPage = $request->query('perPage', 9);

    $result = Testimonial::join('cars', 'car_testimonials.car_id', 'cars.id')
                ->join('car_brands', 'car_brands.id', 'cars.car_brand_id')
                ->select('car_testimonials.*', 'cars.slug', 'car_brands.name as brand_name') // Perbaikan disini
                ->paginate($perPage, ['*'], 'page', $page);
    $result->getCollection()->transform(function ($car) {
        $car->title = $car->slug;
        $car->slug = Str::slug($car->title);
        return $car;
    });

    return $result;
    }
}
