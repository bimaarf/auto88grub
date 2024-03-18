<?php

namespace App\Http\Controllers\API\Pages;

use App\Http\Controllers\Controller;
use App\Models\Gallery\Slider;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;

class SliderController extends Controller
{
    public function categView()
    {
        $options = [
            ['category' => 'Banner'],
            ['category' => 'Popup'],
        ];
        return response()->json(['data' => $options]);
    }

    public function view()
    {
        return response()->json(['data' => Slider::all()]);
    }
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'category' => 'required',
            'image.*' => 'required|image|mimes:jpeg,jpg,png,webp',
        ]);
        try {
            if ($validator->fails()) {
                return response()->json([
                    'status' => 202,
                    'message' => 'Validator error'
                ]);
            }
            if ($request->hasFile('image')) {
                $_data = new Slider();
                $_data->category  = $request->category;
                $_file = $request->file('image');
                $_filename = time() . '-' . $_file->getClientOriginalName();
                $_directory = 'app/public/gallery-sliders-attachments';
                $_file->move(storage_path($_directory), $_filename);
                $_data->image = 'gallery-sliders-attachments/' . $_filename;
            }
            return response()->json(['status' => 200], 200);
        } catch (\Throwable $th) {
            return response()->json(['status' => 201], 201);
        }
    }
    public function update(Request $request, $sliderId)
    {
        $validator = Validator::make($request->all(), [
            'category' => 'required',
            'image.*' => 'required|image|mimes:jpeg,jpg,png,webp',
        ]);
        try {
            if ($validator->fails()) {
                return response()->json([
                    'status' => 202,
                    'message' => 'Validator error'
                ]);
            }
            $data = Slider::find($sliderId);
            $data->category = $request->category;
            if ($request->hasFile('image')) {
                $directory = 'app/public/gallery-sliders-attachments/';
                if ($data->image) {
                    $imagePath = storage_path('app/public/' . $data->image);
                    if (file_exists($imagePath)) {
                        // unlink($imagePath);
                        Storage::delete($data->image);
                    }
                }
                $file = $request->file('image');
                $filename = time() . '-' . $file->getClientOriginalName();
                $file->move(storage_path($directory), $filename);
                $data->image = 'gallery-sliders-attachments/' . $filename;
            }
            $data->save();
            return response()->json(['status' => 200], 200);
        } catch (\Throwable $th) {
            return response()->json(['status' => 201], 201);
        }
    }
}
