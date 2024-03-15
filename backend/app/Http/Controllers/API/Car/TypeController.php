<?php

namespace App\Http\Controllers\API\Car;

use App\Http\Controllers\Controller;
use App\Models\Car\Type;
use Illuminate\Http\Request;

class TypeController extends Controller
{
    public function view()
    {
        $data = Type::with('brand', 'model')->get();

        return response()->json(['data' => $data]);
    }
    public function store(Request $request)
    {
        try {
            $data = new Type();
            $data->car_brand_id = $request->car_brand_id;
            $data->car_model_id = $request->car_model_id;
            $data->name         = $request->name;
            $data->save();
            return response()->json(['status' => 200], 200);
        } catch (\Throwable $th) {
            return response()->json(['status' => 500], 500);
        }
    }
    public function update(Request $request, $typeId)
    {
        try {
            $data = Type::find($typeId);
            $data->car_brand_id = $request->car_brand_id;
            $data->car_model_id = $request->car_model_id;
            $data->name         = $request->name;
            $data->save();
            return response()->json(['status' => 200], 200);
        } catch (\Throwable $th) {
            return response()->json(['status' => 500], 500);
        }
    }
    public function delete($typeId)
    {
        try {
            $data = Type::find($typeId);
            $data->delete();
            return response()->json(['status' => 200], 200);
        } catch (\Throwable $th) {
            return response()->json(['status' => 500], 500);
        }
    }
}
