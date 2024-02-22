<?php

namespace App\Models\Main;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Spatie\MediaLibrary\HasMedia;
use Spatie\MediaLibrary\InteractsWithMedia;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Testimonial extends Model implements HasMedia
{
    use HasFactory;
    use InteractsWithMedia;

    /**
     * @var string
     */
    protected $table = 'car_testimonials';
    // public function getTestimoniAtAttribute()
    // {
    //     return \Carbon\Carbon::parse($this->attributes['testimoni_at'])
    //         ->format('d M Y - H:i');
    // }
    public function car(): BelongsTo
    {
        return $this->belongsTo(Car::class, 'car_id');
    }
}
