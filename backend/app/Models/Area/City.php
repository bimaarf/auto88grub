<?php

namespace App\Models\Area;

use App\Models\Area\Province;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model as EloquentModel;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Spatie\Tags\HasTags;

class City extends EloquentModel
{
    use HasFactory;
    use HasTags;

    /**
     * @var string
     */
    protected $table = 'area_cities';

    /**
     * @var array<string, string>
     */

    public function province(): BelongsTo
    {
        return $this->belongsTo(Province::class, 'area_province_id');
    }

    public function districts(): HasMany
    {
        return $this->hasMany(District::class, 'area_city_id');
    }
}
