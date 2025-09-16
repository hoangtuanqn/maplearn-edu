"use client";
import z from "zod";
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
import { InputOTP, InputOTPGroup, InputOTPSeparator, InputOTPSlot } from "~/components/ui/input-otp";
import { useMutation } from "@tanstack/react-query";
import profileApi from "~/apiRequest/profile";
import { notificationErrorApi } from "~/libs/apis/http";
import { toast } from "sonner";
import { useState } from "react";
import { useAuth } from "~/hooks/useAuth";
import Loading from "~/app/(student)/_components/Loading";

const FormSchema = z.object({
    otp: z.string().min(6).max(6),
});

export function UnActive2Fa() {
    const { updateProfile } = useAuth();

    const unActiveMutation = useMutation({
        mutationFn: (data: { otp: string }) => profileApi.toggle2FA(data.otp, "unactive"),
        onSuccess: () => {
            toast.success("Đã tắt xác thực 2 bước thành công!");
            updateProfile({
                google2fa_enabled: false,
            });
        },
        onError: notificationErrorApi,
    });

    const [otp, setOtp] = useState("");

    function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        const result = FormSchema.safeParse({ otp });
        if (!result.success) {
            toast.error("Mã xác nhận phải có đúng 6 kí tự!");
            return;
        }
        unActiveMutation.mutate({ otp });
    }

    return (
        <Dialog>
            {unActiveMutation.isPending && <Loading />}
            <form onSubmit={handleSubmit} className="flex flex-col justify-center space-y-6">
                <DialogTrigger asChild>
                    <Button variant="outline" size="sm" className="w-full text-xs sm:w-auto">
                        Tắt xác thực
                    </Button>
                </DialogTrigger>
                <DialogContent className="w-[95vw] max-w-[95vw] bg-white p-2 py-6 sm:max-w-[600px] sm:px-6">
                    <DialogHeader>
                        <DialogTitle>Tắt xác thực hai yếu tố (2FA)</DialogTitle>
                        <DialogDescription>
                            Nhập mã xác thực gồm 6 chữ số để tắt mã xác thực 2 yếu tố.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4">
                        <div className="mx-auto w-full max-w-xs">
                            <div className="flex justify-center">
                                <InputOTP maxLength={6} value={otp} onChange={setOtp} className="flex justify-center">
                                    <InputOTPGroup>
                                        <InputOTPSlot index={0} />
                                        <InputOTPSlot index={1} />
                                        <InputOTPSlot index={2} />
                                    </InputOTPGroup>
                                    <InputOTPSeparator />
                                    <InputOTPGroup>
                                        <InputOTPSlot index={3} />
                                        <InputOTPSlot index={4} />
                                        <InputOTPSlot index={5} />
                                    </InputOTPGroup>
                                </InputOTP>
                            </div>
                        </div>
                    </div>
                    <DialogFooter className="flex flex-col gap-2 sm:flex-row sm:justify-end">
                        <DialogClose asChild>
                            <Button variant="outline" className="w-full sm:w-auto">
                                Đóng
                            </Button>
                        </DialogClose>

                        <Button
                            type="submit"
                            onClick={() => handleSubmit({ preventDefault: () => {} } as React.FormEvent)}
                            className="w-full text-white sm:w-auto"
                            disabled={unActiveMutation.isPending}
                        >
                            Xác thực
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </form>
        </Dialog>
    );
}
