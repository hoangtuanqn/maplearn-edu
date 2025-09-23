"use client";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import { Button } from "~/components/ui/button";
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "~/components/ui/dialog";

import Loading from "~/app/(student)/_components/Loading";
import { notificationErrorApi } from "~/libs/apis/http";
import MethodPayment from "../../../../_components/MethodPayment";
import paymentApi from "~/apiRequest/payment";
import { CourseGetDetailResponse } from "~/schemaValidate/course.schema";
import { ApplyCourseFree } from "./ApplyCourseFree";

export function PaymentMethodsDialog({
    course,
    isCheckPrerequisite = false,
}: {
    course: CourseGetDetailResponse["data"];
    isCheckPrerequisite: boolean;
}) {
    const [paymentMethod, setPaymentMethod] = useState<string>("transfer");
    const router = useRouter();

    const mutation = useMutation({
        mutationFn: async (paymentMethod: string) => {
            console.log(paymentMethod);

            const res = await paymentApi.createPayment(course.id, paymentMethod);
            return res.data.data;
        },
        onSuccess: (data) => {
            toast.success("Tạo hóa đơn thành công! Vui lòng chờ 1 xíu ....");

            switch (data.payment_method) {
                case "transfer":
                    router.push(`/payments/${data.transaction_code}`);
                    break;
                case "vnpay":
                case "momo":
                case "zalopay":
                    router.push(data.url_payment || "");
                    break;
                default:
                    router.push(`/profile/payments`);
            }
        },
        onError: notificationErrorApi,
    });
    if (!course) return null;
    return (
        <>
            <Dialog>
                <form>
                    <DialogTrigger asChild>
                        {course.price === 0 ? (
                            <ApplyCourseFree slug={course.slug} />
                        ) : (
                            <Button className="text-primary w-full" variant={"outline"}>
                                <span>{isCheckPrerequisite ? "Vẫn tiếp tục mua" : "Mua ngay"}</span>
                            </Button>
                        )}
                    </DialogTrigger>

                    <DialogContent className="bg-white sm:max-w-[600px]">
                        {mutation.isPending && <Loading />}
                        <DialogHeader>
                            <DialogTitle className="leading-7">{course.name}</DialogTitle>
                            <DialogDescription>Vui lòng chọn phương thức thanh toán phù hợp với bạn.</DialogDescription>
                        </DialogHeader>
                        <div className="mt-2 grid gap-4">
                            <div className="grid gap-4">
                                <MethodPayment paymentMethod={paymentMethod} setPaymentMethod={setPaymentMethod} />
                            </div>
                        </div>
                        <DialogFooter>
                            <DialogClose asChild>
                                <Button variant="outline">Đóng</Button>
                            </DialogClose>
                            <Button
                                type="submit"
                                className="text-white"
                                disabled={mutation.isPending}
                                onClick={() => mutation.mutate(paymentMethod)}
                            >
                                Xác nhận
                            </Button>
                        </DialogFooter>
                    </DialogContent>
                </form>
            </Dialog>
        </>
    );
}
