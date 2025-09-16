import React from "react";
import Skeleton from "react-loading-skeleton";

const QuestionSkeleton = () => {
    return (
        <div className="flex h-full flex-1 flex-col space-y-1">
            {/* Tiêu đề */}
            <Skeleton className="h-20 w-[80%]" />
            <Skeleton className="h-8" width={80} />
            <Skeleton className="h-8" width={80} />
            <Skeleton className="h-8" width={80} />
            <Skeleton className="h-8" width={80} />
        </div>
    );
};

export default QuestionSkeleton;
