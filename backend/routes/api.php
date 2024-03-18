<?php

use App\Http\Controllers\API\Auth\AuthController;
use App\Http\Controllers\API\Car\BrandController;
use App\Http\Controllers\API\Car\BrankasController;
use App\Http\Controllers\API\Car\CarController;
use App\Http\Controllers\API\Car\ColorController;
use App\Http\Controllers\API\Car\CoordinateController;
use App\Http\Controllers\API\Car\CylinderController;
use App\Http\Controllers\API\Car\FuelController;
use App\Http\Controllers\API\Car\GearController;
use App\Http\Controllers\API\Car\KindController;
use App\Http\Controllers\API\Car\ModelController;
use App\Http\Controllers\API\Car\SeriesController;
use App\Http\Controllers\API\Car\TransmissionController;
use App\Http\Controllers\API\Car\TypeController;
use App\Http\Controllers\API\Pages\BlogController;
use App\Http\Controllers\API\Pages\CareerController;
use App\Http\Controllers\API\Pages\CarPromoController;
use App\Http\Controllers\API\Pages\FAQController;
use App\Http\Controllers\API\Pages\SliderController;
use App\Http\Controllers\API\Pages\TestimonyController;
use App\Http\Controllers\API\Pages\VacancyController;
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

Route::post('login', [AuthController::class, 'login']);
// Route::controller(AuthController::class)->group(function () {
//     Route::post('register',  'register');
// });

Route::group(['prefix' => 'car'], function () {
    Route::controller(KindController::class)->group(function () {
        Route::get('/kind/show/', 'view');
    });
    Route::controller(CarController::class)->group(function () {
        Route::get('/show', 'showCar');
        Route::get('/recomended/show', 'getRecomended');
        Route::get('/component/show', 'getComponents');
        Route::get('/new/show', 'getNew');
        Route::get('/preview/{slug}/{carId}', 'previewCar');
        Route::post('/filter/show', 'filter');
    });
    Route::group(['prefix' => 'promo'], function () {
        Route::controller(CarPromoController::class)->group(function () {
            Route::get('show', 'showPromo');
            Route::post('filter/show', 'filter');
        });
    });
});

Route::group(['prefix' => 'blog'], function () {
    Route::controller(BlogController::class)->group(function () {
        Route::get('show',  'viewSample');
        Route::get('sample/show',  'viewSample');
    });
});

Route::controller(TestimonyController::class)->group(function () {
    Route::get('testimonial/show', 'show');
});
Route::controller(VacancyController::class)->group(function () {
    Route::get('vacancy/show/{jobId}', 'show');
    Route::post('vacancy/application/{applyId}', 'apply');
});
Route::controller(LandingController::class)->group(function () {
    Route::get('highlight/show', 'hlShow');
    Route::get('slider/show', 'sliderShow');
    Route::get('popup/show', 'popupShow');
    Route::get('company/profile/show', 'getCompanyProfile');
});

Route::middleware('auth:sanctum')->group(function () {

    Route::post('logout', [AuthController::class, 'logout']);
    Route::group(['prefix' => 'slider'], function () {
        Route::controller(SliderController::class)->group(function () {
            Route::get('/category/view', 'categView');
            Route::get('/view', 'view');
            Route::get('/view', 'view');
            Route::post('/store', 'store');
            Route::post('/update/{sliderId}', 'update');
        });
    });
    Route::group(['prefix' => 'question'], function () {
        Route::controller(FAQController::class)->group(function () {
            Route::get('/category/view', 'categView');
            Route::get('/view', 'view');
            Route::post('/store', 'store');
            Route::post('/update/{questId}', 'update');
        });
    });

    Route::group(['prefix' => 'vacancy'], function () {
        Route::controller(CareerController::class)->group(function () {
            Route::get('/category/view', 'categView');
            Route::get('/view', 'view');
            Route::post('/store', 'store');
            Route::post('/update/{questId}', 'update');
        });
    });
    Route::group(['prefix' => 'brankas'], function () {
        Route::controller(BrankasController::class)->group(function () {
            Route::get('/view', 'view');
            Route::post('/store', 'store');
            Route::post('/update/{brandId}', 'update');
            Route::post('/delete/{brandId}', 'delete');
        });
    });
    Route::group(['prefix' => 'coordinate'], function () {
        Route::controller(CoordinateController::class)->group(function () {
            Route::get('/view/', 'view');
            Route::post('/store', 'store');
            Route::post('/update/{locaId}', 'update');
        });
    });
    Route::group(['prefix' => 'brand'], function () {
        Route::controller(BrandController::class)->group(function () {
            Route::get('/view/', 'view');
            Route::post('/store', 'store');
            Route::post('/update/{brandId}', 'update');
            Route::post('/delete/{brandId}', 'delete');
        });
    });
    Route::group(['prefix' => 'model'], function () {
        Route::controller(ModelController::class)->group(function () {
            Route::get('/view/', 'view');
            Route::post('/store', 'store');
            Route::post('/update/{modelId}', 'update');
            Route::post('/delete/{modelId}', 'delete');
        });
    });
    Route::group(['prefix' => 'type'], function () {
        Route::controller(TypeController::class)->group(function () {
            Route::get('/view/', 'view');
            Route::post('/store', 'store');
            Route::post('/update/{typeId}', 'update');
            Route::post('/delete/{typeId}', 'delete');
        });
    });
    Route::group(['prefix' => 'kind'], function () {
        Route::controller(KindController::class)->group(function () {
            Route::get('/view/', 'view');
            Route::post('/store', 'store');
            Route::post('/update/{kindId}', 'update');
            Route::post('/delete/{kindId}', 'delete');
        });
    });
    Route::group(['prefix' => 'cylinder'], function () {
        Route::controller(CylinderController::class)->group(function () {
            Route::get('/view/', 'view');
            Route::post('/store', 'store');
            Route::post('/update/{cylinderId}', 'update');
            Route::post('/delete/{cylinderId}', 'delete');
        });
    });
    Route::group(['prefix' => 'transmission'], function () {
        Route::controller(TransmissionController::class)->group(function () {
            Route::get('/view/', 'view');
            Route::post('/store', 'store');
            Route::post('/update/{transId}', 'update');
            Route::post('/delete/{transId}', 'delete');
        });
    });
    Route::group(['prefix' => 'series'], function () {
        Route::controller(SeriesController::class)->group(function () {
            Route::get('/view/', 'view');
            Route::post('/store', 'store');
            Route::post('/update/{seriesId}', 'update');
            Route::post('/delete/{seriesId}', 'delete');
        });
    });
    Route::group(['prefix' => 'gear'], function () {
        Route::controller(GearController::class)->group(function () {
            Route::get('/view/', 'view');
            Route::post('/store', 'store');
            Route::post('/update/{gearId}', 'update');
            Route::post('/delete/{gearId}', 'delete');
        });
    });
    Route::group(['prefix' => 'fuel'], function () {
        Route::controller(FuelController::class)->group(function () {
            Route::get('/view/', 'view');
            Route::post('/store', 'store');
            Route::post('/update/{fuelId}', 'update');
            Route::post('/delete/{fuelId}', 'delete');
        });
    });
    Route::group(['prefix' => 'color'], function () {
        Route::controller(ColorController::class)->group(function () {
            Route::get('/view/', 'view');
            Route::post('/store', 'store');
            Route::post('/update/{colorId}', 'update');
            Route::post('/delete/{colorId}', 'delete');
        });
    });
    // --------------------------------------------
});
