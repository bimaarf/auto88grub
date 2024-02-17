<?php

namespace App\Models\Other;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Spatie\MediaLibrary\HasMedia;
use Spatie\MediaLibrary\InteractsWithMedia;

class CustomerService extends Model implements HasMedia
{
    use HasFactory;
    use InteractsWithMedia;

    /**
     * @var string
     */
    protected $table = 'customer_services';
}
