<?php

use App\Http\Middleware\AuthenticateJwt;
use App\Http\Middleware\CheckRole;
use App\Http\Middleware\OptionalAuthenticateJwt;
use Illuminate\Foundation\Application;
use Illuminate\Foundation\Configuration\Exceptions;
use Illuminate\Foundation\Configuration\Middleware;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpKernel\Exception\AccessDeniedHttpException;

return Application::configure(basePath: dirname(__DIR__))
    ->withRouting(
        web: __DIR__ . '/../routes/web.php',
        api: __DIR__ . '/../routes/api.php',
        commands: __DIR__ . '/../routes/console.php',
        health: '/up',
    )
    ->withMiddleware(function (Middleware $middleware): void {
        //
        $middleware->alias([
            'auth.jwt'          => AuthenticateJwt::class,
            'auth.optional.jwt' => OptionalAuthenticateJwt::class,
            'check.role'        => CheckRole::class,
        ]);
    })
    ->withExceptions(function (Exceptions $exceptions): void {
        // Cấu hình hiển thị lỗi => Thay vì hiện ra view blade, thì hiện ra json để Client bắt

        // Đảm bảo luôn trả về JSON cho các lỗi trong API
        $exceptions->shouldRenderJsonWhen(function (Request $request, Throwable $e) {
            return $request->is('api/*') || $request->expectsJson();
        });

        // Tùy chỉnh phản hồi cho AccessDeniedHttpException
        $exceptions->render(function (AccessDeniedHttpException $e, Request $request) {
            if ($request->is('api/*')) {
                return response()->json([
                    'message' => $e->getMessage() ?? 'Bạn không có quyền thực hiện hành động này.',
                    'type'    => 'AccessDenied',
                ], Response::HTTP_FORBIDDEN);
            }
        });
    })->create();
