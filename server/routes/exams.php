<?php

use App\Http\Controllers\Admin\ExamController;
use App\Http\Controllers\ExamAttemptController;
use App\Http\Controllers\ExamPaperController;
use App\Http\Controllers\ExamQuestionController;
use Illuminate\Support\Facades\Route;

Route::apiResource('exams', ExamPaperController::class)->middleware('auth.optional.jwt')->middlewareFor(['store', 'update', 'destroy'], 'auth.jwt');
Route::prefix('exams')->middleware('auth.jwt')->group(function () {
    // Lấy danh sách câu hỏi đề thi
    Route::get('/questions/{exam}', [ExamQuestionController::class, 'index']);

    // Url bắt đầu làm bài (lưu lại data)
    Route::post('/{exam}/start', [ExamPaperController::class, 'startExam']);
    // Url nộp bài
    Route::post('/{exam}/submit', [ExamPaperController::class, 'submitExam']);

    // Lấy kết quả thi dựa trên id attempts
    Route::get('/{exam}/{id}/results', [ExamPaperController::class, 'detailResultExam']);

    // Đánh dấu bài thi gian lận
    Route::post('/{exam}/detect-cheat', [ExamAttemptController::class, 'detectedCheat']);

    // Lấy lịch sử làm bài thi
    Route::get("/{exam}/attempts", [ExamAttemptController::class, 'index']);

    // Kiểm tra xếp hạng của người dùng
    Route::get("/{exam}/check-ranking", [ExamAttemptController::class, 'checkUserRanking']);

    // Get bài làm của người dùng (câu hỏi đề thi + đáp án)
    Route::get("/{exam}/{id}/my-attempts", [ExamAttemptController::class, 'myAttempts']);
});

// Ko cần login
Route::prefix('exams')->group(function () {
    // Bảng ranking (Xếp hạng)
    Route::get("/{exam}/ranking", [ExamAttemptController::class, 'ranking']);
});

// Route exam cho admin, teacher
Route::prefix('exams-admin')->middleware(['auth.jwt', 'check.role:admin,teacher'])->group(function () {
    // Lấy tất cả lịch sử làm bài thi
    Route::get('/all-history', [ExamController::class, 'allHistory']);

    // Lấy lịch sử làm bài thi
    Route::get('/{exam}/history', [ExamController::class, 'history']);
});
Route::apiResource('exams-admin', ExamController::class)->middleware(['auth.jwt', 'check.role:admin,teacher']);
