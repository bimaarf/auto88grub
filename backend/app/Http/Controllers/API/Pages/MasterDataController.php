<?php

namespace App\Http\Controllers\API\Pages;

use App\Http\Controllers\Controller;
use App\Models\Car\Brand;
use App\Models\Location\Box;
use App\Models\Location\Car;
use Illuminate\Http\Request;

class MasterDataController extends Controller
{
    public function brankasLocationView()
    {
        try {

            return response()->json(['data' => Box::all()], 200);
        } catch (\Throwable $th) {
            return response()->json(['status' => 201], 201);
        }
    }
    public function brankasLocationStore(Request $request)
    {
        try {
            $box = new Box();
            $box->name = $request->name;
            $box->save();
            return response()->json(['status' => 200], 200);
        } catch (\Throwable $th) {
            return response()->json(['status' => 201], 201);
        }
    }
    public function brankasLocationUpdate(Request $request, $brankasId)
    {
        try {
            $box =  Box::find($brankasId);
            $box->name = $request->name;
            $box->update();
            return response()->json(['status' => 200], 200);
        } catch (\Throwable $th) {
            return response()->json(['status' => 201], 201);
        }
    }
    public function brankasLocationDelete($brankasId)
    {
        try {
            $box =  Box::find($brankasId);
            $box->delete();
            return response()->json(['status' => 200], 200);
        } catch (\Throwable $th) {
            return response()->json(['status' => 201], 201);
        }
    }
    public function carLocationStore(Request $request)
    {
        try {
            $car = $request->all();
            $car = new Car($car);
            $car->save();
            return response()->json(['status' => 200], 200);
        } catch (\Throwable $th) {
            return response()->json(['status' => 201], 201);
        }
    }
    public function merkStore(Request $request)
    {
        try {
            $car = $request->all();
            $car = new Brand($car);
            $car->save();
            return response()->json(['status' => 200], 200);
        } catch (\Throwable $th) {
            return response()->json(['status' => 201], 201);
        }
    }
}
