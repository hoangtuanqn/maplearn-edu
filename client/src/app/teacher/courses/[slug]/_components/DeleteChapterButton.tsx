import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Trash2 } from "lucide-react";
import React from "react";
import { toast } from "sonner";
import courseAdminApi from "~/apiRequest/admin/course";
import Loading from "~/app/(student)/_components/Loading";
import { DangerConfirm } from "~/components/DangerConfirm";
import { Button } from "~/components/ui/button";
import { notificationErrorApi } from "~/libs/apis/http";

const DeleteChapterButton = ({
    slugCourse,
    name,
    chapterId,
}: {
    slugCourse: string;
    name: string;
    chapterId: number;
}) => {
    const queryClient = useQueryClient();
    const mutationDeleteChapter = useMutation({
        mutationFn: async (chapterId: number) => {
            const res = await courseAdminApi.deleteChapter(chapterId);
            return res.data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["course", "chapters", slugCourse] });
            toast.success("Xóa chương học thành công!");
        },
        onError: notificationErrorApi,
    });
    return (
        <>
            {mutationDeleteChapter.isPending && <Loading />}
            <DangerConfirm
                message={`Bạn có chắc chắn muốn xóa chương "${name}" không?`}
                action={() => mutationDeleteChapter.mutate(chapterId)}
            >
                <Button variant="ghost" size="sm" onClick={(e) => e.stopPropagation()}>
                    <Trash2 className="h-4 w-4 text-red-500" />
                </Button>
            </DangerConfirm>
        </>
    );
};

export default DeleteChapterButton;
