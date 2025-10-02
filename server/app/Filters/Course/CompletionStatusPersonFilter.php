<?php

namespace App\Filters\Course;

use App\Models\Course;
use App\Models\ExamPaper;
use Illuminate\Database\Eloquent\Builder;
use Spatie\QueryBuilder\Filters\Filter;

class CompletionStatusPersonFilter implements Filter
{
    public function __invoke(Builder $query, $value, string $property)
    {
        $user = request()->user();
        if (!$user) {
            return $query;
        }

        // Subquery đếm số bài học thực tế của course
        $lessonCountSub = "(
            SELECT COUNT(*)
            FROM course_lessons
            INNER JOIN course_chapters ON course_chapters.id = course_lessons.chapter_id
            WHERE course_chapters.course_id = courses.id
        )";

        // Subquery đếm số bài học đã hoàn thành của user cho course
        $completedLessonSub = "(
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
        )";

        // Query context là từng course của user
        // Lấy exam_paper_id từ course context
        $query->when(true, function ($q) use ($user, $value, $lessonCountSub, $completedLessonSub) {
            switch ($value) {
                case 'in_progress':
                    $q->whereDoesntHave('certificates', function ($qc) {
                        $qc->whereColumn('course_id', 'courses.id');
                    })
                        ->whereRaw("$completedLessonSub < $lessonCountSub", [$user->id]);
                    break;

                case 'completed':
                    $q->whereHas('certificates', function ($qc) {
                        $qc->whereColumn('course_id', 'courses.id');
                    });
                    break;

                case 'not_passed_exam':
                    $q->whereDoesntHave('certificates', function ($qc) {
                        $qc->whereColumn('course_id', 'courses.id');
                    })
                        ->whereRaw("$completedLessonSub >= $lessonCountSub", [$user->id])
                        ->whereRaw(
                            "COALESCE((SELECT MAX(score) FROM exam_attempts WHERE user_id = ? AND exam_paper_id = courses.exam_paper_id AND status IN ('submitted', 'detected')), 0) < IFNULL((SELECT pass_score FROM exam_papers WHERE id = courses.exam_paper_id), 0)",
                            [$user->id]
                        );
                    break;

                case 'waiting_certificate':
                    $q->whereDoesntHave('certificates', function ($qc) {
                        $qc->whereColumn('course_id', 'courses.id');
                    })
                        ->whereRaw("$completedLessonSub >= $lessonCountSub", [$user->id])
                        ->whereRaw(
                            "COALESCE((SELECT MAX(score) FROM exam_attempts WHERE user_id = ? AND exam_paper_id = courses.exam_paper_id AND status IN ('submitted', 'detected')), 0) >= IFNULL((SELECT pass_score FROM exam_papers WHERE id = courses.exam_paper_id), 0)",
                            [$user->id]
                        );
                    break;

                default:
                    return $q;
            }
        });

        return $query;
    }
}
