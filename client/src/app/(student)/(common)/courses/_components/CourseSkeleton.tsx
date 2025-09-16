import React from "react";
import Skeleton from "react-loading-skeleton";

const CourseSkeleton = () => {
    return (
        <div className="flex flex-col">
            <div className="mt-4 flex-1">
                <Skeleton height={221} className="aspect-square w-full !rounded-xl" />
            </div>
            <div className="mt-1 flex-1">
                <Skeleton height={42} className="w-full !rounded-xl" />
            </div>
            <div className="mt-1 flex-1">
                <Skeleton height={18} width={120} className="w-full !rounded-xl" />
            </div>
            <div className="flex-1">
                <Skeleton height={18} width={100} className="w-full !rounded-xl" />
            </div>
            <div>
                <Skeleton height={16} width={100} className="w-full !rounded-xl" />
            </div>
        </div>
    );
};

export default CourseSkeleton;
