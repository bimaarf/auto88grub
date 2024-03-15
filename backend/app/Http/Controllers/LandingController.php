<?php

namespace App\Http\Controllers;

use App\Models\Background;
use App\Models\Company\AboutUs;
use App\Models\Company\Consultation;
use App\Models\Company\Credit;
use App\Models\Company\Term;
use App\Models\Company\TradeIn;
use App\Models\Company\VisitUs;
use App\Models\Company\PrivacyPolicy;
use App\Models\FAQ\Category;
use App\Models\FAQ\Question;
use App\Models\Job\Vacancy;
use App\Models\Gallery\Slider;
use App\Models\HighLight;
use App\Models\Other\CustomerService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class LandingController extends Controller
{
    public function sliderShow()
    {
        return Slider::where('category', 'banner')->get();
    }
    public function hlShow()
    {
        return HighLight::all();
    }
    private function consultation()
    {
        return Consultation::all();
    }
    private function tradeIn()
    {
        return TradeIn::all();
    }
    private function creditCar()
    {
        return Credit::all();
    }
    private function term()
    {
        return Term::all();
    }
    private function about()
    {
        return AboutUs::all();
    }
    private function vacancy()
    {
        return Vacancy::all();
    }
    private function visit()
    {
        return VisitUs::all();
    }
    private function privacyPolicy()
    {
        return PrivacyPolicy::all();
    }
    private function customerService()
    {
        return CustomerService::all();
    }
    private function FAQ()
    {
        return Category::with('questions')->get();
    }
    public function background(Request $request) {
        $validator = Validator::make($request->all(), [
            'image' => 'required|image|mimes:jpeg,jpg,png,webp',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 400);
        }
        try {
            $background = Background::first();

            if (!$background) {
                return response()->json(['status' => 404, 'message' => 'Background not found'], 404);
            }

            $image = $request->file('image');
            $imageName = time() . '_' . $image->getClientOriginalName();
            $image->move(public_path('images/backgrounds'), $imageName);

            $background->image = 'images/backgrounds/' . $imageName;
            $background->save();

            return response()->json(['status' => 200, 'message' => 'Background updated successfully'], 200);
        } catch (\Throwable $th) {
            return response()->json(['status' => 500, 'message' => 'Internal server error'], 500);
        }
    }
    public function getCompanyProfile()
    {
        $result['consultation'] = $this->consultation();
        $result['tradeIn'] = $this->tradeIn();
        $result['creditCar'] = $this->creditCar();
        $result['term'] = $this->term();
        $result['about'] = $this->about();
        $result['visit'] = $this->visit();
        $result['privacy_policy'] = $this->privacyPolicy();
        $result['vacancies'] = $this->vacancy();
        $result['faq'] = $this->FAQ();
        $result['customer_service'] = $this->customerService();
        return $result;
    }

}
