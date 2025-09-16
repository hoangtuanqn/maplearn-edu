"use client";
import { ItemLinkType } from "../../Header/Laptop/HeaderLink";
import Link from "next/link";
// @ts-expect-error: no types for @mycv/f8-notification
import { initNotifications } from "@mycv/f8-notification";
import { useEffect } from "react";
import { isActiveRoute } from "~/libs/routeMatcher";
import { usePathname } from "next/navigation";

const FooterMobileLink = ({ label, icon: Icon, href, iconColor = "var(--primary-light)", macher }: ItemLinkType) => {
    const pathname = usePathname();

    const isActive = macher.some((m: string) => isActiveRoute(pathname, [m]));
    useEffect(() => {
        initNotifications({ cooldown: 1000 });
    }, []);

    return (
        <li className="flex-1">
            <Link className="t1-flex-center relative flex h-full w-full flex-col gap-0.5" href={href}>
                <div className="t1-flex-center h-7 w-7">
                    <Icon color={iconColor} isActive={isActive} />
                </div>
                <span
                    className={`text-center text-xs md:text-sm ${
                        isActive ? "text-primary font-bold" : "text-gray-600"
                    }`}
                >
                    {label}
                </span>
            </Link>
        </li>
    );
};

export default FooterMobileLink;
