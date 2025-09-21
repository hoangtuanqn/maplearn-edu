"use client";
import Link from "next/link";
import { MenuItemLink } from "../MenuItemLink";
import SocialLink from "../SocialLink";
import { useAuth } from "~/hooks/useAuth";
import DisplayAvatar from "../../DisplayAvatar";
import { User, GraduationCap, Globe } from "lucide-react";

const SideBarLaptop = () => {
    const { user } = useAuth();

    return (
        <div className="hidden w-[30%] xl:block 2xl:w-[20%]">
            <div
                className="scrollbar sticky w-full space-y-4 overflow-auto"
                style={{ top: "76px", maxHeight: "calc(100vh - 76px)" }}
            >
                {/* User Profile Card */}
                {user ? (
                    <div className="rounded-xl border border-gray-100 bg-white">
                        <Link
                            className="hover:bg-primary/5 flex cursor-pointer items-center justify-start rounded-lg p-3 transition-all duration-200"
                            href="/profile"
                            id="profile"
                        >
                            <DisplayAvatar avatar={user?.avatar} fullName={user?.full_name} ratio="12" />
                            <div className="ml-3 min-w-0 flex-1">
                                <p className="line-clamp-1 font-semibold text-gray-900">{user?.full_name}</p>
                                <p className="line-clamp-1 text-sm text-gray-500">{user?.username}</p>
                            </div>
                        </Link>
                    </div>
                ) : (
                    <div className="rounded-xl border border-gray-100 bg-white p-4">
                        <MenuItemLink title="Đăng nhập" url={"/auth/login"} image="/assets/icons/login.svg" />
                    </div>
                )}

                {/* Navigation Menu */}
                <div className="rounded-xl border border-gray-100 bg-white">
                    {/* Profile Section */}
                    {user && (
                        <div className="border-b border-gray-100 p-4">
                            <div className="mb-3 flex items-center gap-2">
                                <User className="text-primary h-4 w-4" />
                                <span className="text-sm font-medium text-gray-700">Tài khoản</span>
                            </div>
                            <div className="space-y-1">
                                <MenuItemLink
                                    title="Thông tin cá nhân"
                                    url="/profile"
                                    image="/assets/icons/user-info.svg"
                                />
                                <MenuItemLink
                                    title="Khóa học của tôi"
                                    url="/profile/my-courses"
                                    image="/assets/icons/my-courses.svg"
                                />
                            </div>
                        </div>
                    )}

                    {/* Learning Section */}
                    <div className="p-4">
                        <div className="mb-3 flex items-center gap-2">
                            <GraduationCap className="text-primary h-4 w-4" />
                            <span className="text-sm font-medium text-gray-700">Học tập</span>
                        </div>
                        <div className="space-y-1">
                            <MenuItemLink
                                title="Khóa học"
                                url="/courses"
                                image="/assets/icons/course.svg"
                                id="courses"
                            />
                            <MenuItemLink
                                title="Kho đề thi"
                                url="/exams"
                                image="/assets/icons/online-exam.svg"
                                id="exams"
                            />
                        </div>
                    </div>
                </div>

                {/* Social Media Card */}
                <div className="rounded-xl border border-gray-100 bg-white" id="social-media">
                    <div className="p-4">
                        <div className="mb-3 flex items-center gap-2">
                            <Globe className="text-primary h-4 w-4" />
                            <span className="text-sm font-medium text-gray-700">Mạng xã hội</span>
                        </div>
                        <div className="space-y-2">
                            <SocialLink
                                title="Facebook MapLearn"
                                url="https://www.facebook.com/mapstudy.vn"
                                image="/assets/images/social/facebook-circle.png"
                            />
                            <SocialLink
                                title="Youtube MapLearn"
                                url="https://www.youtube.com/@thayvnachuyenluyenthivatly"
                                image="/assets/images/social/youtube-circle.png"
                            />
                            <SocialLink
                                title="Tiktok MapLearn"
                                url="https://www.tiktok.com/@mapstudybook?_t=8mCXhbflE8n&_r=1"
                                image="/assets/images/social/tiktok-circle.png"
                            />
                            <SocialLink
                                title="Messenger MapLearn"
                                url="https://www.facebook.com/messages/t/105592185119255"
                                image="/assets/images/social/messenger-circle.png"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SideBarLaptop;
