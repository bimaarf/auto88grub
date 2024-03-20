<?php

namespace App\Models\Main;

use App\Models\Car\Row;
use App\Models\Car\Fuel;
use App\Models\Car\Gear;
use App\Models\Car\Kind;
use App\Models\Car\Type;
use App\Models\Car\Year;
use App\Models\Car\Brand;
use App\Models\Car\Color;
use App\Models\Car\Series;
use App\Models\Car\Cylinder;
use App\Models\Photo\Outdoor;
use App\Models\Photo\Official;
use App\Models\Photo\Original;
use App\Models\Car\Transmission;
use Spatie\MediaLibrary\HasMedia;
use App\Models\Car\Model as CarModel;
use Illuminate\Database\Eloquent\Model;
use App\Models\Location\Car as LocationCar;
use Spatie\MediaLibrary\InteractsWithMedia;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Car extends Model implements HasMedia
{
    use HasFactory;
    use InteractsWithMedia;

    /**
     * @var string
     */
    protected $table = 'cars';
    protected $fillable = ['title', 'description', 'price'];
    public function promos(): HasMany
    {
        return $this->hasMany(Promo::class, 'car_id');
    }

    public function documents(): HasMany
    {
        return $this->hasMany(Document::class, 'car_id');
    }

    public function officials(): HasMany
    {
        return $this->hasMany(Official::class, 'car_id');
    }

    public function originals(): HasMany
    {
        return $this->hasMany(Original::class, 'car_id');
    }

    public function outdoors(): HasMany
    {
        return $this->hasMany(Outdoor::class, 'car_id');
    }

    public function location(): BelongsTo
    {
        return $this->belongsTo(LocationCar::class, 'car_location_id');
    }

    public function brand(): BelongsTo
    {
        return $this->belongsTo(Brand::class, 'car_brand_id');
    }

    public function model(): BelongsTo
    {
        return $this->belongsTo(CarModel::class, 'car_model_id');
    }

    public function type(): BelongsTo
    {
        return $this->belongsTo(Type::class, 'car_type_id');
    }

    public function kind(): BelongsTo
    {
        return $this->belongsTo(Kind::class, 'car_kind_id');
    }

    public function cylinder(): BelongsTo
    {
        return $this->belongsTo(Cylinder::class, 'car_cylinder_id');
    }

    public function transmission(): BelongsTo
    {
        return $this->belongsTo(Transmission::class, 'car_transmission_id');
    }

    public function series(): BelongsTo
    {
        return $this->belongsTo(Series::class, 'car_series_id');
    }

    public function gear(): BelongsTo
    {
        return $this->belongsTo(Gear::class, 'car_gear_id');
    }

    public function fuel(): BelongsTo
    {
        return $this->belongsTo(Fuel::class, 'car_fuel_id');
    }

    public function color(): BelongsTo
    {
        return $this->belongsTo(Color::class, 'car_color_id');
    }

    public function row(): BelongsTo
    {
        return $this->belongsTo(Row::class, 'car_row_id');
    }

    public function year(): BelongsTo
    {
        return $this->belongsTo(Year::class, 'car_year_id');
    }
}
