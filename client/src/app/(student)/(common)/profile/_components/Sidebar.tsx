"use client";
import { useAuth } from "~/hooks/useAuth";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { ChevronRight, ContactRound, GraduationCap, ReceiptCent, User } from "lucide-react";
import { ElementType } from "react";
import DisplayAvatar from "~/app/(student)/_components/DisplayAvatar";
import { isActiveRoute } from "~/libs/routeMatcher";

type SidebarProfileLinkProps = {
    pathname: string;
    url: string;
    matcher: string[];
    Icon: ElementType;
    name: string;
    description: string;
};

const SidebarProfileLink = ({ pathname, url, matcher, Icon, name, description }: SidebarProfileLinkProps) => (
    <Link href={url} className="group block">
        <div
            className={`relative flex w-full cursor-pointer items-center gap-4 rounded-xl border p-4 transition-all duration-200 ${
                isActiveRoute(pathname, matcher)
                    ? "border-blue-200 bg-blue-50 shadow-sm"
                    : "border-gray-100 bg-white hover:border-gray-200 hover:bg-gray-50 hover:shadow-sm"
            }`}
        >
            <div
                className={`flex h-10 w-10 items-center justify-center rounded-lg ${
                    isActiveRoute(pathname, matcher)
                        ? "bg-blue-100 text-blue-600"
                        : "bg-gray-100 text-gray-600 group-hover:bg-gray-200"
                }`}
            >
                <Icon size={18} />
            </div>
            <div className="flex-1">
                <div className={`font-medium ${isActiveRoute(pathname, matcher) ? "text-blue-900" : "text-gray-900"}`}>
                    {name}
                </div>
                <div className="mt-0.5 text-xs text-gray-500">{description}</div>
            </div>
            <ChevronRight
                size={16}
                className={`transition-colors ${isActiveRoute(pathname, matcher) ? "text-blue-500" : "text-gray-400"}`}
            />
        </div>
    </Link>
);

const sidebarMenuLink = [
    {
        url: "/profile",
        matcher: ["/profile", "/profile/edit", "/profile/change-password"],
        name: "Thông tin cá nhân",
        description: "Quản lý thông tin tài khoản",
        icon: ContactRound,
    },
    {
        url: "/profile/my-courses",
        matcher: ["/profile/my-courses"],
        name: "Khóa học của tôi",
        description: "Xem các khóa học đã đăng ký",
        icon: GraduationCap,
    },
    {
        url: "/profile/payments",
        matcher: ["/profile/payments"],
        name: "Hóa đơn của tôi",
        description: "Lịch sử thanh toán và hóa đơn",
        icon: ReceiptCent,
    },
];

const ProfileSidebar = () => {
    const { user: profile } = useAuth();
    const pathname = usePathname();

    return (
        <div className="hidden h-fit shrink-0 lg:block xl:w-[380px] 2xl:w-[30%]">
            {/* Header Card */}
            <div className="rounded-xl border border-gray-100 bg-white p-6 shadow-sm">
                <div className="flex flex-col items-center text-center">
                    <div className="relative mb-4">
                        <DisplayAvatar avatar={profile?.avatar} fullName={profile?.full_name} ratio="20" />
                        <div className="absolute -right-1 -bottom-1 flex h-6 w-6 items-center justify-center rounded-full border-2 border-white bg-green-500">
                            <div className="h-2 w-2 rounded-full bg-white"></div>
                        </div>
                    </div>
                    <div className="space-y-1">
                        <h3 className="text-lg font-semibold text-gray-900">{profile?.full_name}</h3>
                        <p className="text-sm text-gray-500">{profile?.email}</p>
                        <div className="mt-2 flex items-center justify-center gap-2">
                            <User size={12} className="text-gray-400" />
                            <span className="rounded-full bg-gray-100 px-2 py-1 text-xs text-gray-500">
                                {profile?.role === "teacher"
                                    ? "Giáo viên"
                                    : profile?.role === "admin"
                                      ? "Quản trị viên"
                                      : "Học viên"}
                            </span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Navigation Menu */}
            <div className="mt-4 space-y-2">
                {sidebarMenuLink.map((link) => (
                    <SidebarProfileLink
                        key={link.url}
                        pathname={pathname}
                        url={link.url}
                        matcher={link.matcher}
                        Icon={link.icon}
                        name={link.name}
                        description={link.description}
                    />
                ))}
            </div>

            {/* Support Card */}
            <div className="mt-6 rounded-xl border border-gray-100 bg-gradient-to-br from-blue-50 to-indigo-50 p-4">
                <div className="text-center">
                    <div className="mb-2 text-sm font-medium text-gray-900">Cần hỗ trợ?</div>
                    <p className="mb-3 text-xs text-gray-600">Liên hệ với chúng tôi để được hỗ trợ nhanh chóng</p>
                    <Link
                        href="mailto:phamhoangtuanqn@gmail.com"
                        className="w-full rounded-lg border border-gray-200 bg-white px-3 py-2 text-xs font-medium text-gray-700 shadow-sm transition-colors hover:bg-gray-50"
                    >
                        Liên hệ hỗ trợ
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default ProfileSidebar;
