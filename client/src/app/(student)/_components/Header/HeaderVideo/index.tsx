"use client";
import { ArrowLeft, Home, BookOpen } from "lucide-react";
import Link from "next/link";
import React, { useRef } from "react";
import { useAuth } from "~/hooks/useAuth";
import DisplayAvatar from "../../DisplayAvatar";
import LogoMapLearn from "../components/LogoMapLearn";

const HeaderVideo = ({ title }: { title: string }) => {
    const { user } = useAuth();

    const menuRef = useRef<HTMLDivElement>(null);

    return (
        <header className="relative z-50 w-full">
            <div className="bg-primary fixed top-0 w-full border-b border-gray-200/20 backdrop-blur-lg">
                <div className="flex h-14 w-full items-center justify-between px-4 lg:px-6">
                    {/* Left Section - Back & Title */}
                    <div className="flex items-center gap-3">
                        <Link
                            href="/profile/my-courses"
                            className="group flex h-9 w-9 items-center justify-center rounded-full bg-white/20 transition-all duration-200 hover:bg-white/30"
                        >
                            <ArrowLeft className="h-4 w-4 text-white transition-transform group-hover:-translate-x-0.5" />
                        </Link>

                        <div className="flex items-center gap-2">
                            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/20">
                                <BookOpen className="h-4 w-4 text-white" />
                            </div>
                            <div className="hidden sm:block">
                                <h1 className="line-clamp-1 text-sm font-semibold text-white">{title}</h1>
                                <p className="text-xs text-white/70">Chương học</p>
                            </div>
                        </div>
                    </div>

                    {/* Center Section - Logo (Hidden on mobile) */}
                    <LogoMapLearn />

                    {/* Right Section - Actions */}
                    <div className="flex items-center gap-2">
                        {/* Quick Navigation - Desktop Only */}
                        <div className="hidden items-center gap-1 lg:flex">
                            <Link
                                href="/"
                                className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-white/80 transition-colors hover:bg-white/10 hover:text-white"
                            >
                                <Home className="h-4 w-4" />
                                <span>Trang chủ</span>
                            </Link>
                            <Link
                                href="/profile/my-courses"
                                className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-white/80 transition-colors hover:bg-white/10 hover:text-white"
                            >
                                <BookOpen className="h-4 w-4" />
                                <span>Khóa học</span>
                            </Link>
                        </div>

                        {/* User Menu */}
                        {user && (
                            <div className="relative" ref={menuRef}>
                                <Link
                                    href={"/profile"}
                                    className="flex items-center gap-2 rounded-lg bg-white/20 p-1.5 transition-colors hover:bg-white/30"
                                >
                                    <DisplayAvatar avatar={user.avatar} fullName={user.full_name} ratio="7" />
                                    <div className="hidden text-left sm:block">
                                        <p className="line-clamp-1 max-w-24 text-sm font-medium text-white">
                                            {user.full_name}
                                        </p>
                                    </div>
                                </Link>
                            </div>
                        )}
                    </div>
                </div>
            </div>
            <div className="h-14 w-full" />
        </header>
    );
};

export default HeaderVideo;
