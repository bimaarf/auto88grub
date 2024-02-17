<?php

namespace App\Models\Other;

use App\Models\Car\Promo;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Spatie\MediaLibrary\HasMedia;
use Spatie\MediaLibrary\InteractsWithMedia;

class Leasing extends Model implements HasMedia
{
    use HasFactory;
    use InteractsWithMedia;

    /**
     * @var string
     */
    protected $table = 'other_leasings';

    public function promos(): HasMany
    {
        return $this->hasMany(Promo::class, 'leasing_id');
    }
}
