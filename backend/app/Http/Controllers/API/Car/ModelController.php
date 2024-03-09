<?php

namespace App\Http\Controllers\API\Car;

use App\Http\Controllers\Controller;
use App\Models\Car\Model;
use Illuminate\Http\Request;

class ModelController extends Controller
{

    public function view()
    {
        try {
            $data = Model::with('brand')->get();
            return response()->json(['data' => $data], 200);
        } catch (\Throwable $th) {
            return response()->json(['status' => 500, 'error' => $th->getMessage()], 500);
        }
    }

    public function store(Request $request)
    {
        try {
            $data = $request->all();
            $data = new Model($data);
            $data->save();
            return response()->json(['status' => 200], 200);
        } catch (\Throwable $th) {
            return response()->json(['status' => 500], 500);
        }
    }
    public function update(Request $request, $modelId)
    {
        try {
            $data = Model::find($modelId);;
            $data->car_brand_id = $request->car_brand_id;
            $data->name = $request->name;
            $data->save();
            return response()->json(['status' => 200], 200);
        } catch (\Throwable $th) {
            return response()->json(['status' => 500], 500);
        }
    }
    public function delete($modelId)
    {
        try {
            $data = Model::find($modelId);;
            $data->delete();
            return response()->json(['status' => 200], 200);
        } catch (\Throwable $th) {
            return response()->json(['status' => 500], 500);
        }
    }
}
