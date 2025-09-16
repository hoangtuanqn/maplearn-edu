<?php

namespace Database\Seeders;

use App\Models\Payment;
use Illuminate\Database\Seeder;

class PaymentSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {

        for ($i = 1; $i <= 10; ++$i) {
            Payment::create([
                'user_id'          => 8,
                'course_id'        => rand(1, 10),
                'amount'           => rand(100000, 1000000),
                'payment_method'   => ['transfer', 'vnpay', 'momo', 'zalopay'][array_rand(['transfer', 'vnpay', 'momo', 'zalopay'])],
                'transaction_code' => 'TXN' . strtoupper(bin2hex(random_bytes(5))),
                'status'           => 'paid',
                'paid_at'          => now()->subDays(rand(0, 30)),
            ]);
        }
    }
}
