<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class CheckRole
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next, ...$roles): Response
    {
        $user = $request->user();

        if (!$user) {
            return response()->json(['success' => false, 'message' => 'Bạn chưa đăng nhập!'], 401);
        }

        // Nếu role user không nằm trong list
        if (!in_array($user->role, $roles)) {
            return response()->json(['success' => false, 'message' => 'Bạn không có quyền truy cập!'], 403);
        }

        return $next($request);
    }
}
