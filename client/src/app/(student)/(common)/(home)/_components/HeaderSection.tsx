import { TrendingUp } from "lucide-react";
import Link from "next/link";
interface HeaderSectionType {
    title: string;
    url?: string;
}
const HeaderSection = ({ title, url = "" }: HeaderSectionType) => {
    return (
        <div className="t1-flex-center justify-between">
            <div className="t1-flex-center gap-2">
                <div className="bg-primary h-4 w-1"></div>
                <h3 className="block-heading font-extrabold uppercase">
                    <span className="bg-[linear-gradient(90deg,_#3899D1_13.99%,_#1C51CA_104.92%)] bg-clip-text font-bold text-transparent">
                        {title}
                    </span>
                </h3>
            </div>
            {url && (
                <Link href={url} className="t1-flex-center justify-between gap-1 text-gray-500 italic">
                    <span>Xem tất cả</span>
                    <TrendingUp />
                </Link>
            )}
        </div>
    );
};

export default HeaderSection;
