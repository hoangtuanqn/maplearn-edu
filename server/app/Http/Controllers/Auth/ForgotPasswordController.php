<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Password;

class ForgotPasswordController extends Controller
{
    public function sendResetLink(Request $request)
    {
        $request->validate([
            'email' => 'required|email',
        ]);

        $status = Password::sendResetLink(
            $request->only('email')
        );
        // if ($status !== Password::RESET_LINK_SENT) {
        //     // Giả lập trạng thái loading => Tránh hacker check email đã tồn tại
        //     sleep(4);
        // }
        return response()->json([
            'message' => 'Hãy kiểm tra email của bạn. Nếu địa chỉ đã đăng ký, chúng tôi sẽ gửi liên kết đặt lại mật khẩu ngay lập tức.',
        ]);
    }
}
