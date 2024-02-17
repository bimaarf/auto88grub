<?php

namespace App\Models\Car;

use App\Models\Car\Model as CarModel;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Spatie\MediaLibrary\HasMedia;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Spatie\MediaLibrary\InteractsWithMedia;

class Brand extends Model implements HasMedia
{
    use HasFactory;
    use InteractsWithMedia;

    /**
     * @var string
     */
    protected $table = 'car_brands';

    public function models(): HasMany
    {
        return $this->hasMany(CarModel::class, 'car_brand_id');
    }
}
