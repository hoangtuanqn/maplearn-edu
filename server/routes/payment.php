<?php

// routes/web.php

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
});
Route::apiResource('/payments', PaymentController::class)->middleware('auth.jwt');
