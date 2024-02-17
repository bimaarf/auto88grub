<?php

namespace App\Models\Area;

use App\Models\Area\City;
use App\Models\Area\Province;
use App\Models\Area\Subdistrict;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model as EloquentModel;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Spatie\Tags\HasTags;

class District extends EloquentModel
{
    use HasFactory;
    use HasTags;

    /**
     * @var string
     */
    protected $table = 'area_districts';

    /**
     * @var array<string, string>
     */

    public function province(): BelongsTo
    {
        return $this->belongsTo(Province::class, 'area_province_id');
    }

    public function city(): BelongsTo
    {
        return $this->belongsTo(City::class, 'area_city_id');
    }

    public function subdistricts(): HasMany
    {
        return $this->hasMany(Subdistrict::class, 'area_district_id');
    }
}
