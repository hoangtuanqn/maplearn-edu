<?php

namespace Database\Seeders;

use App\Models\Payment;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class CertificateSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Check qua khóa học đã mua trong payment và check qua bài thi trong khóa học và check xem ai đã làm bài và đạt thì cấp chứng chỉ
        // Lấy tất cả các payment đã hoàn thành
        $payments = Payment::where('status', 'paid')->get();
        foreach ($payments as $payment) {
            $course  = $payment->course;
            $user    = $payment->user;
            $exam = $course->exam;
            if ($exam) {
                $examResults = $exam->examAttempts()
                    ->where('user_id', $user->id)
                    ->where('status', 'submitted')
                    ->where('score', '>=', $exam->pass_score)
                    ->get();
                foreach ($examResults as $examResult) {
                    // Kiểm tra nếu chưa có chứng chỉ thì tạo mới
                    if (!$user->certificates()->where('course_id', $course->id)->exists()) {
                        $user->certificates()->create([
                            'full_name' => $user->full_name,
                            'course_id' => $course->id,
                        ]);
                    }
                }
            }
        }
    }
}
