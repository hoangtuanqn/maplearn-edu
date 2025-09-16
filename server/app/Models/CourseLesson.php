<?php

namespace App\Models;

use App\Observers\CourseLessonObserver;
use Illuminate\Database\Eloquent\Attributes\ObservedBy;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

#[ObservedBy([CourseLessonObserver::class])]
class CourseLesson extends Model
{
    /** @use HasFactory<\Database\Factories\CourseLessonFactory> */
    use HasFactory;
    protected $fillable = [
        'chapter_id',
        'title',
        'content',
        'video_url',
        'position',
        'duration',
        'is_free',
    ];
    protected $casts = [
        'is_free' => 'boolean',
    ];
    public function getRouteKeyName()
    {
        return 'slug';
    }
    public function chapter()
    {
        return $this->belongsTo(CourseChapter::class, 'chapter_id');
    }
}
