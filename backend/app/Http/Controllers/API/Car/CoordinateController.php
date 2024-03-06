<?php

namespace App\Http\Controllers\API\Car;

use App\Http\Controllers\Controller;
use App\Models\Location\Car;
use Illuminate\Http\Request;

class CoordinateController extends Controller
{
    public function view()
    {
        return response()->json(['data' => Car::all()], 200);
    }
    public function store(Request $request)
    {
        try {
            $data = $request->all();
            $data = new Car($data);
            $data->save();
            return response()->json(['status' => 200], 200);
        } catch (\Throwable $th) {
            return response()->json(['status' => 201], 201);
        }
    }
    public function update(Request $request, $locaId)
    {
        try {
            $data = Car::find($locaId);
            if (!$data) {
                return response()->json(['error' => 'Car location not found'], 404);
            }

            $data->name = $request->name;
            $data->latitude = $request->latitude;
            $data->longitude = $request->longitude;
            $data->is_unlimited = $request->is_unlimited;
            $data->limitation = $request->limitation;
            $data->is_visible = $request->is_visible;
            $data->update();
            return response()->json(['status' => 200], 200);
        } catch (\Throwable $th) {
            return response()->json(['status' => 500, 'error' => $th->getMessage()], 500);
        }
    }
}
