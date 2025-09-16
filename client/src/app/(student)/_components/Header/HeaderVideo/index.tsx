import { Bell, MoveLeft } from "lucide-react";
import Link from "next/link";
import React from "react";

const HeaderVideo = ({ title }: { title: string }) => {
    return (
        <header className="relative z-30 w-full">
            <div className="fixed top-0 flex h-[56px] w-full justify-center bg-[#155e94] backdrop-blur-md">
                <div className="tab:px-6 lap:px-8 flex w-full flex-1 items-center justify-between px-4 py-2.5">
                    <div className="flex items-center gap-3 text-white">
                        <Link className="cursor-pointer" href="/profile/my-courses">
                            <MoveLeft className="size-5!" />
                        </Link>
                        <span className="text-base font-semibold">Chương: {title}</span>
                    </div>
                    <div className="flex items-center justify-end gap-6">
                        <div className="mx-auto flex items-center gap-6">
                            <Link className="cursor-pointer" href="/">
                                <div className="h-max w-max">
                                    <svg
                                        className="h-6.5 w-6.5 duration-200 hover:scale-110"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            d="M12 18V15"
                                            stroke="white"
                                            strokeWidth={2}
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        />
                                        <path
                                            d="M10.07 2.81997L3.14002 8.36997C2.36002 8.98997 1.86002 10.3 2.03002 11.28L3.36002 19.24C3.60002 20.66 4.96002 21.81 6.40002 21.81H17.6C19.03 21.81 20.4 20.65 20.64 19.24L21.97 11.28C22.13 10.3 21.63 8.98997 20.86 8.36997L13.93 2.82997C12.86 1.96997 11.13 1.96997 10.07 2.81997Z"
                                            stroke="white"
                                            strokeWidth={2}
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        />
                                    </svg>
                                </div>
                            </Link>
                            <Link href="/profile/my-courses">
                                <div className="h-max w-max">
                                    <svg
                                        className="h-6.5 w-6.5 duration-200 hover:scale-110"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            d="M17.234 15.6155C17.9598 15.1786 18.9132 15.6552 18.9132 16.4497V17.7307C18.9132 18.9919 17.8407 20.3425 16.5515 20.7397L13.0957 21.7923C12.489 21.981 11.5032 21.981 10.9073 21.7923L7.45151 20.7397C6.15151 20.3425 5.08984 18.9919 5.08984 17.7307V16.4398C5.08984 15.6552 6.04318 15.1786 6.75818 15.6056L8.98984 16.9363C9.84568 17.4626 10.929 17.7208 12.0123 17.7208C13.0957 17.7208 14.179 17.4626 15.0348 16.9363L17.234 15.6155Z"
                                            fill="white"
                                        />
                                        <path
                                            d="M20.6442 6.49401L14.155 2.5913C12.985 1.88623 11.0567 1.88623 9.88667 2.5913L3.365 6.49401C1.27417 7.73533 1.27417 10.5457 3.365 11.7969L5.09833 12.8297L9.88667 15.6897C11.0567 16.3948 12.985 16.3948 14.155 15.6897L18.9108 12.8297L20.395 11.936V14.9747C20.395 15.3819 20.7633 15.7195 21.2075 15.7195C21.6517 15.7195 22.02 15.3819 22.02 14.9747V10.0889C22.4533 8.80783 22.0092 7.31825 20.6442 6.49401Z"
                                            fill="white"
                                        />
                                    </svg>
                                </div>
                            </Link>
                        </div>
                        <div className="max-tab:hidden h-6 w-[1px] bg-white" />
                        <div className="flex items-center gap-2">
                            <div className="t1-flex-center h-10.5 w-10.5 cursor-pointer rounded-full border-2 border-[#b4d1e9] bg-white p-px">
                                <Bell className="text-primary" />
                            </div>
                            <div className="dropdown" style={{ position: "relative" }}>
                                <div>
                                    <div className="flex cursor-pointer items-center gap-1">
                                        <div className="h-10.5 w-10.5 rounded-full border-2 border-[#b4d1e9] p-0.5">
                                            <div
                                                className="t1-flex-center shrink-0 rounded-full bg-gradient-to-b from-[#dadada] to-[#bebebe] font-medium text-white"
                                                style={{
                                                    width: "100%",
                                                    height: "100%",
                                                    fontSize: "1.15rem",
                                                    lineHeight: "1.15rem",
                                                }}
                                            >
                                                T
                                            </div>
                                        </div>
                                        <svg
                                            className="h-4.5 w-4.5 rotate-90"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <path
                                                d="M8.91003 19.9201L15.43 13.4001C16.2 12.6301 16.2 11.3701 15.43 10.6001L8.91003 4.08008"
                                                stroke="white"
                                                strokeWidth={2}
                                                strokeMiterlimit={10}
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                            />
                                        </svg>
                                    </div>
                                </div>
                                <div
                                    style={{
                                        position: "absolute",
                                        width: "max-content",
                                        zIndex: 20,
                                        top: "120%",
                                        right: 0,
                                        left: "auto",
                                        transitionDuration: "150ms",
                                        transitionTimingFunction: "ease-in-out",
                                        transform: "scale(0.9)",
                                        opacity: 0,
                                        visibility: "hidden",
                                    }}
                                >
                                    <div className="w-36 rounded-lg bg-white p-1 shadow-md">
                                        <a href="/ca-nhan">
                                            <button className="text-primary-typo w-full rounded-md px-2 py-1.5 text-left duration-150 hover:bg-[#ededed]">
                                                Cá nhân
                                            </button>
                                        </a>
                                        <button className="w-full rounded-md px-2 py-1.5 text-left text-red-500 duration-150 hover:bg-[#ededed]">
                                            Đăng xuất
                                        </button>
                                    </div>
                                </div>
                                <div
                                    style={{
                                        position: "absolute",
                                        zIndex: 10,
                                        opacity: 0,
                                        width: "100%",
                                        top: "100%",
                                        height: "calc(20%)",
                                        visibility: "hidden",
                                    }}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="w-full" style={{ height: 56 }} />
        </header>
    );
};

export default HeaderVideo;
