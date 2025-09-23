<?php

namespace App\Observers;

use App\Models\Payment;

class PaymentObserver
{

    public function creating(Payment $paymment)
    {
        $paymment->transaction_code = strtoupper(uniqid()); // Tạo mã giao dịch duy nhất
        $paymment->status           = $paymment->status ?? 'pending'; // Mặc định trạng thái là 'pending'
    }
}
