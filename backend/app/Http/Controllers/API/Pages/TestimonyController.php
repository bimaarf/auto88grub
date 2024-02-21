<?php

namespace App\Http\Controllers\API\Pages;

use App\Http\Controllers\Controller;
use App\Models\Main\Testimonial;
use Illuminate\Http\Request;

class TestimonyController extends Controller
{
    public function show(Request $request)
    {
        $page = $request->query('page', 1);
        $perPage = $request->query('perPage', 9);

        $result = Testimonial::paginate($perPage, ['*'], 'page', $page);

        return $result;
    }
}
