<?php

namespace App\Models\Car;

use App\Models\Car\Brand;
use App\Models\Car\Model as CarModel;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model as EloquentModel;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Spatie\Tags\HasTags;

class Type extends EloquentModel
{
    use HasFactory;
    use HasTags;

    /**
     * @var string
     */
    protected $table = 'car_types';
    protected $fillable = ['car_brand_id', 'car_model_id', 'name'];
    /**
     * @var array<string, string>
     */

    public function brand(): BelongsTo
    {
        return $this->belongsTo(Brand::class, 'car_brand_id');
    }

    public function model(): BelongsTo
    {
        return $this->belongsTo(CarModel::class, 'car_model_id');
    }
    public function getCreatedAtAttribute()
    {
        return \Carbon\Carbon::parse($this->attributes['created_at'])
            ->format('d-m-Y - H:i');
    }
}
