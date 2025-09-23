"use client";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import paymentApi from "~/apiRequest/payment";
import { ConfirmDialog } from "~/components/ConfirmDialog";
import { Button } from "~/components/ui/button";
import { notificationErrorApi } from "~/libs/apis/http";

export function ApplyCourseFree({ slug }: { slug: string }) {
    const router = useRouter();
    const mutationEnrollCourse = useMutation({
        mutationFn: (slug: string) => paymentApi.enrollCourseFree(slug),
        onSuccess: () => {
            toast.success("Tham gia khóa học thành công!");
            router.push("/profile/my-courses");
        },
        onError: notificationErrorApi,
    });
    return (
        <ConfirmDialog
            message="Khóa học này miễn phí, bạn cần phải học tập đầy đủ và chăm chỉ để không phụ lòng giáo viên nhé! Bạn đã chắc chắn tham gia khóa học này chưa?"
            action={() => mutationEnrollCourse.mutate(slug)}
        >
            <Button className="text-primary w-full" variant={"outline"}>
                <span>{"Tham gia khóa học"}</span>
            </Button>
        </ConfirmDialog>
    );
}
