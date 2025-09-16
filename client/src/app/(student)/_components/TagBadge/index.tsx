import { ReactNode } from "react";

type TagBadgeProps = {
    children: ReactNode;
    className?: string;
};

const TagBadge = ({ children, className = "" }: TagBadgeProps) => (
    <div
        className={`t1-flex-center bg-primary min-w-max rounded-full px-3 py-1 text-[13.125px] text-white ${className}`}
    >
        {children}
    </div>
);

export default TagBadge;
