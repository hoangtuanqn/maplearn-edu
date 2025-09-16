import { Menu } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const SideBarMobile = () => {
    return (
        <aside className="hidden w-[6rem] pl-6 md:block lg:hidden">
            <div
                className="sticky max-h-[calc(100vh-60px-20px)] w-[100%] overflow-auto rounded-md"
                style={{ top: "56px" }}
            >
                <div className="flex cursor-pointer items-center rounded-md px-4 py-2.5 hover:bg-[rgba(26,79,140,0.06)]">
                    <Menu className="size-6" />
                </div>
                <Link
                    className="flex cursor-pointer items-center rounded-lg px-4 py-2.5 hover:bg-[rgba(26,79,140,0.06)]"
                    href="/courses"
                >
                    <div className="t1-flex-center size-8">
                        <Image width={24} height={24} src="/assets/icons/course.svg" alt="" />
                    </div>
                </Link>
                <Link
                    className="t1-flex cursor-pointer items-center rounded-lg px-4 py-2.5 hover:bg-[rgba(26,79,140,0.06)]"
                    href="/thi-online"
                >
                    <div className="t1-flex-center size-8">
                        <Image width={24} height={24} src="/assets/icons/online-exam.svg" alt="" />
                    </div>
                </Link>
                <Link
                    className="flex cursor-pointer items-center rounded-lg px-4 py-2.5 hover:bg-[rgba(26,79,140,0.06)]"
                    href="/dau-truong-ly-thuyet"
                >
                    <div className="t1-flex-center size-8">
                        <Image width={24} height={24} src="/assets/icons/theory-arena.svg" alt="" />
                    </div>
                </Link>
                <Link
                    className="flex cursor-pointer items-center rounded-lg px-4 py-2.5 hover:bg-[rgba(26,79,140,0.06)]"
                    target="_blank"
                    href="https://www.sachmap.vn/"
                >
                    <div className="t1-flex-center size-8">
                        <Image width={24} height={24} src="/assets/icons/book-map.svg" alt="" />
                    </div>
                </Link>
                <Link
                    className="flex cursor-pointer items-center rounded-lg px-4 py-2.5 hover:bg-[rgba(26,79,140,0.06)]"
                    href={""}
                >
                    <div className="t1-flex-center size-8">
                        <Image width={24} height={24} src="/assets/icons/document.svg" alt="" />
                    </div>
                </Link>
            </div>
        </aside>
    );
};

export default SideBarMobile;
