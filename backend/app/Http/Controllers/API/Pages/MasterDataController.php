<?php

namespace App\Http\Controllers\API\Pages;

use App\Http\Controllers\Controller;
use App\Models\Car\Brand;
use App\Models\Car\Color;
use App\Models\Car\Cylinder;
use App\Models\Car\Fuel;
use App\Models\Car\Gear;
use App\Models\Car\Kind;
use App\Models\Car\Model;
use App\Models\Car\Series;
use App\Models\Car\Transmission;
use App\Models\Car\Type;
use App\Models\Location\Box;
use App\Models\Location\Car;
use Illuminate\Http\Request;

class MasterDataController extends Controller
{
    public function brankasLocationView()
    {
        return response()->json(['data' => Box::all()], 200);
    }
    public function brankasLocationStore(Request $request)
    {
        try {
            $box = new Box();
            $box->name = $request->name;
            $box->save();
            return response()->json(['status' => 200], 200);
        } catch (\Throwable $th) {
            return response()->json(['status' => 201], 201);
        }
    }
    public function brankasLocationUpdate(Request $request, $brankasId)
    {
        try {
            $box =  Box::find($brankasId);
            $box->name = $request->name;
            $box->update();
            return response()->json(['status' => 200], 200);
        } catch (\Throwable $th) {
            return response()->json(['status' => 201], 201);
        }
    }
    public function brankasLocationDelete($brankasId)
    {
        try {
            $box =  Box::find($brankasId);
            $box->delete();
            return response()->json(['status' => 200], 200);
        } catch (\Throwable $th) {
            return response()->json(['status' => 201], 201);
        }
    }
    public function carLocationView(Request $request)
    {
        return response()->json(['data' => Car::all()], 200);
    }
    public function carLocationStore(Request $request)
    {
        try {
            $car = $request->all();
            $car = new Car($car);
            $car->save();
            return response()->json(['status' => 200], 200);
        } catch (\Throwable $th) {
            return response()->json(['status' => 201], 201);
        }
    }
    public function carLocationUpdate(Request $request, $locaId)
    {
        try {
            $data = Car::find($locaId);
            if (!$data) {
                return response()->json(['error' => 'Car location not found'], 404);
            }

            $data->name = $request->name;
            $data->latitude = $request->latitude;
            $data->longitude = $request->longitude;
            $data->is_unlimited = $request->is_unlimited;
            $data->limitation = $request->limitation;
            $data->is_visible = $request->is_visible;
            $data->update();

            return response()->json(['status' => 200], 200);
        } catch (\Throwable $th) {
            return response()->json(['status' => 500, 'error' => $th->getMessage()], 500);
        }
    }
    public function merkStore(Request $request)
    {
        try {
            $car = $request->all();
            $car = new Brand($car);
            $car->save();
            return response()->json(['status' => 200], 200);
        } catch (\Throwable $th) {
            return response()->json(['status' => 201], 201);
        }
    }
    public function modelView()
    {
        try {
            return response()->json(['data' => Model::all()], 200);
        } catch (\Throwable $th) {
            return response()->json(['status' => 201], 201);
        }
    }
    public function modelStore(Request $request)
    {
        try {
            $data = $request->all();
            $data = new Model($data);
            $data->save();
            return response()->json(['status' => 200], 200);
        } catch (\Throwable $th) {
            return response()->json(['status' => 201], 201);
        }
    }
    public function modelUpdate(Request $request, $modelId)
    {
        try {
            $data = Model::find($modelId);;
            $data->car_brand_id = $request->car_brand_id;
            $data->name = $request->name;
            $data->save();
            return response()->json(['status' => 200], 200);
        } catch (\Throwable $th) {
            return response()->json(['status' => 201], 201);
        }
    }
    public function modelDelete($modelId)
    {
        try {
            $data = Model::find($modelId);;
            $data->delete();
            return response()->json(['status' => 200], 200);
        } catch (\Throwable $th) {
            return response()->json(['status' => 201], 201);
        }
    }
    public function typeView()
    {
        return response()->json(['data' => Type::all()]);
    }
    public function typeUpdate(Request $request, $typeId)
    {
        try {
            $data = Type::find($typeId);
            $data->car_brand_id = $request->car_brand_id;
            $data->car_model_id = $request->car_model_id;
            $data->name         = $request->name;
            $data->update();
            return response()->json(['status' => 200], 200);
        } catch (\Throwable $th) {
            return response()->json(['status' => 201], 201);
        }
    }
    public function typeDelete($typeId)
    {
        try {
            $data = Type::find($typeId);
            $data->delete();
            return response()->json(['status' => 200], 200);
        } catch (\Throwable $th) {
            return response()->json(['status' => 201], 201);
        }
    }
    public function kindView()
    {
        return response()->json(['data' => Kind::all()]);
    }
    // public function kindStore(Request $request)
    // {
    //     try {
    //         $data = new Kind();
    //         $data->name  = $request->name;
    //         $data->image = $request->image;
    //         $data->save();
    //         return response()->json(['status' => 200], 200);
    //     } catch (\Throwable $th) {
    //         return response()->json(['status' => 201], 201);
    //     }
    // }
    // public function kindUpdate(Request $request, $kindId)
    // {
    //     try {
    //         $data = Kind::find($kindId);
    //         $data->name  = $request->name;
    //         $data->image = $request->image;
    //         $data->update();
    //         return response()->json(['status' => 200], 200);
    //     } catch (\Throwable $th) {
    //         return response()->json(['status' => 201], 201);
    //     }
    // }
    public function kindDelete($kindId)
    {
        try {
            $data = Kind::find($kindId);
            $data->delete();
            return response()->json(['status' => 200], 200);
        } catch (\Throwable $th) {
            return response()->json(['status' => 201], 201);
        }
    }
    public function cylinderView()
    {
        return response()->json(['data' => Cylinder::all()]);
    }
    public function cylinderStore(Request $request)
    {
        try {
            $data = new Cylinder();
            $data->volume = $request->volume;
            $data->save();
            return response()->json(['status' => 200], 200);
        } catch (\Throwable $th) {
            return response()->json(['status' => 201], 201);
        }
    }
    public function cylinderUpdate(Request $request, $cylinderId)
    {
        try {
            $data = Cylinder::find($cylinderId);
            $data->volume = $request->volume;
            $data->update();
            return response()->json(['status' => 200], 200);
        } catch (\Throwable $th) {
            return response()->json(['status' => 201], 201);
        }
    }
    public function cylinderDelete($cylinderId)
    {
        try {
            $data = Cylinder::find($cylinderId);
            $data->delete();
            return response()->json(['status' => 200], 200);
        } catch (\Throwable $th) {
            return response()->json(['status' => 201], 201);
        }
    }
    public function transmitionView()
    {
        return response()->json(['data' => Transmission::all()]);
    }
    public function transmitionStore(Request $request)
    {
        try {
            $data = new Transmission();
            $data->name = $request->name;
            $data->save();
            return response()->json(['status' => 200], 200);
        } catch (\Throwable $th) {
            return response()->json(['status' => 201], 201);
        }
    }
    public function transmitionUpdate(Request $request, $transId)
    {
        try {
            $data = Transmission::find($transId);
            $data->name = $request->name;
            $data->save();
            return response()->json(['status' => 200], 200);
        } catch (\Throwable $th) {
            return response()->json(['status' => 201], 201);
        }
    }
    public function transmitionDelete($transId)
    {
        try {
            $data = Transmission::find($transId);
            $data->delete();
            return response()->json(['status' => 200], 200);
        } catch (\Throwable $th) {
            return response()->json(['status' => 201], 201);
        }
    }
    public function seriesView()
    {
        return response()->json(['data' => Series::all()]);
    }
    public function seriesStore(Request $request)
    {
        try {
            $data = new Series();
            $data->name = $request->name;
            $data->save();
            return response()->json(['status' => 200], 200);
        } catch (\Throwable $th) {
            return response()->json(['status' => 201], 201);
        }
    }
    public function seriesUpdate(Request $request, $seriesId)
    {
        try {
            $data = Series::find($seriesId);
            $data->name = $request->name;
            $data->save();
            return response()->json(['status' => 200], 200);
        } catch (\Throwable $th) {
            return response()->json(['status' => 201], 201);
        }
    }
    public function seriesDelete($seriesId)
    {
        try {
            $data = Series::find($seriesId);
            $data->delete();
            return response()->json(['status' => 200], 200);
        } catch (\Throwable $th) {
            return response()->json(['status' => 201], 201);
        }
    }
    public function gearView()
    {
        return response()->json(['data' => Gear::all()]);
    }
    public function gearStore(Request $request)
    {
        try {
            $data = new Gear();
            $data->name = $request->name;
            $data->save();
            return response()->json(['stauts' => 200], 200);
        } catch (\Throwable $th) {
            return response()->json(['stauts' => 201], 201);
        }
    }
    public function gearUpdate(Request $request, $gearId)
    {
        try {
            $data = Gear::find($gearId);
            $data->name = $request->name;
            $data->save();
            return response()->json(['stauts' => 200], 200);
        } catch (\Throwable $th) {
            return response()->json(['stauts' => 201], 201);
        }
    }
    public function gearDelete($gearId)
    {
        try {
            $data = Gear::find($gearId);
            $data->delete();
            return response()->json(['stauts' => 200], 200);
        } catch (\Throwable $th) {
            return response()->json(['stauts' => 201], 201);
        }
    }
    public function fuelView()
    {
        return response()->json(['status' => 200], 200);
    }
    public function fuelStore(Request $request)
    {
        try {
            $data = new Fuel();
            $data->name = $request->name;
            $data->save();
            return response()->json(['status' => 200], 200);
        } catch (\Throwable $th) {
            return response()->json(['status' => 201], 201);
        }
    }
    public function fuelUpdate(Request $request, $fuelId)
    {
        try {
            $data = Fuel::find($fuelId);
            $data->name = $request->name;
            $data->save();
            return response()->json(['status' => 200], 200);
        } catch (\Throwable $th) {
            return response()->json(['status' => 201], 201);
        }
    }
    public function fuelDelete($fuelId)
    {
        try {
            $data = Fuel::find($fuelId);
            $data->delete();
            return response()->json(['status' => 200], 200);
        } catch (\Throwable $th) {
            return response()->json(['status' => 201], 201);
        }
    }
    public function colorView()
    {
        return response()->json(['data' => Color::all()]);
    }
    public function colorStore(Request $request)
    {
        try {
            $data = new Color();
            $data->name = $request->name;
            $data->save();
            return response()->json(['status' => 200], 200);
        } catch (\Throwable $th) {
            return response()->json(['status' => 201], 201);
        }
    }
    public function colorUpdate(Request $request, $colorId)
    {
        try {
            $data = Color::find($colorId);
            $data->name = $request->name;
            $data->save();
            return response()->json(['status' => 200], 200);
        } catch (\Throwable $th) {
            return response()->json(['status' => 201], 201);
        }
    }
    public function colorDelete($colorId)
    {
        try {
            $data = Color::find($colorId);
            $data->delete();
            return response()->json(['status' => 200], 200);
        } catch (\Throwable $th) {
            return response()->json(['status' => 201], 201);
        }
    }
}
