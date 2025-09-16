<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Api\BaseApiController;
use App\Models\User;
use App\Notifications\VerifyEmailNotification;
use App\Services\GoogleAuthenService;

use App\Traits\HandlesCookies;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Tymon\JWTAuth\Facades\JWTAuth;

class AuthController extends BaseApiController
{
    use HandlesCookies;

    /**
     * Xử lý đăng nhập
     */
    public function login(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'username' => 'required|string',
            'password' => 'required|string',
        ]);

        $credentials = $validator->safe()->only('username', 'password');

        if (!JWTAuth::attempt($credentials)) {
            // return response()->json(['error' => 'Thông tin đăng nhập chưa chính xác!'], 401);
            return $this->errorResponse(null, 'Thông tin đăng nhập chưa chính xác!', 401);
        }

        // Lấy user từ token
        $user = JWTAuth::user();
        // Xử lý nếu bật 2FA
        if ($user->google2fa_enabled) {
            return response()->json([
                'success'      => true,
                'message'      => "Vui lòng nhập mã xác thực 2Fa để tiếp tục!",
                '2fa_required' => true,
                'user_id'      => $user->id,
                // Thêm salt vào token
                'token' => base64_encode(JWTAuth::fromUser($user) . env('T1_SECRET', "")),
            ]);
        }
        // logger("Login user >> " . $user);

        // Trả về token + refresh token dưới dạng cookie
        return $this->respondWithToken($user, 'Đăng nhập thành công!');
    }

    /**
     * Xử lý đăng ký
     */
    public function register(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'full_name' => 'required|string|max:255',
            'email'     => 'required|email|unique:users|max:255',
            'username'  => 'required|string|unique:users|max:255',
            'password'  => 'required|min:6|max:255',
        ]);

        $data                       = $validator->safe()->toArray();
        $data['verification_token'] = bin2hex(random_bytes(50));
        $data['avatar']             = 'https://res.cloudinary.com/dbu1zfbhv/image/upload/v1755729796/avatars/ccrlg1hkjtc6dyeervsv.jpg';
        $user                       = User::create($data);
        $user->notify(new VerifyEmailNotification($user->verification_token));

        // Lưu lịch sử hoạt động

        // Tạo cookie token và trả về response
        return $this->respondWithToken($user, 'Đã đăng ký tài khoản thành công!', 201);
    }

    // Xác minh email sau khi đăng ký
    public function verifyEmail(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'token' => 'required|string',
        ]);
        $user = User::where('verification_token', $validator->safe()->only('token'))->first();
        if (!$user) {
            return $this->errorResponse(null, 'Token xác minh không hợp lệ!', 404);
        }
        // Cập nhật trạng thái đã xác minh
        $user->email_verified_at  = now();
        $user->verification_token = null; // Xóa token sau khi xác minh
        $user->save();
        // Trả về thông báo thành công
        return $this->successResponse(null, 'Xác minh email thành công!', 200);
    }

    /**
     * Refresh token khi token cũ đã hết hạn
     */
    public function refresh(Request $request)
    {
        try {
            $refreshToken = $request->cookie('jwt_refresh');
            if (!$refreshToken) {
                return $this->errorResponse(null, 'Mã refresh token không tồn tại!', 401);
            }

            JWTAuth::setToken($refreshToken);
            $payload = JWTAuth::getPayload();

            if (!$payload->get('jwt_refresh')) {
                return $this->errorResponse(null, 'Refresh token không hợp lệ!', 401);
            }

            $user = JWTAuth::authenticate();

            // Cấp lại token mới
            return $this->respondWithToken($user, 'Làm mới token thành công!');
        } catch (\Exception $e) {
            return $this->errorResponse(null, 'Không thể làm mới token! Vui lòng thử lại! ' . $e->getMessage(), 401);
            // logger("Refresh token error >> " . $e->getMessage());

        }
    }

    /**
     * Lấy thông tin người dùng hiện tại
     */
    public function me(Request $request)
    {
        return $this->successResponse($request->user(), 'Lấy thông tin người dùng thành công!');
    }

    /**
     * Xác thực mã 2Fa của người dùng
     */
    public function verify2fa(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'token' => 'required|string',
            'otp'   => 'required|digits:6',
        ]);

        $token = base64_decode($request->token);
        // Kiểm tra salt phải nằm trong token
        if (!str_contains($token, env('T1_SECRET', ""))) {
            return $this->errorResponse(null, 'Token không hợp lệ!', 401);
        }
        // Xóa salt ra khỏi token
        $token = str_replace(env('T1_SECRET'), "", $token);
        JWTAuth::setToken($token);
        $user = JWTAuth::authenticate();
        if (!$user->google2fa_enabled) {
            return $this->errorResponse(null, 'Tài khoản này chưa bật xác thực 2 lớp!', 401);
        }
        $isValid = GoogleAuthenService::verify2FA(
            $user->google2fa_secret,
            $validator->safe()->only('otp')['otp']
        );

        if (!$isValid) {
            return $this->errorResponse(null, 'Mã OTP không chính xác hoặc đã hết hạn!', 401);
        }
        return $this->respondWithToken($user, 'Xác thực tài khoản thành công!');
    }

    /**
     * Đăng xuất: Xóa cookie
     */
    public function logout()
    {
        return response()->json([
            'success' => true,
            'message' => 'Đăng xuất thành công!',
        ])->withCookie($this->clearCookie('jwt_token'))
            ->withCookie($this->clearCookie('jwt_refresh'));
    }
}
