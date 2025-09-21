"use client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Trash2 } from "lucide-react";
import React from "react";
import { toast } from "sonner";
import courseAdminApi from "~/apiRequest/admin/course";
import Loading from "~/app/(student)/_components/Loading";
import { DangerConfirm } from "~/components/DangerConfirm";
import { Button } from "~/components/ui/button";
import { notificationErrorApi } from "~/libs/apis/http";

const DeleteLessonButton = ({
    slugCourse,
    name,
    slugLesson,
}: {
    slugCourse: string;
    name: string;
    slugLesson: string;
}) => {
    const queryClient = useQueryClient();
    const mutationDeleteLesson = useMutation({
        mutationFn: async (slugLesson: string) => {
            const res = await courseAdminApi.deleteLesson(slugLesson);
            return res.data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["course", "chapters", slugCourse] });
            toast.success("Xóa bài học thành công!");
        },
        onError: notificationErrorApi,
    });
    return (
        <>
            {mutationDeleteLesson.isPending && <Loading />}
            <DangerConfirm
                message={`Bạn có chắc chắn muốn xóa bài học "${name}" không?`}
                action={() => mutationDeleteLesson.mutate(slugLesson)}
            >
                <Button variant="ghost" size="sm">
                    <Trash2 className="h-4 w-4 text-red-500" />
                </Button>
            </DangerConfirm>
        </>
    );
};

export default DeleteLessonButton;
