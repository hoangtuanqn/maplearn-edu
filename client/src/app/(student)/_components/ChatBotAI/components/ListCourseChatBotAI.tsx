import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import Skeleton from "react-loading-skeleton";
import { ExternalLink, BookOpen } from "lucide-react";
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
            {course_id.length > 0 && (
                <div className="mt-4 space-y-3 ml-2">
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                        <BookOpen className="text-primary h-4 w-4" />
                        <span className="font-medium">Khóa học được đề xuất</span>
                    </div>

                    {isLoading &&
                        [...Array(course_id.length)].map((_, index) => (
                            <div
                                key={index}
                                className="flex items-start gap-3 rounded-xl border border-gray-100 bg-white p-4"
                            >
                                <Skeleton width={80} height={80} className="shrink-0 rounded-lg" />
                                <div className="flex h-full flex-1 flex-col gap-2">
                                    <Skeleton className="h-4 w-[90%]" />
                                    <Skeleton className="h-3 w-[60%]" />
                                    <Skeleton className="h-4 w-[40%]" />
                                </div>
                            </div>
                        ))}

                    {data?.map((course: CourseChatBotAI) => (
                        <div
                            key={course.name}
                            className="group hover:border-primary/30 rounded-xl border border-gray-100 bg-white p-4 transition-all hover:shadow-md"
                        >
                            <Link href={`/courses/${course.slug}`} className="flex items-start gap-4">
                                <div className="relative flex-shrink-0">
                                    <Image
                                        src={course.thumbnail || "/maplearn.png"}
                                        alt={course.name}
                                        width={80}
                                        height={80}
                                        className="rounded-lg border border-gray-100 object-cover transition-transform group-hover:scale-105"
                                    />
                                    <div className="absolute inset-0 rounded-lg bg-black/0 transition-colors group-hover:bg-black/5"></div>
                                </div>

                                <div className="min-w-0 flex-1">
                                    <h3 className="group-hover:text-primary mb-2 line-clamp-2 text-sm font-semibold text-gray-900 transition-colors">
                                        {course.name}
                                    </h3>

                                    <div className="flex items-center justify-between">
                                        <div className="flex flex-col gap-1">
                                            {/* {course.price > 0 && (
                                                <span className="text-xs text-gray-500 line-through">
                                                    {formatter.number(course.price)}đ
                                                </span>
                                            )} */}
                                            <span className="text-primary text-sm font-bold">
                                                {course.price === 0 ? "Miễn phí" : `${formatter.number(course.price)}đ`}
                                            </span>
                                        </div>

                                        <ExternalLink className="group-hover:text-primary h-4 w-4 text-gray-400 transition-colors" />
                                    </div>
                                </div>
                            </Link>
                        </div>
                    ))}
                </div>
            )}
        </>
    );
};

export default ListCourseChatBotAI;
