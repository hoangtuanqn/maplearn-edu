<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Api\BaseApiController;
use App\Models\Payment;
use App\Services\PaymentService;
use Illuminate\Http\Request;

class VnpayController extends BaseApiController
{

    public function paymentReturn(Request $request)
    {
        $result           = PaymentService::handleReturnVNPAY($request);
        $transaction_code = $result['transaction_code'] ?? null;

        $payment = Payment::where('transaction_code', $transaction_code)->first();
        if (!$payment) {
            return $this->errorResponse(null, 'Hóa đơn không tồn tại', 404);
        }

        if ($result['success']) {
            // Xử lý thành công
            $payment->update([
                'status'         => 'paid',
                'payment_method' => 'vnpay',
            ]);
            return $this->successResponse($payment, 'Thanh toán thành công');
        } else {
            // Xử lý thất bại
            $payment->update([
                'status'         => 'failed',
                'payment_method' => 'vnpay',
            ]);
            return $this->errorResponse(null, 'Thanh toán thất bại: ' . $result['message'], 400);
        }
    }
}
