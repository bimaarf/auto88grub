<?php

namespace App\Http\Controllers\API\Car;

use App\Http\Controllers\Controller;
use App\Models\Car\Cylinder;
use Illuminate\Http\Request;

class CylinderController extends Controller
{
    public function view()
    {
        return response()->json(['data' => Cylinder::all()]);
    }
    public function store(Request $request)
    {
        try {
            $data = new Cylinder();
            $data->volume = $request->volume;
            $data->save();
            return response()->json(['status' => 200], 200);
        } catch (\Throwable $th) {
            return response()->json(['status' => 201], 201);
        }
    }
    public function update(Request $request, $cylinderId)
    {
        try {
            $data = Cylinder::find($cylinderId);
            $data->volume = $request->volume;
            $data->update();
            return response()->json(['status' => 200], 200);
        } catch (\Throwable $th) {
            return response()->json(['status' => 201], 201);
        }
    }
    public function delete($cylinderId)
    {
        try {
            $data = Cylinder::find($cylinderId);
            $data->delete();
            return response()->json(['status' => 200], 200);
        } catch (\Throwable $th) {
            return response()->json(['status' => 201], 201);
        }
    }
}
