"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ElementType } from "react";
import { isActiveRoute } from "~/libs/routeMatcher";
export type ItemLinkType = {
    icon: ElementType;
    label: string;
    href: string;
    iconColor?: string;
    macher: string[];
};
const HeaderLink = ({ label, icon: Icon, href, macher }: ItemLinkType) => {
    const pathname = usePathname();

    return (
        <Link className="cursor-pointer" href={href}>
            <div className="h-max w-max">
                <div
                    className="view_tooltip flex items-center duration-200 hover:scale-110 md:px-4 lg:px-6"
                    data-tooltip-content={label}
                    style={{ height: "56px" }}
                >
                    <Icon isActive={isActiveRoute(pathname, macher)} />
                </div>
            </div>
        </Link>
    );
};

export default HeaderLink;
