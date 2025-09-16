<?php

namespace App\Traits;

use App\Models\User;
use Symfony\Component\HttpFoundation\Cookie;
use Tymon\JWTAuth\Facades\JWTAuth;

trait HandlesCookies
{
    /**
     * Hàm tái sử dụng: Tạo token và trả về response kèm cookie
     */
    private function respondWithToken(User $user, string $message, int $status = 200)
    {
        $timeLiveToken   = 120; // Sống 120 phút
        $timeLiveRefresh = 60 * 24 * 7; // Sống 7 ngày
        // Access Token sống 120 phút
        JWTAuth::factory()->setTTL($timeLiveToken);
        $accessToken = JWTAuth::fromUser($user);

        // Refresh Token sống 7 ngày (60 * 24 * 7 = 10080 phút)
        JWTAuth::factory()->setTTL($timeLiveRefresh);
        $refreshToken = JWTAuth::customClaims(['jwt_refresh' => true])->fromUser($user);

        return response()->json([
            'success' => true,
            'message' => $message,
            'data'    => $user,
        ], $status)
            ->withCookie($this->buildCookie('jwt_token', $accessToken, $timeLiveToken)) // set 120p = 2 tiếng
            ->withCookie($this->buildCookie('jwt_refresh', $refreshToken, $timeLiveRefresh));
    }

    /**
     * Tạo cookie httpOnly
     */
    private function buildCookie(string $name, string $value, int $minutes): Cookie
    {
        return cookie(
            $name,
            $value,
            $minutes,
            '/',
            null,
            true,
            true // http only
        );
    }

    /**
     * Tạo cookie xóa (thời gian sống -1 phút)
     */
    private function clearCookie(string $name)
    {
        return cookie($name, '', -1, '/', null, true, true);
    }
}
