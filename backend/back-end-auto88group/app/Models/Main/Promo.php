<?php

namespace App\Models\Main;

use App\Models\Other\Leasing;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Spatie\MediaLibrary\HasMedia;
use Spatie\MediaLibrary\InteractsWithMedia;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Promo extends Model implements HasMedia
{
    use HasFactory;
    use InteractsWithMedia;

    /**
     * @var string
     */
    protected $table = 'car_promos';

    public function car(): BelongsTo
    {
        return $this->belongsTo(Car::class, 'car_id');
    }

    public function leasing(): BelongsTo
    {
        return $this->belongsTo(Leasing::class, 'leasing_id');
    }
}
