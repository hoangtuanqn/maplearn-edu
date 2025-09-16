<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class CourseChapter extends Model
{
    /** @use HasFactory<\Database\Factories\CourseChapterFactory> */
    use HasFactory;
    protected $fillable = [
        'course_id',
        'title',
        'position',
    ];

    public function course()
    {
        return $this->belongsTo(Course::class);
    }
    // Lấy danh sách bài học trong chương và sort theo vị trí
    public function lessons()
    {
        return $this->hasMany(CourseLesson::class, 'chapter_id')->orderBy('position');
    }
}
