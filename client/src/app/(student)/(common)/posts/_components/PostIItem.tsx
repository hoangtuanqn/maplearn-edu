import React from "react";
import { NewType } from "../../../_components/SidebarLeft/entities.type";
import { CalendarRange } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const PostIItem = ({ title, url, image, createdAt }: NewType) => {
    return (
        <div className="bg-white shadow-sm sm:rounded-lg">
            <Link href={url}>
                <div className="flex gap-4 p-3">
                    <div className="aspect-square w-16 shrink-0 overflow-hidden rounded-md">
                        <Image width={56} height={56} alt={title} className="w-full object-cover" src={image} />
                    </div>
                    <div className="flex flex-col justify-around">
                        <div className="text-primary mb-2 line-clamp-3 text-[14.75px] font-semibold">{title}</div>
                        <div className="flex items-center gap-1.5 text-[#979797]">
                            <CalendarRange className="h-4.5 w-4.5 text-[#979797]" />
                            <span className="-mb-[3px] text-xs">{createdAt}</span>
                        </div>
                    </div>
                </div>
            </Link>
        </div>
    );
};

export default PostIItem;
