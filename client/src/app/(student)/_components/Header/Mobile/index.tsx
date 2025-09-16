import Image from "next/image";
import Link from "next/link";
import React from "react";
import { Bell, Search } from "lucide-react";
import HeaderTab from "./HeaderTab";
const HeaderMobile = () => {
    return (
        <div
            className="sticky top-[-54px] z-20 block w-full backdrop-blur-md md:hidden"
            style={{
                backgroundColor: "rgba(255, 255, 255, 0.8)",
                color: "var(--primary)",
                transform: "translateY(0px)",
            }}
        >
            <div className="h-[54px] w-full items-center px-4">
                <div className="flex h-full w-full items-center justify-between">
                    <Link className="h-8" href="/">
                        <span className="sr-only">MapLearn</span>
                        <Image
                            className="object-cover"
                            alt="Logo"
                            src="/assets/images/logo/logo-64.png"
                            width={40}
                            height={40}
                        />
                    </Link>
                    <div className="flex h-8 items-center gap-3">
                        <button
                            className="t1-flex-center aspect-square w-full cursor-pointer rounded-full bg-[rgba(26,79,140,0.06)] px-3 py-3"
                            aria-expanded="false"
                        >
                            <Search color="var(--primary)" />
                        </button>
                        <button
                            className="t1-flex-center aspect-square w-full cursor-pointer rounded-full bg-[rgba(26,79,140,0.06)] px-3 py-3"
                            aria-expanded="false"
                        >
                            <Bell color="var(--primary)" fill="currentColor" />
                        </button>
                    </div>
                </div>
            </div>
            <HeaderTab />
        </div>
    );
};

export default HeaderMobile;
