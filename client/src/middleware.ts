import { match } from "path-to-regexp";
import { NextRequest, NextResponse } from "next/server";

const protectedRoutes = [
    "/profile",
    "/profile/:path",
    "/carts",
    "/carts/:path",
    "/payments",
    "/payments/:path",
    "/exams/:path",
    "/admin",
    "/admin/:path",
    "/learn/:path",
];
const authPaths = ["/auth/:path"];

function isPathMatch(pattern: string, pathname: string): boolean {
    try {
        const matcher = match(pattern, { decode: decodeURIComponent });
        return matcher(pathname) !== false;
    } catch (err) {
        console.error("Path pattern error:", pattern, err);
        return false;
    }
}

export function middleware(request: NextRequest) {
    const token = request.cookies.get("jwt_token")?.value || request.cookies.get("jwt_refresh")?.value;
    const pathname = request.nextUrl.pathname;

    // Redirect nếu đã đăng nhập mà vào login/register
    if (authPaths.some((path) => isPathMatch(path, pathname)) && token) {
        return NextResponse.redirect(new URL("/", request.url));
    }

    // Redirect nếu chưa đăng nhập mà vào trang bảo vệ
    if (protectedRoutes.some((route) => isPathMatch(route, pathname)) && !token) {
        return NextResponse.redirect(new URL("/auth/login", request.url));
    }
    // // Check nếu vô role admin cần check quyền hạn
    // if (pathname.startsWith("/admin") && !isAdmin(token)) {
    //     return NextResponse.redirect(new URL("/auth/login", request.url));
    // }

    return NextResponse.next();
}

export const config = {
    matcher: [
        "/profile/:path*",
        "/auth/:path*",
        "/carts/:path*",
        "/payments/:path*",
        "/exams/:path*",
        "/admin/:path*",
        "/learn/:path*",
    ],
};
