import React from "react";
import Skeleton from "react-loading-skeleton";

const ExamSkeleton = () => {
    return (
        <div className="flex items-start">
            {/* Nội dung bên phải */}
            <div className="flex h-full flex-1 flex-col space-y-6">
                {/* Tiêu đề */}
                <Skeleton className="h-38 w-[80%] !rounded-lg" />
            </div>
        </div>
    );
};

export default ExamSkeleton;
