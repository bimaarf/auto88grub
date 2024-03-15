<?php

namespace App\Http\Controllers\API\Car;

use App\Http\Controllers\Controller;
use App\Models\Car\Fuel;
use Illuminate\Http\Request;

class FuelController extends Controller
{
    public function view()
    {
        return response()->json(['data' => Fuel::all()], 200);
    }
    public function store(Request $request)
    {
        try {
            $data = new Fuel();
            $data->name = $request->name;
            $data->save();
            return response()->json(['status' => 200], 200);
        } catch (\Throwable $th) {
            return response()->json(['status' => 500], 500);
        }
    }
    public function update(Request $request, $fuelId)
    {
        try {
            $data = Fuel::find($fuelId);
            $data->name = $request->name;
            $data->save();
            return response()->json(['status' => 200], 200);
        } catch (\Throwable $th) {
            return response()->json(['status' => 500], 500);
        }
    }
    public function delete($fuelId)
    {
        try {
            $data = Fuel::find($fuelId);
            $data->delete();
            return response()->json(['status' => 200], 200);
        } catch (\Throwable $th) {
            return response()->json(['status' => 500], 500);
        }
    }
}
