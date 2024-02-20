<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

use App\Http\Controllers\API\Auth\AuthController;
use App\Http\Controllers\API\Car\BrandController;
use App\Http\Controllers\API\Pages\BlogController;
use App\Http\Controllers\API\Pages\CarController;
use App\Http\Controllers\API\Pages\CarPromoController;

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
Route::get('car/promo/show', [CarPromoController::class, 'showPromo']);
Route::get('car/preview/{slug}/{carId}', [CarController::class, 'previewCar']);
Route::get('blog/show', [BlogController::class, 'viewSample']);
Route::get('blog/sample/show', [BlogController::class, 'viewSample']);

// Routes requiring authentication with Sanctum
Route::middleware('auth:sanctum')->group(function () {
    // Routes for BrandController
    Route::resource('brands', BrandController::class);
});
