"use client";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import React, { useCallback } from "react";
import lessonApi from "~/apiRequest/lesson";
import VideoPlayer from "~/app/(student)/_components/VideoPlayer";
import { notificationErrorApi } from "~/libs/apis/http";
import { CourseDetailResponse, LessonDetailResponse } from "~/schemaValidate/courseDetail.schema";

const DisplayVideoLearn = ({
    course,
    lesson,
}: {
    course: CourseDetailResponse["data"];
    lesson: LessonDetailResponse["data"];
}) => {
    console.log("Re-load component");

    const router = useRouter();

    const mutationUpdateTime = useMutation({
        mutationFn: ({ lesson_id, progress }: { lesson_id: number; progress: number }) =>
            lessonApi.updateTimeVideo(lesson_id, progress),
        onSuccess: (data) => {
            if (!lesson.successed && data.data.data.is_completed) {
                router.refresh(); // reload lại trang để cập nhật UI
                lesson.successed = true;
            }
        },
        onError: notificationErrorApi,
    });
    // Gọi khi video kết thúc
    const onCompleted = useCallback(() => {

        // Cập nhật lại thời gian = thời lượng video
        mutationUpdateTime.mutate({ lesson_id: lesson.id, progress: lesson.duration });
        // Chuyển sang video kế tiếp (nếu có)
        if (lesson.next_video?.slug) {
            router.push(`/learn/${course.slug}/lecture/${lesson.next_video.slug}`);
        }
    }, [course.slug, lesson.id, lesson.duration, lesson.next_video?.slug, router, mutationUpdateTime]);

    // Gọi khi video được chạy (để update thời gian liên tục)
    const onTimeUpdate = useCallback(
        async (timeCurrent: number) => {
            console.log("timeCurrent", timeCurrent);

            const time = Math.round(timeCurrent);
            if (time > 0 && mutationUpdateTime.isPending === false) {
                mutationUpdateTime.mutate({ lesson_id: lesson.id, progress: time });
            }
        },
        [lesson.id, mutationUpdateTime],
    );
    if (!lesson) return null;

    return (
        <VideoPlayer
            src={lesson.video_url}
            ratio="16:6"
            onTimeUpdate={onTimeUpdate}
            onCompleted={onCompleted}
            defaultTime={lesson.current_time}
        />
    );
};

export default DisplayVideoLearn;
