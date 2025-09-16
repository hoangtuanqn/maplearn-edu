"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import Skeleton from "react-loading-skeleton";
import { useQuery } from "@tanstack/react-query";
import courseApi from "~/apiRequest/course";
import { CourseDetail } from "~/schemaValidate/course.schema";
import { PaymentMethodsDialog } from "./PaymentMethodsDialog";
import { useAuth } from "~/hooks/useAuth";
import { PrerequisiteCourseDialog } from "./PrerequisiteCourseDialog";
import { Button } from "~/components/ui/button";

const ButtonAction = () => {
    const { slug } = useParams<{ slug: string }>();
    const { user } = useAuth();
    const [course, setCourse] = useState<CourseDetail | null>(null);
    const { data, isLoading } = useQuery({
        queryKey: ["user", "course", slug],
        queryFn: async () => {
            const res = await courseApi.getDetailCourse(slug);
            return res.data.data;
        },
    });

    useEffect(() => {
        setCourse(data || null);
    }, [isLoading, data]);

    const isCheckPrerequisite =
        (course?.prerequisite_course && course.lesson_successed != course.lesson_count) ?? false;
    return (
        <>
            {isLoading ? (
                <div className="flex items-start gap-3">
                    <div className="flex h-full flex-1 flex-col space-y-3">
                        <Skeleton className="h-10 w-[80%] !rounded-xl" />
                    </div>
                </div>
            ) : (
                <>
                    {!user ? (
                        <p className="text-center font-bold text-red-500">Vui lòng đăng nhập để mua khóa học này</p>
                    ) : course?.is_enrolled ? (
                        <>
                            <Link
                                href={`/learn/${course.slug}/lecture/${course.current_lesson.slug}`}
                                className="w-full"
                            >
                                <Button variant={"outline"} className="w-full">
                                    Vào học ngay
                                </Button>
                            </Link>
                        </>
                    ) : (
                        <>
                            {isCheckPrerequisite ? (
                                <PrerequisiteCourseDialog course={course!} />
                            ) : (
                                <PaymentMethodsDialog course={course!} isCheckPrerequisite={isCheckPrerequisite} />
                            )}

                            <p className="text-center text-xs">Đảm bảo hoàn tiền trong 30 ngày</p>
                        </>
                    )}
                </>
            )}
        </>
    );
};

export default ButtonAction;
