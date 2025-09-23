<?php

// routes/web.php

use App\Http\Controllers\Admin\PaymentController as AdminPaymentController;
use App\Http\Controllers\MomoController;
use App\Http\Controllers\PaymentController;
use App\Http\Controllers\VnpayController;
use App\Http\Controllers\ZalopayController;
use Illuminate\Support\Facades\Route;

Route::prefix('payment')->group(function () {
    // Ko cần xác thực người dùng
    Route::get('/momo/return', [MomoController::class, 'handleReturn']);
    Route::get('/vnpay/return', [VnpayController::class, 'paymentReturn']);
    Route::get('/zalopay/return', [ZalopayController::class, 'paymentReturn']);
});

Route::prefix('/payments')->middleware('auth.jwt')->group(function () {
    Route::post('{transaction_code}/cancel', [PaymentController::class, 'cancelPayment']);

    // enrollFreeCourse
    Route::post('enroll-free-course/{course}', [PaymentController::class, 'enrollFreeCourse']);
});
Route::apiResource('/payments', PaymentController::class)->middleware('auth.jwt');
Route::apiResource('/payments-admin', AdminPaymentController::class)->middleware(['auth.jwt', 'check.role:admin,teacher']);

Route::prefix("admin")->group(function () {
    Route::get('/payments/stats', [AdminPaymentController::class, 'getStatsPayment'])->middleware(['auth.jwt', 'check.role:admin,teacher']);
});
