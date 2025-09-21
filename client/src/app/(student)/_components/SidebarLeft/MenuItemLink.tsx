import Link from "next/link";
import { SidebarType } from "./entities.type";
import Image from "next/image";

export const MenuItemLink = ({ title, image, url, className, id }: SidebarType) => {
    return (
        <Link
            className="hover:bg-primary/5 hover:text-primary group flex cursor-pointer items-center justify-start rounded-lg px-3 py-2.5 transition-all duration-200"
            href={url}
            id={id}
        >
            <div className="flex items-center justify-center">
                <Image
                    width={20}
                    height={20}
                    src={image}
                    alt={title}
                    className={`transition-opacity group-hover:opacity-80 ${className}`}
                />
            </div>
            <p className="group-hover:text-primary ml-3 text-sm font-medium text-gray-700 transition-colors">{title}</p>
        </Link>
    );
};
