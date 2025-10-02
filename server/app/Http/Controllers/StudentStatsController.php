<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Api\BaseApiController;
use App\Models\Course;
use App\Models\Payment;
use App\Models\User;
use Illuminate\Http\Request;

class StudentStatsController extends BaseApiController
{
    // get thông tin (tổng số bài học đã học, tổng thời lượng học, chuỗi học liên tục dài nhất, bài kiểm tra đã làm (chỉ tính bài kiểm tra của khóa đó))
    public function getInfoStats(Request $request, string $course, string $id)
    {
        $user = User::findOrFail($id);
        $course = Course::where('slug', $course)->firstOrFail();
        $lessonIds = $course->lessons->pluck('id')->toArray();
        $attemptHistories = $user->lessonViewHistories()->where('is_completed', 1)->whereIn('lesson_id', $lessonIds);
        $totalLessons = $attemptHistories->count();
        $totalDuration = $attemptHistories->sum('progress');
        $totalAttemptExam = $course->exam->examAttempts()->where('user_id', $user->id)->count();
        // chuỗi học liên tục(group by ngày, đếm số ngày liên tiếp dài nhất)
        $continuousDays = $attemptHistories->selectRaw('DATE(updated_at) as date')
            ->groupBy('date')
            ->orderBy('date', 'desc')
            ->get()
            ->pluck('date')
            ->toArray();
        $maxStreak = 0;
        $currentStreak = 0;
        $previousDate = null;
        foreach ($continuousDays as $date) {
            if ($previousDate === null || strtotime($previousDate) - strtotime($date) === 86400) {
                $currentStreak++;
            } else {
                $currentStreak = 1;
            }
            $maxStreak = max($maxStreak, $currentStreak);
            $previousDate = $date;
        }
        // điểm thi cao nhất
        $highestScore = $course->exam->examAttempts()->where('user_id', $user->id)->max('score');

        // tỉ lệ hoàn thành khóa học (tổng video đã học xong / tổng số video của khóa học)
        $completionRate = $totalLessons > 0 ? round($totalLessons / $course->lessons->count() * 100) : 0;

        // số bài thi không vi phạm
        $noViolationCount = $course->exam->examAttempts()->where('user_id', $user->id)->where('violation_count', 0)->count();
        // số lần vi phạm bài thi
        $violationCount = $course->exam->examAttempts()->where('user_id', $user->id)->sum('violation_count');


        // tiến độ theo chương học (bao nhiêu % hoàn thành)
        $chapterProgress = $course->chapters->map(function ($chapter) use ($user) {
            $lessonIds = $chapter->lessons->pluck('id')->toArray();
            $completedLessons = $user->lessonViewHistories()->where('is_completed', 1)->whereIn('lesson_id', $lessonIds)->count();
            $totalLessons = count($lessonIds);
            return [
                'chapter_id' => $chapter->id,
                'chapter_title' => $chapter->title,
                'completion_rate' => $totalLessons > 0 ? round($completedLessons / $totalLessons * 100) : 0,
            ];
        });

        // trả về thông tin
        return $this->successResponse([
            'full_name' => $user->full_name,
            'avatar' => $user->avatar,
            'email' => $user->email,
            'enrolled_at' => $user->purchasedCourses()->where('course_id', $course->id)->value('created_at'),
            'total_lessons' => $totalLessons,
            'total_duration' => round($totalDuration / 60),
            'total_attempt_exam' => $totalAttemptExam,
            'max_streak' => $maxStreak,
            'last_7_days' => $this->statsEnrollmentsLast7Days($course->id, $user->id),
            'exam_attempts' => $this->examAttemptHistories($course->id, $user->id),
            'last_learned_at' => $user->lessonViewHistories()->whereIn('lesson_id', $lessonIds)->orderBy('updated_at', 'desc')->value('updated_at'),
            'highest_score' => $highestScore,
            'completion_rate' => $completionRate,
            'no_violation_count' => $noViolationCount,
            'violation_count' => $violationCount,
            'chapter_progress' => $chapterProgress,
            'max_score_exam_paper' => $course->exam->paper->max_score ?? 10,
        ], "Lấy thông tin thống kê học viên thành công");
    }

    // dữ liệu học trong 7 ngày gần nhất (số bài học đã học, thời lượng học)
    public function statsEnrollmentsLast7Days(string $courseId, string $id)
    {
        $user = User::findOrFail($id);
        $course = Course::find($courseId);

        $lessonIds = $course->lessons->pluck('id')->toArray();
        $attemptHistories = $user->lessonViewHistories()->where('is_completed', 1)->whereIn('lesson_id', $lessonIds)
            ->where('updated_at', '>=', now()->subDays(7))
            ->get();
        $stats = [];
        for ($i = 6; $i >= 0; $i--) {
            $date = now()->subDays($i)->format('d-m-Y');
            $stats[$date] = [
                'date' => $date,
                'lessons_completed' => 0,
                'total_duration' => 0,
            ];
            foreach ($attemptHistories as $history) {
                if ($history->updated_at->format('d-m-Y') === $date) {
                    $stats[$date]['lessons_completed']++;
                    $stats[$date]['total_duration'] += $history->progress;
                }
            }
            $stats[$date]['total_duration'] = round($stats[$date]['total_duration'] / 60);
        }
        return array_values($stats);
    }

    // lịch sử làm bài kiểm tra
    public function examAttemptHistories(string $courseId, string $id)
    {
        $user = User::findOrFail($id);
        $course = Course::find($courseId);
        $examAttempts = $course->exam->examAttempts()->with('paper')
            ->where('user_id', $user->id)
            ->get();

        $result = $examAttempts->map(function ($attempt) {
            $paper = $attempt->paper;
            return [
                'id' => $attempt->id,
                'slug_exam' => $paper->slug ?? null,
                'date' => $attempt->created_at,
                'title' => $paper->title ?? "Bài kiểm tra",
                'score' => $attempt->score ?? 0,
                'pass_score' => $paper->pass_score ?? 5,
                'max_score' => $paper->max_score ?? 10,
                'created_at' => $attempt->created_at,
            ];
        });

        return $result;
    }
}
