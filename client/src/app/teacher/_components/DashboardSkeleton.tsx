import React from "react";
import Skeleton from "react-loading-skeleton";

const DashboardSkeleton = () => {
    return (
        <div className="min-h-screen bg-white p-6">
            {/* Header Skeleton */}
            <div className="mb-8 flex items-center justify-between">
                <div>
                    <Skeleton height={32} width={300} className="mb-2" />
                    <Skeleton height={16} width={400} />
                </div>
                <div className="flex items-center gap-2">
                    <Skeleton height={36} width={120} />
                    <Skeleton height={36} width={100} />
                </div>
            </div>

            {/* 4 Cards Skeleton - Thống kê tổng quan */}
            <div className="mb-8 grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-4">
                {[...Array(4)].map((_, i) => (
                    <div key={i} className="rounded-lg border border-gray-100 bg-white p-6 shadow-sm">
                        <div className="flex items-center justify-between">
                            <div className="flex-1">
                                <Skeleton height={14} width={80} className="mb-2" />
                                <Skeleton height={28} width={100} className="mb-3" />
                                <div className="flex items-center">
                                    <Skeleton height={16} width={16} className="mr-2 rounded-full" />
                                    <Skeleton height={14} width={60} className="mr-1" />
                                    <Skeleton height={14} width={70} />
                                </div>
                            </div>
                            <div className="ml-4">
                                <Skeleton height={48} width={48} className="rounded-lg" />
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Row 1: Biểu đồ doanh thu và Phân bố khóa học */}
            <div className="mb-6 grid grid-cols-1 gap-3 lg:grid-cols-2">
                {/* Biểu đồ doanh thu */}
                <div className="rounded-lg border border-gray-100 bg-white p-6 shadow-sm">
                    <div className="mb-4 flex items-center justify-between">
                        <div>
                            <Skeleton height={20} width={100} className="mb-1" />
                            <Skeleton height={12} width={200} />
                        </div>
                        <div className="flex items-center gap-2">
                            <Skeleton height={14} width={30} />
                            <Skeleton height={12} width={120} />
                            <div className="flex items-center gap-1">
                                <Skeleton height={32} width={32} className="rounded" />
                                <Skeleton height={14} width={30} />
                                <Skeleton height={32} width={32} className="rounded" />
                            </div>
                        </div>
                    </div>
                    <div className="h-80">
                        <Skeleton height="100%" />
                    </div>
                </div>

                {/* Biểu đồ phân bố */}
                <div className="rounded-lg border border-gray-100 bg-white p-6 shadow-sm">
                    <div className="mb-4 flex items-center justify-between">
                        <Skeleton height={20} width={150} />
                        <Skeleton height={14} width={80} />
                    </div>
                    <div className="h-80">
                        <Skeleton height="100%" />
                    </div>
                </div>
            </div>

            {/* Row 2: Biểu đồ hoạt động và Thống kê thanh toán */}
            <div className="mb-6 grid grid-cols-1 gap-3 lg:grid-cols-3">
                {/* Biểu đồ hoạt động - 2 columns */}
                <div className="rounded-lg border border-gray-100 bg-white p-6 shadow-sm lg:col-span-2">
                    <div className="mb-4 flex items-center justify-between">
                        <div>
                            <Skeleton height={20} width={100} className="mb-1" />
                            <Skeleton height={12} width={250} />
                        </div>
                        <div className="flex items-center gap-2">
                            <Skeleton height={14} width={180} />
                            <Skeleton height={12} width={140} />
                            <div className="flex items-center gap-1">
                                <Skeleton height={32} width={32} className="rounded" />
                                <Skeleton height={14} width={30} />
                                <Skeleton height={32} width={32} className="rounded" />
                            </div>
                        </div>
                    </div>
                    <div className="h-80">
                        <Skeleton height="100%" />
                    </div>
                </div>

                {/* Thống kê thanh toán */}
                <div className="rounded-lg border border-gray-100 bg-white p-6 shadow-sm">
                    <div className="mb-4 flex items-center justify-between">
                        <Skeleton height={20} width={100} />
                        <Skeleton height={14} width={80} />
                    </div>
                    <div className="space-y-4">
                        {[...Array(4)].map((_, i) => (
                            <div key={i} className="flex items-center justify-between">
                                <div className="flex items-center space-x-3">
                                    <Skeleton height={12} width={12} className="rounded-full" />
                                    <Skeleton height={14} width={80} />
                                </div>
                                <div className="text-right">
                                    <Skeleton height={14} width={30} className="mb-1" />
                                    <Skeleton height={12} width={25} />
                                </div>
                            </div>
                        ))}
                    </div>
                    {/* Mini chart skeleton */}
                    <div className="mt-4 h-32">
                        <Skeleton height="100%" />
                    </div>
                </div>
            </div>

            {/* Row 3: Danh sách hoạt động gần đây */}
            <div className="mb-6 grid grid-cols-1 gap-3 lg:grid-cols-3">
                {/* Người dùng mới */}
                <div className="rounded-lg border border-gray-100 bg-white shadow-sm">
                    <div className="border-b border-gray-100 p-6">
                        <div className="flex items-center justify-between">
                            <Skeleton height={20} width={120} />
                            <Skeleton height={14} width={70} />
                        </div>
                    </div>
                    <div className="p-6">
                        <div className="space-y-4">
                            {[...Array(5)].map((_, i) => (
                                <div key={i} className="flex items-center space-x-3">
                                    <Skeleton height={40} width={40} className="rounded-full" />
                                    <div className="min-w-0 flex-1">
                                        <Skeleton height={14} width={120} className="mb-1" />
                                        <Skeleton height={12} width={150} />
                                    </div>
                                    <Skeleton height={12} width={30} />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Khóa học phổ biến */}
                <div className="rounded-lg border border-gray-100 bg-white shadow-sm">
                    <div className="border-b border-gray-100 p-6">
                        <div className="flex items-center justify-between">
                            <Skeleton height={20} width={140} />
                            <Skeleton height={14} width={70} />
                        </div>
                    </div>
                    <div className="p-6">
                        <div className="space-y-4">
                            {[...Array(5)].map((_, i) => (
                                <div key={i} className="flex items-center space-x-3">
                                    <div className="flex-shrink-0">
                                        <Skeleton height={32} width={32} className="rounded-lg" />
                                    </div>
                                    <div className="min-w-0 flex-1">
                                        <Skeleton height={14} width={180} className="mb-2" />
                                        <div className="flex items-center space-x-4">
                                            <div className="flex items-center">
                                                <Skeleton height={12} width={12} className="mr-1" />
                                                <Skeleton height={12} width={60} />
                                            </div>
                                            <div className="flex items-center gap-1">
                                                <Skeleton height={12} width={80} />
                                                <Skeleton height={12} width={50} />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Thanh toán gần đây */}
                <div className="rounded-lg border border-gray-100 bg-white shadow-sm">
                    <div className="border-b border-gray-100 p-6">
                        <div className="flex items-center justify-between">
                            <Skeleton height={20} width={150} />
                            <Skeleton height={14} width={70} />
                        </div>
                    </div>
                    <div className="p-6">
                        <div className="space-y-4">
                            {[...Array(5)].map((_, i) => (
                                <div key={i} className="flex items-center justify-between">
                                    <div className="flex items-center space-x-3">
                                        <Skeleton height={32} width={32} className="rounded-lg" />
                                        <div>
                                            <Skeleton height={14} width={100} className="mb-1" />
                                            <Skeleton height={12} width={120} />
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <Skeleton height={14} width={80} />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* Thao tác nhanh */}
            <div className="rounded-lg border border-gray-100 bg-white p-6 shadow-sm">
                <Skeleton height={20} width={120} className="mb-4" />
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
                    {[...Array(4)].map((_, i) => (
                        <div key={i} className="flex items-center rounded-lg border border-gray-200 p-4">
                            <div className="mr-3">
                                <Skeleton height={40} width={40} className="rounded-lg" />
                            </div>
                            <div>
                                <Skeleton height={16} width={100} className="mb-1" />
                                <Skeleton height={14} width={120} />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default DashboardSkeleton;
