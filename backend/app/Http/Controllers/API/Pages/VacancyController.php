<?php

namespace App\Http\Controllers\API\Pages;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Job\Vacancy;
use App\Models\Job\Application;
use Illuminate\Support\Facades\Validator;

class VacancyController extends Controller
{
    public function show($jobId)
    {
        $data = Vacancy::find($jobId);
        return response()->json(['data' => $data]);
    }
    public function apply(Request $request, $applyId)
    {
        $validatedData = $request->validate([
            'name' => 'required|string',
            'phone_number' => 'required',
            'email' => 'required|email',
            'domicile' => 'required|string',
            'education' => 'required|string',
            'major' => 'required|string',
            'file' => 'nullable|mimes:pdf|max:2048',
        ]);

        $_data = new Application();
        $_data->job_vacancy_id = $applyId;
        $_data->name = $validatedData['name'];
        $_data->phone_number = $validatedData['phone_number'];
        $_data->email = $validatedData['email'];
        $_data->domicile = $validatedData['domicile'];
        $_data->education = $validatedData['education'];
        $_data->major = $validatedData['major'];
        $_data->fresh_graduate = $request->fresh_graduate === true || $request->fresh_graduate === 'true' ? 1 : 0;

        if ($request->hasFile('file')) {
            $_file = $request->file('file');

            if ($_file->getSize() > 2048 * 1024) {
                return response()->json(['error' => 'File size cannot exceed 2MB.'], 400);
            }

            $_filename = time() . '-' . $_file->getClientOriginalName();
            $_directory = 'app/public/job-vacancy-application';
            $_file->move(storage_path($_directory), $_filename);
            $_data->file = 'job-vacancy-application/' . $_filename;
        }

        $_data->save();
        return response()->json(['status' => 200], 200);
    }

}
