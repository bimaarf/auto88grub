<?php

namespace App\Http\Controllers\API\Car;

use App\Http\Controllers\Controller;
use App\Models\Car\Series;
use Illuminate\Http\Request;

class SeriesController extends Controller
{
    public function view()
    {
        return response()->json(['data' => Series::all()]);
    }
    public function store(Request $request)
    {
        try {
            $data = new Series();
            $data->name = $request->name;
            $data->save();
            return response()->json(['status' => 200], 200);
        } catch (\Throwable $th) {
            return response()->json(['status' => 201], 201);
        }
    }
    public function update(Request $request, $seriesId)
    {
        try {
            $data = Series::find($seriesId);
            $data->name = $request->name;
            $data->save();
            return response()->json(['status' => 200], 200);
        } catch (\Throwable $th) {
            return response()->json(['status' => 201], 201);
        }
    }
    public function delete($seriesId)
    {
        try {
            $data = Series::find($seriesId);
            $data->delete();
            return response()->json(['status' => 200], 200);
        } catch (\Throwable $th) {
            return response()->json(['status' => 201], 201);
        }
    }
}
