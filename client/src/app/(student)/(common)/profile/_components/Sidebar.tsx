"use client";
import { useAuth } from "~/hooks/useAuth";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { ChevronRight, ContactRound, GraduationCap, ReceiptCent } from "lucide-react";
import { ElementType } from "react";
import DisplayAvatar from "~/app/(student)/_components/DisplayAvatar";
import { isActiveRoute } from "~/libs/routeMatcher";
type SidebarProfileLinkProps = {
    pathname: string;
    url: string;
    matcher: string[];
    Icon: ElementType;
    name: string;
};
const SidebarProfileLink = ({ pathname, url, matcher, Icon, name }: SidebarProfileLinkProps) => (
    <Link href={url}>
        <div
            className={`flex w-full cursor-pointer items-center gap-3 rounded-lg px-3 py-2 duration-100 ${
                isActiveRoute(pathname, matcher) ? "bg-primary text-white" : "hover:bg-gray-100"
            }`}
        >
            <div className="t1-flex-center w-6">
                <Icon className={isActiveRoute(pathname, matcher) ? "text-white" : "text-primary"} />
            </div>
            <div className="grow">{name}</div>
            <ChevronRight />
        </div>
    </Link>
);

const sidebarMenuLink = [
    {
        url: "/profile",
        matcher: ["/profile", "/profile/edit", "/profile/change-password"],
        name: "Thông tin cá nhân",
        icon: ContactRound,
    },
    {
        url: "/profile/my-courses",
        matcher: ["/profile/my-courses"],
        name: "Khóa học của tôi",
        icon: GraduationCap,
    },

    {
        url: "/profile/payments",
        matcher: ["/profile/payments"],
        name: "Hóa đơn của tôi",
        icon: ReceiptCent,
    },
];

const ProfileSidebar = () => {
    const { user: profile } = useAuth();
    const pathname = usePathname();
    return (
        <div
            className="hidden h-fit shrink-0 rounded-xl p-4 px-8 shadow-sm md:shadow-sm lg:block xl:w-[360px] 2xl:w-[28%]"
            style={{ backgroundColor: "rgb(255, 255, 255)" }}
        >
            <div className="t1-flex-center flex-col gap-5 py-8">
                <DisplayAvatar avatar={profile?.avatar} fullName={profile?.full_name} ratio="24" />
                <div>
                    <div className="text-center text-xl font-medium">{profile?.full_name}</div>
                    <div className="mt-1 text-center text-gray-500">{profile?.email}</div>
                </div>
            </div>
            <div className="h-px w-full bg-gray-300" />
            <div className="flex flex-col gap-1 py-4">
                {sidebarMenuLink.map((link) => (
                    <SidebarProfileLink
                        key={link.url}
                        pathname={pathname}
                        url={link.url}
                        matcher={link.matcher}
                        Icon={link.icon}
                        name={link.name}
                    />
                ))}
            </div>
        </div>
    );
};

export default ProfileSidebar;
