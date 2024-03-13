<?php

namespace App\Http\Controllers\API\Car;

use App\Http\Controllers\Controller;
use App\Models\Location\Box;
use Illuminate\Http\Request;

class BrankasController extends Controller
{
    public function view()
    {
        return response()->json(['data' => Box::all()], 200);
    }
    public function store(Request $request)
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
    public function update(Request $request, $brankasId)
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
    public function delete($brankasId)
    {
        try {
            $box =  Box::find($brankasId);
            $box->delete();
            return response()->json(['status' => 200], 200);
        } catch (\Throwable $th) {
            return response()->json(['status' => 201], 201);
        }
    }
}
