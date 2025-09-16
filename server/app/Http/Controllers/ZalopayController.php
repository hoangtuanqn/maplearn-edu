<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Api\BaseApiController;
use App\Models\Payment;
use App\Services\PaymentService;
use Illuminate\Http\Request;

class ZalopayController extends BaseApiController
{

    // Return zalo pay
    // Xử lý redirect từ ZaloPay về Merchant (Laravel style)
    public function paymentReturn(Request $request)
    {
        $result           = PaymentService::handleReturnZaloPay($request);
        $transaction_code = $result['transaction_code'] ?? null;
        $payment          = Payment::where('transaction_code', $transaction_code)->first();

        if (!$payment) {
            return $this->errorResponse(null, 'Hóa đơn không tồn tại hoặc đã được xử lý', 404);
        }
        $payment->update([
            'status'         => $result['success'] == true ? 'paid' : 'failed',
            'payment_method' => 'zalopay',
        ]);

        if ($result['success'] == true) {
            return $this->successResponse($payment, 'Thanh toán thành công');
        } else {
            return $this->errorResponse($payment, 'Thanh toán thất bại', 400);
        }
    }
}
