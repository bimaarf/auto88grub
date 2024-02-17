<?php

namespace App\Http\Controllers\API\Pages;

use App\Http\Controllers\Controller;
use App\Models\Blog\Post;
use Illuminate\Http\Request;

class BlogController extends Controller
{
    public function view()
    {
        $getBlog = Post::with([
            'category'
        ])->get();
        $sliderFilter = array_chunk($getBlog->toArray(), 5);

        return $sliderFilter;
    }
}
