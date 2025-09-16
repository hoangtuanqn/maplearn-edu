<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Api\BaseApiController;
use App\Models\Course;
use App\Models\Payment;
use App\Services\PaymentService;
use Illuminate\Http\Request;

class PaymentController extends BaseApiController
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $user = $request->user();
        $data = $request->validate([
            'course_id'      => 'required|exists:courses,id',
            'payment_method' => 'required|in:transfer,vnpay,momo,zalopay',
        ]);
        $course = Course::find($data['course_id']);
        if (!$course) {
            return $this->errorResponse(null, 'Khóa học không tồn tại', 404);
        }
        $payment = Payment::updateOrCreate(
            ['user_id' => $user->id, 'course_id' => $data['course_id'], 'status' => 'pending'],
            [
                'user_id'        => $user->id,
                'amount'         => $course->price,
                'course_id'      => $data['course_id'],
                'payment_method' => $request->payment_method,
                'status'         => 'pending',
            ]
        );
        $total = $payment->amount;
        switch ($request->payment_method) {
            case 'vnpay':
                $result = PaymentService::createInvoiceVNPAY($total, $payment->transaction_code, env("APP_URL_FRONT_END") . "/payments/return/vnpay");
                break;
            case 'momo':
                $result = PaymentService::createInvoiceMOMO($total, $payment->transaction_code, env("APP_URL_FRONT_END") . "/payments/return/momo");
                break;
            case 'zalopay':
                $result = PaymentService::createInvoiceZALOPAY($total, $payment->transaction_code, env("APP_URL_FRONT_END") . "/payments/return/zalopay");
                break;
            case 'transfer':
                break;
            default:
                return $this->errorResponse(null, 'Phương thức thanh toán không hợp lệ', 400);
        }
        // Trả về URL THANH TOÁN
        $payment['url_payment'] = $result['url_payment'] ?? null;
        return $this->successResponse($payment, 'Tạo payment thành công', 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(Payment $payment)
    {

        // Hiển thị payment gồm nhiều invoice bên trong
        $payment->load([
            'course',
        ]);
        return $this->successResponse($payment, 'Lấy dữ liệu payments thành công', 200);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Payment $payment)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Payment $payment)
    {
        //
    }

    public function cancelPayment(Request $request, string $transaction_code)
    {
        $user = $request->user();
        $payment = Payment::where(['user_id' => $user->id, 'transaction_code' => $transaction_code, 'status' => 'pending'])->first();
        if (!$payment) {
            return $this->errorResponse(null, 'Payment không tồn tại hoặc đã được xử lý', 404);
        }

        $payment->status = 'canceled';
        $payment->save();

        return $this->successResponse(null, 'Hủy payment thành công', 200);
    }
}
