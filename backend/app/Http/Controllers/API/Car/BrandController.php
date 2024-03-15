<?php

namespace App\Http\Controllers\API\Car;

use App\Http\Controllers\Controller;
use App\Models\Car\Brand;
use Illuminate\Http\Request;

class BrandController extends Controller
{
    public function view()
    {
        return response()->json(['data' => Brand::all()]);
    }
    public function store(Request $request)
    {
        try {
            $data = $request->all();
            $data = new Brand($data);
            $data->save();
            return response()->json(['status' => 200], 200);
        } catch (\Throwable $th) {
            return response()->json(['status' => 500], 500);
        }
    }
    public function update(Request $request, $brandId)
    {
        try {
            $data = Brand::find($brandId);
            $data->name = $request->name;
            $data->save();
            return response()->json(['status' => 200], 200);
        } catch (\Throwable $th) {
            return response()->json(['status' => 500], 500);
        }
    }
    public function delete($brandId)
    {
        try {
            $data = Brand::find($brandId);
            $data->delete();
            return response()->json(['status' => 200], 200);
        } catch (\Throwable $th) {
            return response()->json(['status' => 500], 500);
        }
    }
}
