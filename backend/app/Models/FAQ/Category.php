<?php

namespace App\Models\FAQ;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Spatie\MediaLibrary\HasMedia;
use Spatie\MediaLibrary\InteractsWithMedia;

class Category extends Model implements HasMedia
{
    use HasFactory;
    use InteractsWithMedia;

    /**
     * @var string
     */
    protected $table = 'faq_categories';
    protected $fillable = ['name'];
    /**
     * @var array<string, string>
     */

    public function questions(): HasMany
    {
        return $this->hasMany(Question::class, 'faq_category_id');
    }
}
