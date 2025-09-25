<?php

namespace Database\Seeders;

use App\Models\Course;
use App\Models\Payment;
use App\Models\User;
use Illuminate\Database\Seeder;

class PaymentSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {

        for ($i = 1; $i <= 100; ++$i) {
            $course = Course::where('start_date', '<=', now())
                // ->whereNotIn('id', Payment::pluck('course_id'))
                ->inRandomOrder()
                ->first();
            // Exclude course owner from buying their own course
            $user = User::whereNotIn('id', [$course?->user_id])->inRandomOrder()->first();
            if (!$course || !$user) {
                continue;
            }
            // nếu user đã mua khóa học này rồi thì bỏ qua
            if (Payment::where('user_id', $user->id)->where('course_id', $course->id)->exists()) {
                continue;
            }
            Payment::create([
                'user_id'          => $user->id,

                // Select a random course with start_date <= now() and not duplicated
                'course_id' => $course?->id,
                'amount'           => $course?->price ?? 0,
                'payment_method'   => ['transfer', 'vnpay', 'momo', 'zalopay'][array_rand(['transfer', 'vnpay', 'momo', 'zalopay'])],
                'transaction_code' => 'TXN' . strtoupper(bin2hex(random_bytes(5))),
                'status'           => 'paid',
                'paid_at'          => now()->subDays(rand(0, 365)), // random date within the past year
            ]);
        }
    }
}
