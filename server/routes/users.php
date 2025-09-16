<?php

use App\Http\Controllers\Admin\StudentController;
use App\Http\Controllers\UserController;
use Illuminate\Support\Facades\Route;

Route::apiResource('users', UserController::class)->middlewareFor(['store', 'update', 'destroy'], 'auth.jwt');
Route::apiResource('students', StudentController::class)->middleware(['auth.jwt', 'check.role:admin']);
Route::prefix("students")->middleware(['auth.jwt', 'check.role:admin'])->group(function () {
    Route::post('/{student}/reset-password', [StudentController::class, 'resetPassword']);
    Route::get('/{student}/activity-history', [StudentController::class, 'activityHistory']);
    Route::post('/import', [StudentController::class, 'imports']); // import nhiều học sinh từ file excel
});
