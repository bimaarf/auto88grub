<?php

namespace App\Http\Controllers\API\Pages;

use App\Http\Controllers\Controller;
use App\Models\Blog\Post;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;

class BlogController extends Controller
{
    private function getApiTempo()
    {
        $response = Http::get('https://api-berita-indonesia.vercel.app/tempo/otomotif');
        if ($response->successful()) {
            return $response->json();
        } else {
            return null;
        }
    }

    public function viewSample()
    {
        $getData = $this->getApiTempo();

        if ($getData) {
            $sliderFilter = array_chunk($getData['data']['posts'], 5);
            return array_slice($sliderFilter, 0, 3);
        } else {
            return [];
        }
    }

    public function view()
    {
        return $this->viewSample();
    }
}
