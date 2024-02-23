<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class HighLight extends Model
{
    use HasFactory;
    protected $table = 'tb_highlight';
    protected $fillable = ['router', 'title', 'subtitle'];
}
