<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ExamAttempt extends Model
{

    use HasFactory;
    protected $fillable = [
        'exam_paper_id',
        'user_id',
        'score',
        'violation_count',
        'time_spent',
        'details',
        'started_at',
        'submitted_at',
        'status',
        'note',
    ];
    protected $casts = [
        'score'        => 'float',
        'details'      => 'array',
        'started_at'   => 'datetime',
        'submitted_at' => 'datetime',
    ];
    public function user()
    {
        return $this->belongsTo(User::class);
    }
    public function paper()
    {
        return $this->belongsTo(ExamPaper::class);
    }

    protected static function booted()
    {
        // Tự động tính thời gian làm bài thi khi thực hiện thành động nộp bài (chỉ áp dụng khi bài thi đang in_progress)
        static::updating(function ($attempt) {
            if (!$attempt->submitted_at && $attempt->getOriginal('status') === 'in_progress' && in_array($attempt->status, ['submitted', 'detected'])) {
                $attempt->time_spent   = $attempt->started_at->diffInSeconds(now());
                $attempt->submitted_at = now();
            }
        });
    }
}
