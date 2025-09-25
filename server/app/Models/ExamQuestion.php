<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ExamQuestion extends Model
{
    /** @use HasFactory<\Database\Factories\ExamQuestionFactory> */
    use HasFactory;
    protected $fillable = [
        'exam_paper_id',
        'type',
        'content',
        'marks',
        'explanation',
        'images',
        'options',
        'correct',
        'status',
    ];
    protected $casts = [
        'marks'   => 'float',
        'options' => 'array',
        'correct' => 'array',
        'images'  => 'array',
    ];
    protected $hidden = ['created_at', 'updated_at'];

    public function examPaper()
    {
        return $this->belongsTo(ExamPaper::class, 'exam_paper_id');
    }
}
