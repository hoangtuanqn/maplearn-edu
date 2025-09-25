<?php

namespace App\Models;

use App\Helpers\CommonHelper;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Auth;

class ExamPaper extends Model
{
    /** @use HasFactory<\Database\Factories\ExamPaperFactory> */
    use HasFactory;
    protected $fillable = [
        'exam_category',
        'subject',
        'grade_level',
        'user_id',
        'title',
        'slug',
        'province',
        'difficulty',
        'exam_type',
        'max_score',
        'pass_score',
        'duration_minutes',
        'anti_cheat_enabled',
        'max_violation_attempts',
        'status',
        'start_time',
        'end_time',
    ];
    protected $casts = [
        'max_score'              => 'float',
        'pass_score'             => 'float',
        'duration_minutes'       => 'integer',
        'anti_cheat_enabled'     => 'boolean',
        'max_violation_attempts' => 'integer',
        'status'                 => 'boolean',
        'start_time'             => 'datetime',
        'end_time'               => 'datetime'
    ];
    protected $appends = [
        'is_in_progress', // Kiểm tra người dùng có đang làm bài thi hay không
        'question_count',
        'total_attempt_count',  // tổng số lượt thi của đề thi
        'attempt_count', // số lượt thi của user đang gọi request
    ];

    public function getRouteKeyName()
    {
        return 'slug';
    }

    // questions
    public function questions()
    {
        return $this->hasMany(ExamQuestion::class);
    }
    public function examAttempts()
    {
        return $this->hasMany(ExamAttempt::class);
    }

    // Check xem người dùng có đang trong quá trình làm bài thi hay không
    public function getIsInProgressAttribute()
    {
        $user = Auth::user();
        if (!$user) {
            return false;
        }
        return $user->examAttempts()->where('exam_paper_id', $this->id)->where('status', 'in_progress')->exists();
    }

    // Đếm số lượng câu hỏi
    public function getQuestionCountAttribute()
    {
        return $this->questions()->count();
    }
    public function getTotalAttemptCountAttribute()
    {
        return $this->examAttempts()->count();
    }
    public function getAttemptCountAttribute()
    {
        $user = Auth::user();
        if (!$user) {
            return 0;
        }
        return $user->examAttempts()->where('exam_paper_id', $this->id)->count();
    }

    // Các sự kiện event
    protected static function booted()
    {
        static::creating(function ($post) {
            if (empty($post->slug) && isset($post->title)) {
                $post->slug = CommonHelper::generateSlug($post->title);
            }
        });
    }
}
