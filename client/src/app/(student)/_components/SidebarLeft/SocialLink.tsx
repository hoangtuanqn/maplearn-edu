import Image from "next/image";
import { SidebarType } from "./entities.type";
import Link from "next/link";

export default function SocialLink({ title, url, image }: SidebarType) {
    return (
        <Link target="_blank" className="flex cursor-pointer items-center py-1.5" href={url}>
            <Image src={image} className="h-10 w-10 rounded-full" alt="Social" width={40} height={40} />
            <p className="text-primary ml-2">{title}</p>
        </Link>
    );
}
