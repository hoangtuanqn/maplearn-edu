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
                // chỉ cần add data mẫu vừa phải thôi
                // if ($indexPayment >= 4 && $indexLessson >= 10) {
                //     break;
                // }
                LessonViewHistory::create([
                    'user_id' => $payment->user_id,
                    'lesson_id' => $lesson->id,
                    'progress' => $lesson->duration,
                    'is_completed' => true,
                    'created_at' => now(),
                ]);
            }
        }
    }
}
