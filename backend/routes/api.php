<?php

use App\Http\Controllers\API\Auth\AuthController;
use App\Http\Controllers\API\Car\BrandController;
use App\Http\Controllers\API\Pages\BlogController;
use App\Http\Controllers\API\Pages\CarController;
use App\Http\Controllers\API\Pages\CarPromoController;
use App\Http\Controllers\API\Pages\MasterDataController;
use App\Http\Controllers\API\Pages\TestimonyController;
use App\Http\Controllers\LandingController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
 */

Route::options('/sanctum/csrf-cookie', function () {
    return response('', 204)
        ->header('Access-Control-Allow-Origin', 'http://localhost:3000')
        ->header('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE, OPTIONS')
        ->header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
});
// Routes for AuthController
Route::post('register', [AuthController::class, 'register']);
Route::post('login', [AuthController::class, 'login']);

// CORS middleware to handle OPTIONS requests

// Routes inside the CORS middleware group
// Routes for CarController
Route::get('car/show', [CarController::class, 'showCar']);
Route::get('car/component/show', [CarController::class, 'getComponents']);
Route::get('car/new/show', [CarController::class, 'getNew']);
Route::get('car/promo/show', [CarPromoController::class, 'showPromo']);
Route::get('car/preview/{slug}/{carId}', [CarController::class, 'previewCar']);
Route::post('car/filter/show', [CarController::class, 'filter']);
Route::post('car/promo/filter/show', [CarPromoController::class, 'filter']);
Route::get('blog/show', [BlogController::class, 'viewSample']);
Route::get('blog/sample/show', [BlogController::class, 'viewSample']);

Route::get('testimonial/show', [TestimonyController::class, 'show']);
Route::get('highlight/show', [LandingController::class, 'hlShow']);
Route::get('slider/show', [LandingController::class, 'sliderShow']);
// company
Route::get('company/profile/show', [LandingController::class, 'getCompanyProfile']);
Route::middleware('auth:sanctum')->group(function () {
    // Routes for BrandController
    Route::post('logout', [AuthController::class, 'logout']);
    Route::resource('brands', BrandController::class);
    // master data
    Route::get('brankas/view', [MasterDataController::class, 'brankasLocationView']);
    Route::post('brankas/store', [MasterDataController::class, 'brankasLocationStore']);
    Route::post('brankas/update/{brankasId}', [MasterDataController::class, 'brankasLocationUpdate']);
});
Route::post('brand/store', [MasterDataController::class, 'merkStore']);
