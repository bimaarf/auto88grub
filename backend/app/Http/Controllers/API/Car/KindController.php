<?php

namespace App\Http\Controllers\API\Car;

use App\Http\Controllers\Controller;
use App\Models\Car\Kind;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;

class KindController extends Controller
{

    public function view()
    {
        return response()->json(['data' => Kind::all()]);
    }
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255',
            'image' => 'image|mimes:jpeg,png,jpg,gif|max:2048',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 400);
        }
        try {
            $data = new Kind();
            $data->name = $request->name;
            if ($request->hasFile('image')) {
                $file = $request->file('image');
                $filename = time() . '-' . $file->getClientOriginalName();
                $directory = 'app/public/car-kind-attachments';
                $file->move(storage_path($directory), $filename);
                $data->image = 'car-kind-attachments/' . $filename;
            }
            $data->save();
            return response()->json(['status' => 200], 200);
        } catch (\Throwable $th) {
            return response()->json(['status' => 500], 500);
        }
    }

    public function update(Request $request, $kindId)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255',
            'image' => 'image|mimes:jpeg,png,jpg,gif|max:2048',
        ]);
        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 400);
        }
        try {
            $data = Kind::find($kindId);
            $data->name = $request->name;

            if ($request->hasFile('image')) {
                $directory = 'app/public/car-kind-attachments/';
                if ($data->image) {
                    $imagePath = storage_path($directory . $data->image);
                    if (file_exists($imagePath)) {
                        // unlink($imagePath);
                        Storage::delete($data->image);
                    }
                }
                $file = $request->file('image');
                $filename = time() . '-' . $file->getClientOriginalName();
                $file->move(storage_path($directory), $filename);
                $data->image = 'car-kind-attachments/' . $filename;
            }
            $data->save();
            return response()->json(['status' => 200], 200);
        } catch (\Exception $e) {
            return response()->json(['status' => 500], 500);
        }
    }

    public function delete($kindId)
    {
        try {
            $data = Kind::find($kindId);
            $data->delete();
            return response()->json(['status' => 200], 200);
        } catch (\Throwable $th) {
            return response()->json(['status' => 500], 500);
        }
    }
}
