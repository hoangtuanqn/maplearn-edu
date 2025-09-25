<?php

namespace App\Filters\Course;

use App\Models\Course;
use Illuminate\Database\Eloquent\Builder;
use Spatie\QueryBuilder\Filters\Filter;

class ProgressRangeFilter implements Filter
{
    private $courseId;

    public function __construct($courseId = null)
    {
        $this->courseId = $courseId;
    }

    public function __invoke(Builder $query, $value, string $property)
    {
        // Lấy course ID từ constructor hoặc từ request
        $courseId = $this->courseId ?? request()->route('course')?->id;

        if (!$courseId) {
            return $query; // Không thể filter mà không biết course
        }

        // Lấy course và tổng số lesson
        $course = Course::find($courseId);
        if (!$course) {
            return $query;
        }

        $totalLessons = $course->lesson_count;
        if ($totalLessons <= 0) {
            return $query;
        }

        // Lấy lesson IDs của course
        $lessonIds = $course->lessons()->pluck('course_lessons.id');

        if ($lessonIds->isEmpty()) {
            return $query;
        }

        // Tính toán range dựa trên phần trăm
        switch ($value) {
            case '0-25':
                $minLessons = 0;
                $maxLessons = floor($totalLessons * 0.25);
                break;

            case '26-50':
                $minLessons = ceil($totalLessons * 0.26);
                $maxLessons = floor($totalLessons * 0.50);
                break;

            case '51-75':
                $minLessons = ceil($totalLessons * 0.51);
                $maxLessons = floor($totalLessons * 0.75);
                break;

            case '76-99':
                $minLessons = ceil($totalLessons * 0.76);
                $maxLessons = $totalLessons - 1; // Chưa hoàn thành hết
                break;

            case '100':
                $minLessons = $totalLessons;
                $maxLessons = $totalLessons; // Hoàn thành hết
                break;

            default:
                return $query;
        }

        // Đảm bảo minLessons không vượt quá maxLessons
        if ($minLessons > $maxLessons) {
            $minLessons = $maxLessons;
        }

        // Filter users dựa trên số lesson đã hoàn thành
        $lessonIdsString = implode(',', $lessonIds->toArray());

        $query->whereRaw("
            (SELECT COUNT(*)
             FROM lesson_view_histories
             WHERE user_id = users.id
             AND is_completed = 1
             AND lesson_id IN ($lessonIdsString)
            ) BETWEEN ? AND ?", [$minLessons, $maxLessons]);

        return $query;
    }
}
