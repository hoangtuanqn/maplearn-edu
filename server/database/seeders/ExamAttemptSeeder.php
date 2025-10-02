<?php

namespace Database\Seeders;

use App\Models\ExamAttempt;
use App\Models\LessonViewHistory;
use App\Models\Payment;
use Illuminate\Database\Seeder;

class ExamAttemptSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // get học sinh mua khóa học và đã học hết video rồi thì làm bài kiểm tra
        $payments = Payment::where('status', 'paid')->get();
        foreach ($payments as $indexPayment => $payment) {
            $course = $payment->course;
            $lessons = $course->lessons;
            $exam = $course->exam;
            $totalLessons = $lessons->count();
            $completedLessons = LessonViewHistory::where('user_id', $payment->user_id)
                ->whereIn('lesson_id', $lessons->pluck('id'))
                ->where('is_completed', true)
                ->count();
            if ($totalLessons > 0 && $completedLessons >= $totalLessons && $course->exam) {
                // đã học hết video và có bài kiểm tra cuối khóa
                // tạo 1-3 lần làm bài kiểm tra
                $attemptTimes = 3;
                for ($i = 0; $i < $attemptTimes; $i++) {
                    $createAt = now()->subDays(rand(1, 7));
                    ExamAttempt::create([
                        'user_id' => $payment->user_id,
                        'exam_paper_id' => $course->exam->id,
                        'score' => rand(5, 10), // điểm từ 5-10
                        'started_at' => $createAt,
                        'submitted_at' => $createAt->addMinutes(rand(10, $exam->duration_minutes)),
                        'violation_count' => rand(0, 2),
                        'time_spent' => rand(10, $exam->duration_minutes) * 60,
                        'details' => [
                            'start' => time(),
                            'answers' => [],
                            'questionActive' => 0,
                        ],
                        'created_at' => $createAt,
                        'status' => 'submitted',
                    ]);
                }
            }
        }
    }
}
