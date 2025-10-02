<?php

namespace App\Filters\Course;

use App\Models\Course;
use Illuminate\Database\Eloquent\Builder;
use Spatie\QueryBuilder\Filters\Filter;

class ProgressRangePersonFilter implements Filter
{
    public function __invoke(Builder $query, $value, string $property)
    {
        // Filter theo tiến độ hoàn thành từng khóa học của user hiện tại
        // Query đang là purchasedCourses() của user
        $user = request()->user();
        if (!$user) {
            return $query;
        }

        // Tính toán range phần trăm
        switch ($value) {
            case '0-25':
                $minPercent = 0;
                $maxPercent = 25;
                break;
            case '26-50':
                $minPercent = 26;
                $maxPercent = 50;
                break;
            case '51-75':
                $minPercent = 51;
                $maxPercent = 75;
                break;
            case '76-99':
                $minPercent = 76;
                $maxPercent = 99;
                break;
            case '100':
                $minPercent = 100;
                $maxPercent = 100;
                break;
            default:
                return $query;
        }

        // Subquery tính phần trăm hoàn thành cho từng course
        $query->whereRaw(
            "
            (
                SELECT ROUND(
                    IFNULL(
                        (
                            SELECT COUNT(*)
                            FROM lesson_view_histories
                            WHERE user_id = ?
                            AND is_completed = 1
                            AND lesson_id IN (
                                SELECT course_lessons.id
                                FROM course_lessons
                                INNER JOIN course_chapters ON course_chapters.id = course_lessons.chapter_id
                                WHERE course_chapters.course_id = courses.id
                            )
                        ), 0
                    ) /
                    IFNULL(
                        (
                            SELECT COUNT(*)
                            FROM course_lessons
                            INNER JOIN course_chapters ON course_chapters.id = course_lessons.chapter_id
                            WHERE course_chapters.course_id = courses.id
                        ), 1
                    ) * 100
                , 2)
            ) BETWEEN ? AND ?",
            [$user->id, $minPercent, $maxPercent]
        );

        return $query;
    }
}
