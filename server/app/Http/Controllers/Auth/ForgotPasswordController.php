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
        return response()->json([
            'message' => 'Hãy kiểm tra email của bạn. Nếu địa chỉ đã đăng ký, chúng tôi sẽ gửi liên kết đặt lại mật khẩu ngay lập tức.',
        ]);
    }
}
