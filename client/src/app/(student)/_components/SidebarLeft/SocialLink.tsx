import Image from "next/image";
import { SidebarType } from "./entities.type";
import Link from "next/link";

export default function SocialLink({ title, url, image }: SidebarType) {
    return (
        <Link
            target="_blank"
            className="hover:bg-primary/5 group flex cursor-pointer items-center rounded-lg px-3 py-2.5 transition-all duration-200"
            href={url}
        >
            <Image
                src={image}
                className="h-8 w-8 rounded-full transition-transform group-hover:scale-110"
                alt="Social"
                width={32}
                height={32}
            />
            <p className="group-hover:text-primary ml-3 text-sm text-gray-700 transition-colors">{title}</p>
        </Link>
    );
}
