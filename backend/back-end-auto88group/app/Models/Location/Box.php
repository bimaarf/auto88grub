<?php

namespace App\Models\Location;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Spatie\MediaLibrary\HasMedia;
use Spatie\MediaLibrary\InteractsWithMedia;

class Box extends Model implements HasMedia
{
    use HasFactory;
    use InteractsWithMedia;

    /**
     * @var string
     */
    protected $table = 'box_locations';
}
