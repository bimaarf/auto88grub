<?php

namespace App\Http\Controllers\API\Car;

use App\Http\Controllers\Controller;
use App\Models\Car\Gear;
use Illuminate\Http\Request;

class GearController extends Controller
{
    public function view()
    {
        return response()->json(['data' => Gear::all()]);
    }
    public function store(Request $request)
    {
        try {
            $data = new Gear();
            $data->name = $request->name;
            $data->save();
            return response()->json(['stauts' => 200], 200);
        } catch (\Throwable $th) {
            return response()->json(['stauts' => 201], 201);
        }
    }
    public function update(Request $request, $gearId)
    {
        try {
            $data = Gear::find($gearId);
            $data->name = $request->name;
            $data->save();
            return response()->json(['stauts' => 200], 200);
        } catch (\Throwable $th) {
            return response()->json(['stauts' => 201], 201);
        }
    }
    public function delete($gearId)
    {
        try {
            $data = Gear::find($gearId);
            $data->delete();
            return response()->json(['stauts' => 200], 200);
        } catch (\Throwable $th) {
            return response()->json(['stauts' => 201], 201);
        }
    }
}
