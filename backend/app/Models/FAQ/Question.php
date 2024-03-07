<?php

namespace App\Models\FAQ;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Spatie\MediaLibrary\HasMedia;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Spatie\MediaLibrary\InteractsWithMedia;

class Question extends Model implements HasMedia
{
    use HasFactory;
    use InteractsWithMedia;

    /**
     * @var string
     */
    protected $table = 'faq_questions';
    /**
     * @var array<string, string>
     */

    public function category(): BelongsTo
    {
        return $this->belongsTo(Category::class, 'faq_category_id');
    }
}
