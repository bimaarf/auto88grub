<?php

namespace App\Http\Controllers\API\Car;

use App\Http\Controllers\Controller;
use App\Models\Car\Color;
use Illuminate\Http\Request;

class ColorController extends Controller
{
    public function view()
    {
        return response()->json(['data' => Color::all()]);
    }
    public function store(Request $request)
    {
        try {
            $data = new Color();
            $data->name = $request->name;
            $data->save();
            return response()->json(['status' => 200], 200);
        } catch (\Throwable $th) {
            return response()->json(['status' => 500], 500);
        }
    }
    public function update(Request $request, $colorId)
    {
        try {
            $data = Color::find($colorId);
            $data->name = $request->name;
            $data->save();
            return response()->json(['status' => 200], 200);
        } catch (\Throwable $th) {
            return response()->json(['status' => 500], 500);
        }
    }
    public function delete($colorId)
    {
        try {
            $data = Color::find($colorId);
            $data->delete();
            return response()->json(['status' => 200], 200);
        } catch (\Throwable $th) {
            return response()->json(['status' => 500], 500);
        }
    }
}
