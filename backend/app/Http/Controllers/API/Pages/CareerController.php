<?php

namespace App\Http\Controllers\API\Pages;

use App\Http\Controllers\Controller;
use App\Models\Job\Vacancy;
use Illuminate\Http\Request;

class CareerController extends Controller
{
    public function view()
    {
        return response()->json(['data' => Vacancy::all()]);
    }
    public function store(Request $request)
    {
        try {
            $data = new Vacancy();
            $data->name  = $request->name;
            $data->department  = $request->department;
            $data->experience  = $request->experience;
            $data->placement  = $request->placement;
            $data->description  = $request->description;
            $data->condition  = $request->condition;
            $data->save();
            return response()->json(['status' => 200], 200);
        } catch (\Throwable $th) {
            return response()->json(['status' => 500], 500);
        }
    }
    public function update(Request $request, $vacancyId)
    {
        try {
            $data = Vacancy::find($vacancyId);
            $data->name  = $request->name;
            $data->department  = $request->department;
            $data->experience  = $request->experience;
            $data->placement  = $request->placement;
            $data->description  = $request->description;
            $data->condition  = $request->condition;
            $data->save();
            return response()->json(['status' => 200], 200);
        } catch (\Throwable $th) {
            return response()->json(['status' => 500], 500);
        }
    }
    public function delete($vacancyId)
    {
        try {
            $data = Vacancy::find($vacancyId);
            $data->delete();
            return response()->json(['status' => 200], 200);
        } catch (\Throwable $th) {
            return response()->json(['status' => 500], 500);
        }
    }
}
