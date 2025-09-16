<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Symfony\Component\HttpFoundation\Response;
use Tymon\JWTAuth\Exceptions\JWTException;
use Tymon\JWTAuth\Facades\JWTAuth;

class AuthenticateJwt
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {

        try {
            // Lấy JWT từ cookie (nếu bạn để trên header thì đổi lại chỗ này)
            $token = $request->cookie('jwt_token');

            if (!$token) {
                // return response()->json(['message' => 'Bạn chưa đăng nhập! Vui lòng đăng nhập để tiếp tục!'], 401);
                return response()->json(['success' => false, 'message' => 'Bạn chưa đăng nhập! Vui lòng đăng nhập để tiếp tục!'], 401);
            }

            // Set token & authenticate user
            JWTAuth::setToken($token);
            $user = JWTAuth::authenticate();

            // Nếu cần gắn user vào request (tuỳ nhu cầu)
            $request->setUserResolver(function () use ($user) {
                return $user;
            });
            Auth::setUser($user);
            // hoặc dùng cách này $request->merge(['user' => $user]);
        } catch (JWTException $e) {
            return response()->json(['success' => false, 'message' => 'Token không hợp lệ hoặc đã hết hạn', 'message' => $e->getMessage()], 401);
        }
        return $next($request);
    }
}
