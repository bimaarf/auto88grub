<?php

namespace App\Http\Controllers\API\Pages;

use App\Http\Controllers\Controller;
use App\Models\FAQ\Category;
use App\Models\FAQ\Question;
use Illuminate\Http\Request;

class FAQController extends Controller
{
    public function categView()
    {
        return response()->json(['data' => Category::all()]);
    }
    public function view()
    {
        $data = Question::with('category')->get();
        return response()->json(['data' => $data]);
    }
    public function store(Request $request)
    {
        try {
            $data = new Question();
            $data->name        = $request->name;
            $data->faq_category_id = $request->category_id;
            $data->save();
            return response()->json(['status' => 200], 200);
        } catch (\Throwable $th) {
            return response()->json(['status' => 500], 500);
        }
    }
    public function update(Request $request, $questId)
    {
        try {
            $data = Question::find($questId);
            $data->faq_category_id = $request->category_id;
            $data->name        = $request->name;
            $data->save();
            return response()->json(['status' => 200], 200);
        } catch (\Throwable $th) {
            return response()->json(['status' => 500], 500);
        }
    }
    public function delete($questId)
    {
        try {
            $data = Question::find($questId);
            $data->delete();
            return response()->json(['status' => 200], 200);
        } catch (\Throwable $th) {
            return response()->json(['status' => 500], 500);
        }
    }
}
