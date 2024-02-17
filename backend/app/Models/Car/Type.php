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
}
