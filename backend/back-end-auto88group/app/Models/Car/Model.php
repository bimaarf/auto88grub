<?php

namespace App\Models\Car;

use App\Models\Car\Brand;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model as EloquentModel;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Spatie\Tags\HasTags;

class Model extends EloquentModel
{
    use HasFactory;
    use HasTags;

    /**
     * @var string
     */
    protected $table = 'car_models';

    /**
     * @var array<string, string>
     */

    public function brand(): BelongsTo
    {
        return $this->belongsTo(Brand::class, 'car_brand_id');
    }

    public function types(): HasMany
    {
        return $this->hasMany(Type::class, 'car_model_id');
    }
}
