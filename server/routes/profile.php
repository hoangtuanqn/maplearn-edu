<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Support\Facades\Route;

Route::prefix('profile')->name('account.')->middleware('auth.jwt')->group(function () {
    Route::post('/update', [ProfileController::class, 'update']);
    Route::post('/change-password', [ProfileController::class, 'changePassword']);
    Route::get('/courses', [ProfileController::class, 'getCoursesMe']);
    Route::get('/payments', [ProfileController::class, 'getPaymentsMe']);
    Route::post('/resend-verify-email', [ProfileController::class, 'resendVerification'])->middleware('throttle:2,5'); // Gửi lại email xác minh, 5 phút 2 lần
    // tạo mã 2fa
    Route::prefix('2fa')->group(function () {
        Route::get('/generate', [ProfileController::class, 'generate2FA']);
        Route::post('/toggle', [ProfileController::class, 'toggle2FA']);
    });

});
