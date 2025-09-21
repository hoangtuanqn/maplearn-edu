"use client";
import React from "react";
import Link from "next/link";
import HomeIcon from "../../Icons/HomeIcon";
import GraduationIcon from "../../Icons/GraduationIcon";
import DocumentIcon from "../../Icons/DocumentIcon";
import NewsIcon from "../../Icons/NewsIcon";
import Image from "next/image";
import HeaderLink from "./HeaderLink";
import BlurBackdrop from "../BlurBackdrop";
import { Button } from "~/components/ui/button";
import { useSelector } from "react-redux";
import { RootState } from "~/store";
import { ChevronDown, User, CreditCard, BookOpen, LogOut, Shield, GraduationCap } from "lucide-react";
import { useAuth } from "~/hooks/useAuth";
import DisplayAvatar from "../../DisplayAvatar";
import Notification from "./Notification";
const headerLinks = [
    {
        label: "Trang chủ",
        icon: HomeIcon,
        href: "/",
        macher: ["/"],
    },
    {
        label: "Khóa học",
        icon: GraduationIcon,
        href: "/courses",
        macher: ["/courses"],
    },
    {
        label: "Đề thi thử",
        icon: DocumentIcon,
        href: "/exams",
        macher: ["/exams"],
    },
    {
        label: "Tin tức",
        icon: NewsIcon,
        href: "/posts",
        macher: ["/posts", "/posts/:slug"],
    },
];
const HeaderLaptop = () => {
    const user = useSelector((state: RootState) => state.user.user);
    const { logout } = useAuth();

    return (
        <>
            <header className="fixed top-0 z-30 hidden w-full md:block">
                <div className="padding-scrollbar text-primary flex h-[64px] w-full items-center border-b border-gray-200/60 bg-white/85 shadow-sm backdrop-blur-sm">
                    <div className="max-w-8xl mx-auto w-full items-center px-4 pl-6.5">
                        <div className="flex w-full items-center justify-between">
                            <div className="flex items-center max-xl:hidden">
                                <Link className="group flex cursor-pointer items-center gap-3" href={"/"}>
                                    <div className="flex items-center justify-center rounded-xl bg-gray-100 p-1 shadow-sm transition-transform duration-200 group-hover:scale-105">
                                        <Image
                                            width={36}
                                            height={36}
                                            className="rounded-lg object-contain"
                                            alt="MapLearn Logo"
                                            src="/assets/images/logo/logo-64.png"
                                        />
                                    </div>
                                    <div className="hidden lg:block">
                                        <h1 className="text-primary text-xl font-bold tracking-tight">MapLearn</h1>
                                        <p className="mt-0.5 text-xs font-normal text-gray-400">
                                            Nền tảng học tập thông minh
                                        </p>
                                    </div>
                                </Link>
                            </div>
                            <div className="flex shrink-1 justify-center">
                                <div className="relative flex items-center">
                                    <div className="relative">
                                        <div data-el="portal-host" id="navigation" className="relative">
                                            <div className="mx-auto flex items-center p-1.5">
                                                {headerLinks.map((link) => (
                                                    <HeaderLink key={link.href} {...link} />
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="flex items-center justify-end gap-3">
                                {user ? (
                                    <div className="flex items-center gap-3">
                                        {/* User Dropdown */}
                                        <div className="group relative">
                                            <div className="flex cursor-pointer items-center gap-3 rounded-lg p-2 transition-all duration-200">
                                                <DisplayAvatar
                                                    avatar={user.avatar}
                                                    fullName={user.full_name}
                                                    ratio="8"
                                                />
                                                <div className="hidden text-left md:block">
                                                    <p className="max-w-28 truncate text-sm font-medium text-gray-900">
                                                        {user.full_name}
                                                    </p>
                                                    <p className="flex items-center gap-1 text-xs text-gray-500">
                                                        {user.role === "admin" && <Shield className="h-3 w-3" />}
                                                        {user.role === "teacher" && (
                                                            <GraduationCap className="h-3 w-3" />
                                                        )}
                                                        {user.role === "student" && <User className="h-3 w-3" />}
                                                        {user.role === "admin"
                                                            ? "Quản trị viên"
                                                            : user.role === "teacher"
                                                              ? "Giảng viên"
                                                              : "Học sinh"}
                                                    </p>
                                                </div>
                                                <ChevronDown className="h-4 w-4 text-gray-500" />
                                            </div>

                                            {/* Simple Dropdown Menu */}
                                            <div className="invisible absolute top-full right-0 z-50 mt-2 w-60 rounded-lg border border-gray-200 bg-white py-2 opacity-0 shadow-lg transition-all duration-200 group-hover:visible group-hover:opacity-100">
                                                {/* User Info */}
                                                <div className="border-b border-gray-100 px-4 py-3">
                                                    <p className="font-medium text-gray-900">{user.full_name}</p>
                                                    <p className="line-clamp-1 text-sm text-gray-500">{user.email}</p>
                                                </div>

                                                {/* Menu Items */}
                                                <div className="py-1">
                                                    {user.role === "admin" && (
                                                        <Link
                                                            href="/admin"
                                                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                                        >
                                                            <div className="flex items-center gap-2">
                                                                <Shield className="h-4 w-4" />
                                                                Quản lý hệ thống
                                                            </div>
                                                        </Link>
                                                    )}
                                                    {user.role === "teacher" && (
                                                        <Link
                                                            href="/teacher"
                                                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                                        >
                                                            <div className="flex items-center gap-2">
                                                                <Shield className="h-4 w-4" />
                                                                Quản lý giảng dạy
                                                            </div>
                                                        </Link>
                                                    )}

                                                    <Link
                                                        href="/profile"
                                                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                                    >
                                                        <div className="flex items-center gap-2">
                                                            <User className="h-4 w-4" />
                                                            Thông tin cá nhân
                                                        </div>
                                                    </Link>

                                                    <Link
                                                        href="/profile/my-courses"
                                                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                                    >
                                                        <div className="flex items-center gap-2">
                                                            <BookOpen className="h-4 w-4" />
                                                            Khóa học của tôi
                                                        </div>
                                                    </Link>

                                                    <Link
                                                        href="/profile/payments"
                                                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                                    >
                                                        <div className="flex items-center gap-2">
                                                            <CreditCard className="h-4 w-4" />
                                                            Lịch sử thanh toán
                                                        </div>
                                                    </Link>
                                                </div>

                                                {/* Logout */}
                                                <div className="border-t border-gray-100">
                                                    <button
                                                        onClick={() => logout()}
                                                        className="w-full cursor-pointer px-4 py-2 text-left text-sm text-red-600 hover:bg-red-50"
                                                    >
                                                        <div className="flex items-center gap-2">
                                                            <LogOut className="h-4 w-4" />
                                                            Đăng xuất
                                                        </div>
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                        {/* Notification Bell */}
                                        <Notification />
                                    </div>
                                ) : (
                                    <div className="flex items-center gap-3">
                                        <Link href={"/auth/register"}>
                                            <Button variant={"primary"}>Đăng ký</Button>
                                        </Link>
                                        <Link href={"/auth/login"}>
                                            <Button variant={"outline"}>Đăng nhập</Button>
                                        </Link>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
                <div className="w-full"></div>
            </header>
            <BlurBackdrop />

            {/* Enhanced CSS for dropdown */}
            <style jsx>{`
                .dropdown:hover .dropdown-menu,
                .dropdown:focus-within .dropdown-menu {
                    opacity: 1 !important;
                    visibility: visible !important;
                    transform: translateY(0) scale(1) !important;
                }

                .dropdown-menu {
                    transform: translateY(-10px) scale(0.95);
                    transition: all 0.2s ease-out;
                }

                @media (max-width: 768px) {
                    .dropdown-menu {
                        width: 260px;
                        right: -20px;
                    }
                }
            `}</style>
        </>
    );
};

export default HeaderLaptop;
