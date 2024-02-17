<?php

namespace App\Models\Main;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Spatie\MediaLibrary\HasMedia;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Spatie\MediaLibrary\InteractsWithMedia;

class Ecommerce extends Model implements HasMedia
{
    use HasFactory;
    use InteractsWithMedia;

    /**
     * @var string
     */
    protected $table = 'car_ecommerces';


    public function car(): BelongsTo
    {
        return $this->belongsTo(Car::class, 'car_id');
    }
}
