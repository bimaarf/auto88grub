<?php

namespace App\Http\Controllers;

use App\Models\Company\AboutUs;
use App\Models\Company\Consultation;
use App\Models\Company\Credit;
use App\Models\Company\Term;
use App\Models\Company\TradeIn;
use App\Models\Company\VisitUs;
use App\Models\Gallery\Slider;
use App\Models\HighLight;
use Illuminate\Http\Request;

class LandingController extends Controller
{
    public function getCompanyProfile()
    {
        $result['consultation'] = $this->consultation();
        $result['tradeIn'] = $this->tradeIn();
        $result['creditCar'] = $this->creditCar();
        $result['term'] = $this->term();
        $result['about'] = $this->about();
        $result['visit'] = $this->visit();
        return $result;
    }
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
    private function visit()
    {
        return VisitUs::all();
    }
}
