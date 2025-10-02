<?php

namespace Database\Seeders;

use App\Models\LessonViewHistory;
use App\Models\Payment;
use Illuminate\Database\Seeder;

class LessonViewHistorySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $payments = Payment::where('status', 'paid')->get();
        foreach ($payments as $indexPayment => $payment) {
            $course = $payment->course;
            $lessons = $course->lessons;
            foreach ($lessons as $indexLessson => $lesson) {
                // if ($indexPayment >= 4 && rand(1, 200) % 2 == 0) {
                //     continue; // ko phải bài học nào cũng học
                // }

                LessonViewHistory::create([
                    'user_id' => $payment->user_id,
                    'lesson_id' => $lesson->id,
                    'progress' => $lesson->duration,
                    'is_completed' => true,
                    'updated_at' => now()->subDays(rand(1, 7)),
                ]);
            }
        }
    }
}
