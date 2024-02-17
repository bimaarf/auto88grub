<?php

namespace App\Models\Description;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Spatie\MediaLibrary\HasMedia;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Spatie\MediaLibrary\InteractsWithMedia;

class Detail extends Model implements HasMedia
{
    use HasFactory;
    use InteractsWithMedia;

    /**
     * @var string
     */
    protected $table = 'description_details';

    /**
     * @var array<string, string>
     */

    public function category(): BelongsTo
    {
        return $this->belongsTo(Category::class, 'description_category_id');
    }
}
