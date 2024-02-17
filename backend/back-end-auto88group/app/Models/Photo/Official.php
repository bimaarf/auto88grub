<?php

namespace App\Models\Photo;

use App\Models\Main\Car;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Spatie\MediaLibrary\HasMedia;
use Spatie\MediaLibrary\InteractsWithMedia;

class Official extends Model implements HasMedia
{
    use HasFactory;
    use InteractsWithMedia;

    /**
     * @var string
     */
    protected $table = 'photos_car_official';

    public function car(): BelongsTo
    {
        return $this->belongsTo(Car::class, 'car_id');
    }
}
