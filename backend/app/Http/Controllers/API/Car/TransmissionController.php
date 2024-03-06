<?php

namespace App\Http\Controllers\API\Car;

use App\Http\Controllers\Controller;
use App\Models\Car\Transmission;
use Illuminate\Http\Request;

class TransmissionController extends Controller
{
    public function view()
    {
        return response()->json(['data' => Transmission::all()]);
    }
    public function store(Request $request)
    {
        try {
            $data = new Transmission();
            $data->name = $request->name;
            $data->save();
            return response()->json(['status' => 200], 200);
        } catch (\Throwable $th) {
            return response()->json(['status' => 201], 201);
        }
    }
    public function update(Request $request, $transId)
    {
        try {
            $data = Transmission::find($transId);
            $data->name = $request->name;
            $data->save();
            return response()->json(['status' => 200], 200);
        } catch (\Throwable $th) {
            return response()->json(['status' => 201], 201);
        }
    }
    public function delete($transId)
    {
        try {
            $data = Transmission::find($transId);
            $data->delete();
            return response()->json(['status' => 200], 200);
        } catch (\Throwable $th) {
            return response()->json(['status' => 201], 201);
        }
    }
}
