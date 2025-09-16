import React from "react";
import Skeleton from "react-loading-skeleton";

const FilterSkeleton = () => {
    return (
        <div className="items-star flex gap-2">
            <Skeleton width={18} className="h-5 shrink-0 !rounded-md" />
            <div className="flex h-full flex-1 flex-col space-y-6">
                {/* Tiêu đề */}
                <Skeleton className="h-5 w-[80%] !rounded-lg" />
            </div>
        </div>
    );
};

export default FilterSkeleton;
