<?php

namespace App\Http\Controllers\API\Pages;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Job\Vacancy;
class VacancyController extends Controller
{
    public function show($jobId)
    {
        $data = Vacancy::find($jobId);
        return response()->json(['data' => $data]);
    }
}
