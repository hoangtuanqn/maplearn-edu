import React from "react";
import Skeleton from "react-loading-skeleton";
const PostSkeleton = () => {
    return (
        <div className="flex items-start gap-3 py-3">
            {/* Ảnh thumbnail (hình vuông) */}
            <Skeleton width={80} height={80} className="shrink-0 rounded-md" />

            {/* Nội dung bên phải */}
            <div className="flex h-full flex-1 flex-col space-y-6">
                {/* Tiêu đề */}
                <Skeleton className="h-10 w-[80%]" />
                {/* Thời gian tạo */}
                <Skeleton className="h-3 w-[40%]" />
            </div>
        </div>
    );
};

export default PostSkeleton;
