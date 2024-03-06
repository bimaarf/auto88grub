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
Route::get('car/recomended/show', [CarController::class, 'getRecomended']);
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
    // Route::controller(MasterDataController::class)->group(function () {
    // });
    Route::group(['prefix' => 'brankas'], function () {
        Route::get('/view', [MasterDataController::class, 'brankasLocationView']);
        Route::post('/store', [MasterDataController::class, 'brankasLocationStore']);
        Route::post('/update/{brankasId}', [MasterDataController::class, 'brankasLocationUpdate']);
    });
    Route::group(['prefix' => 'coordinate'], function () {

        Route::get('view', [MasterDataController::class, 'carLocationView']);
        Route::post('store', [MasterDataController::class, 'carLocationStore']);
        Route::post('update/{locaId}', [MasterDataController::class, 'carLocationUpdate']);
    });
    Route::group(['prefix' => 'brand'], function () {
        Route::get('/view', [MasterDataController::class, 'brandView']);
        Route::post('/store', [MasterDataController::class, 'brandStore']);
        Route::post('/update/{brandId}', [MasterDataController::class, 'brandUpdate']);
    });
    Route::group(['prefix' => 'model'], function () {
        Route::get('/view', [MasterDataController::class, 'modelView']);
        Route::post('/store', [MasterDataController::class, 'modelStore']);
        Route::post('/update/{modelId}', [MasterDataController::class, 'modelUpdate']);
    });
    Route::group(['prefix' => 'type'], function () {
        Route::get('/view', [MasterDataController::class, 'typeView']);
        Route::post('/store', [MasterDataController::class, 'typeStore']);
        Route::post('/update/{typeId}', [MasterDataController::class, 'typeUpdate']);
    });
    Route::group(['prefix' => 'kind'], function () {
        Route::get('/view', [MasterDataController::class, 'kindView']);
        Route::post('/store', [MasterDataController::class, 'kindStore']);
        Route::post('/update/{kindId}', [MasterDataController::class, 'kindUpdate']);
    });
    Route::group(['prefix' => 'cylinder'], function () {
        Route::get('/view', [MasterDataController::class, 'cylinderView']);
        Route::post('/store', [MasterDataController::class, 'cylinderStore']);
        Route::post('/update/{cylinderId}', [MasterDataController::class, 'cylinderUpdate']);
    });
    Route::group(['prefix' => 'transmission'], function () {
        Route::get('/view', [MasterDataController::class, 'transmissionView']);
        Route::post('/store', [MasterDataController::class, 'transmissionStore']);
        Route::post('/update/{transmissionId}', [MasterDataController::class, 'transmissionUpdate']);
    });
    Route::group(['prefix' => 'series'], function () {
        Route::get('/view', [MasterDataController::class, 'seriesView']);
        Route::post('/store', [MasterDataController::class, 'seriesStore']);
        Route::post('/update/{seriesId}', [MasterDataController::class, 'seriesUpdate']);
    });
    Route::group(['prefix' => 'gear'], function () {
        Route::get('/view', [MasterDataController::class, 'gearView']);
        Route::post('/store', [MasterDataController::class, 'gearStore']);
        Route::post('/update/{gearId}', [MasterDataController::class, 'gearUpdate']);
    });
    Route::group(['prefix' => 'fuel'], function () {
        Route::get('/view', [MasterDataController::class, 'fuelView']);
        Route::post('/store', [MasterDataController::class, 'fuelStore']);
        Route::post('/update/{fuelId}', [MasterDataController::class, 'fuelUpdate']);
    });
    Route::group(['prefix' => 'color'], function () {
        Route::get('/view', [MasterDataController::class, 'colorView']);
        Route::post('/store', [MasterDataController::class, 'colorStore']);
        Route::post('/update/{colorId}', [MasterDataController::class, 'colorUpdate']);
    });
});
Route::get('/modelq/view', [MasterDataController::class, 'modelView']);
Route::get('/typeq/view', [MasterDataController::class, 'typeView']);
Route::get('/kindq/view', [MasterDataController::class, 'kindView']);
Route::get('/transmissionq/view', [MasterDataController::class, 'transmissionView']);
Route::get('/seriesq/view', [MasterDataController::class, 'seriesView']);
Route::get('/gearq/view', [MasterDataController::class, 'gearView']);
Route::get('/fuelq/view', [MasterDataController::class, 'fuelView']);
Route::get('/colorq/view', [MasterDataController::class, 'colorView']);
