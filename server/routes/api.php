<?php

use App\Events\PusherEvent;
use Illuminate\Support\Facades\Route;

Route::prefix('v1')->group(function () {
    require __DIR__ . '/auth.php';
    require __DIR__ . '/invoices.php';
    require __DIR__ . '/profile.php';
    require __DIR__ . '/teacher.php';
    require __DIR__ . '/course.php';
    require __DIR__ . '/exams.php';
    require __DIR__ . '/posts.php';
    require __DIR__ . '/users.php';
    require __DIR__ . '/chat.php';

    require __DIR__ . '/payment.php';
    require __DIR__ . '/others.php';
});
// Route::get('/pusher/auth2', function () {
//     broadcast(new PusherEvent([
//         'message' => 'Hóa đơn  đã được xác nhận.',
//     ], 'nguyen_thi_thanh_thuy_8@example.com'));
//     return 'Đã bắn';
// });
