<?php

namespace App\Filters\Course;

use App\Models\Course;
use App\Models\ExamPaper;
use Illuminate\Database\Eloquent\Builder;
use Spatie\QueryBuilder\Filters\Filter;

class CompletionStatusFilter implements Filter
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

        // Lấy course và thông tin cần thiết
        $course = Course::find($courseId);
        if (!$course) {
            return $query;
        }

        $totalLessons = $course->lesson_count;
        $lessonIds = $course->lessons()->pluck('course_lessons.id');

        if ($lessonIds->isEmpty() || $totalLessons <= 0) {
            return $query;
        }

        $lessonIdsString = implode(',', $lessonIds->toArray());

        switch ($value) {
            case 'in_progress':
                // Đang học: Chưa có certificate VÀ chưa hoàn thành hết lesson
                $query->whereDoesntHave('certificates', function ($q) use ($courseId) {
                    $q->where('course_id', $courseId);
                })
                    ->whereRaw("
                    (SELECT COUNT(*)
                     FROM lesson_view_histories
                     WHERE user_id = users.id
                     AND is_completed = 1
                     AND lesson_id IN ($lessonIdsString)
                    ) < ?", [$totalLessons]);
                break;

            case 'completed':
                // Đã hoàn thành: Có certificate
                $query->whereHas('certificates', function ($q) use ($courseId) {
                    $q->where('course_id', $courseId);
                });
                break;

            case 'not_passed_exam':
                // Chưa đạt bài thi: Hoàn thành hết lesson NHƯNG không pass exam (nếu có exam)
                if ($course->exam_paper_id) {
                    $examPaper = ExamPaper::find($course->exam_paper_id);
                    if ($examPaper) {
                        $query->whereDoesntHave('certificates', function ($q) use ($courseId) {
                            $q->where('course_id', $courseId);
                        })
                            ->whereRaw("
                            (SELECT COUNT(*)
                             FROM lesson_view_histories
                             WHERE user_id = users.id
                             AND is_completed = 1
                             AND lesson_id IN ($lessonIdsString)
                            ) >= ?", [$totalLessons])
                            ->whereRaw("
                            COALESCE(
                                (SELECT MAX(score)
                                 FROM exam_attempts
                                 WHERE user_id = users.id
                                 AND exam_paper_id = ?
                                 AND status IN ('submitted', 'detected')
                                ), 0
                            ) < ?", [$course->exam_paper_id, $examPaper->pass_score]);
                    }
                } else {
                    // Không có exam thì không có trạng thái này
                    $query->whereRaw('1 = 0'); // Không trả về kết quả nào
                }
                break;

            case 'waiting_certificate':
                // Chờ cấp chứng chỉ: Hoàn thành hết lesson VÀ đạt bài thi (nếu có) NHƯNG chưa có certificate
                $query->whereDoesntHave('certificates', function ($q) use ($courseId) {
                    $q->where('course_id', $courseId);
                })
                    ->whereRaw("
                    (SELECT COUNT(*)
                     FROM lesson_view_histories
                     WHERE user_id = users.id
                     AND is_completed = 1
                     AND lesson_id IN ($lessonIdsString)
                    ) >= ?", [$totalLessons]);

                // Nếu có exam thì phải pass exam
                if ($course->exam_paper_id) {
                    $examPaper = ExamPaper::find($course->exam_paper_id);
                    if ($examPaper) {
                        $query->whereRaw("
                            COALESCE(
                                (SELECT MAX(score)
                                 FROM exam_attempts
                                 WHERE user_id = users.id
                                 AND exam_paper_id = ?
                                 AND status IN ('submitted', 'detected')
                                ), 0
                            ) >= ?", [$course->exam_paper_id, $examPaper->pass_score]);
                    }
                }
                break;

            default:
                return $query;
        }

        return $query;
    }
}
