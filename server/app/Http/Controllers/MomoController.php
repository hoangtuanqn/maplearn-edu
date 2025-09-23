<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Api\BaseApiController;
use App\Models\Payment;
use App\Notifications\InvoiceNotification;
use App\Notifications\StudentEnrolledNotification;
use App\Services\PaymentService;
use Illuminate\Http\Request;

class MomoController extends BaseApiController
{

    public function handleReturn(Request $request)
    {
        $result      = PaymentService::handleReturnMomo($request);
        $transaction = $result['transaction_code'];

        $payment = Payment::where('transaction_code', $transaction)->first();
        if (!$payment) {
            return $this->errorResponse(null, 'Hóa đơn không tồn tại hoặc đã được xử lý', 404);
        }

        if ($result['success']) {
            $payment->update([
                'status'         => 'paid',
                'payment_method' => 'momo',
                'paid_at'       => now(),
            ]);
            $user = $payment->user;
            $user->notify(new InvoiceNotification($payment, 'paid'));
            $course = $payment->course;
            $teacher = $course->teacher;
            $teacher->notify(new StudentEnrolledNotification($teacher, $course, $user));
            return $this->successResponse($result, 'Thanh toán thành công!');
        } else {
            $payment->update([
                'status'         => 'failed',
                'payment_method' => 'momo',
            ]);
            return $this->errorResponse(null, $result['message'], 400);
        }
    }
}
