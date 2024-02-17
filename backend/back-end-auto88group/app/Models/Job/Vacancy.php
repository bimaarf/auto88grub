<?php

namespace App\Models\Job;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Spatie\MediaLibrary\HasMedia;
use Spatie\MediaLibrary\InteractsWithMedia;

class Vacancy extends Model implements HasMedia
{
    use HasFactory;
    use InteractsWithMedia;

    /**
     * @var string
     */
    protected $table = 'job_vacancies';

    /**
     * @var array<string, string>
     */

    public function applications(): HasMany
    {
        return $this->hasMany(Application::class, 'job_vacancy_id');
    }
}
