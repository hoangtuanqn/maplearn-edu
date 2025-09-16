"use client";
import Link from "next/link";
import { MenuItemLink } from "../MenuItemLink";
import SocialLink from "../SocialLink";
import { useAuth } from "~/hooks/useAuth";
import DisplayAvatar from "../../DisplayAvatar";

const SideBarLaptop = () => {
    const { user } = useAuth();

    return (
        <div className="hidden w-[30%] xl:block 2xl:w-[20%]">
            <div
                className="sticky w-[100%] overflow-auto rounded-md [&>a]:mt-1"
                style={{ top: "76px", maxHeight: "calc(100vh - -76px)" }}
            >
                {user ? (
                    <>
                        <Link
                            className="mb-1 flex cursor-pointer items-center justify-start rounded-lg px-3 py-2 hover:bg-[rgba(26,79,140,0.06)]"
                            href="/profile"
                        >
                            <DisplayAvatar avatar={user?.avatar} fullName={user?.full_name} ratio="10" />
                            <div className="ml-4">
                                <p className="text-primary line-clamp-1 font-medium">{user?.full_name}</p>
                                <p className="text-cp line-clamp-1 text-gray-500">{user?.username}</p>
                            </div>
                        </Link>
                        <MenuItemLink title="Thông tin cá nhân" url="/profile" image="/assets/icons/user-info.svg" />
                        <MenuItemLink
                            title="Khóa học của tôi"
                            url={"/profile/my-courses"}
                            image="/assets/icons/my-courses.svg"
                        />

                        {/* <MenuItemLink
                            title="Hóa đơn của tôi"
                            url={"/profile/saved-courses"}
                            image="/assets/icons/saved-courses.svg"
                        /> */}
                    </>
                ) : (
                    <MenuItemLink title="Đăng nhập" url={"/auth/login"} image="/assets/icons/login.svg" />
                )}
                <div className="my-3 ml-4 h-[1px] w-[calc(100%-1.5rem)] bg-[rgba(0,0,0,0.1)]"></div>
                <MenuItemLink title="Khóa học" url="/courses" image="/assets/icons/course.svg" />
                <MenuItemLink title="Kho đề thi" url={"/exams"} image="/assets/icons/online-exam.svg" />
                <div className="my-4 ml-4 h-[1px] w-[calc(100%-1.5rem)] bg-[rgba(0,0,0,0.1)]"></div>
                <div className="py-2 pl-2">
                    <p className="text-primary text-base font-medium">Mạng xã hội</p>
                </div>
                <div className="text-primary px-2 font-medium">
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
    );
};

export default SideBarLaptop;
