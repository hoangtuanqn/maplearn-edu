import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import Skeleton from "react-loading-skeleton";
import publicApi from "~/libs/apis/publicApi";
import { formatter } from "~/libs/format";

type CourseChatBotAI = {
    name: string;
    slug: string;
    thumbnail: string;
    price: number;
};
const ListCourseChatBotAI = ({ course_id }: { course_id: number[] }) => {
    const { data, isLoading } = useQuery({
        queryKey: ["list-course-chatbot-ai", course_id],
        queryFn: async () => {
            if (course_id.length === 0) return []; // Trả về mảng rỗng nếu không có khóa học
            // Giả sử bạn có một API để lấy danh sách khóa học
            const response = await publicApi.post(`/courses/ai-data`, { ids: course_id });
            return response.data?.data || []; // Trả về danh sách khóa học
        },
    });

    return (
        <>
            <div className="mt-3 flex flex-col gap-1">
                {course_id.length > 0 &&
                    isLoading &&
                    [...Array(course_id.length)].map((_, index) => (
                        <div key={index} className="flex items-start gap-3 py-3">
                            {/* Ảnh thumbnail (hình vuông) */}
                            <Skeleton width={80} height={80} className="shrink-0 rounded-md" />
                            {/* Nội dung bên phải */}
                            <div className="flex h-full flex-1 flex-col">
                                {/* Tiêu đề */}
                                <Skeleton className="h-10 w-[80%]" />

                                <Skeleton className="h-3 w-[40%]" width={70} />
                                <Skeleton className="h-5 w-[40%]" width={80} />
                            </div>
                        </div>
                    ))}

                {data?.map((course: CourseChatBotAI) => (
                    <div
                        key={course.name}
                        className="border-primary rounded-lg border bg-white p-3 transition hover:shadow"
                    >
                        <Link href={`/courses/${course.slug}`} className="flex items-center">
                            <Image
                                src={course.thumbnail || "/maplearn.png"}
                                alt={course.name}
                                width={80}
                                height={80}
                                className="rounded-md border border-gray-100 object-cover"
                            />
                            <div className="ml-3 flex-1">
                                <h2 className="mb-0.5 line-clamp-2 text-sm font-semibold text-gray-800">
                                    {course.name}
                                </h2>
                                <div className="flex flex-col gap-0.5">
                                    {/* Giá cũ */}
                                    {course.price > course.price && (
                                        <span className="text-[11.125px] font-semibold text-gray-400 line-through">
                                            {formatter.number(course.price)}đ
                                        </span>
                                    )}
                                    {/* Giá mới */}
                                    <span className="text-primary text-sm font-bold">
                                        {formatter.number(course.price)}đ
                                    </span>
                                </div>
                            </div>
                        </Link>
                    </div>
                ))}
            </div>
        </>
    );
};

export default ListCourseChatBotAI;
