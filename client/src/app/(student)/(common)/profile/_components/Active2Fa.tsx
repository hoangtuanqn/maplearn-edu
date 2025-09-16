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
import Image from "next/image";
import { useMutation, useQuery } from "@tanstack/react-query";
import profileApi from "~/apiRequest/profile";
import { RotateCcw } from "lucide-react";
import Skeleton from "react-loading-skeleton";
import { notificationErrorApi } from "~/libs/apis/http";
import { toast } from "sonner";
import { useState } from "react";
import { useAuth } from "~/hooks/useAuth";
import { ConfirmDialog } from "~/components/ConfirmDialog";
import Loading from "~/app/(student)/_components/Loading";

const FormSchema = z.object({
    otp: z.string().min(6).max(6),
});

export function Active2Fa() {
    const { updateProfile } = useAuth();
    const { data, refetch, isLoading, isFetching } = useQuery({
        queryKey: ["user", "2fa"],
        queryFn: async () => {
            const res = await profileApi.generate2FA();
            return res.data.data;
        },
        staleTime: 0,
        refetchOnWindowFocus: false,
    });

    const verify2faMutation = useMutation({
        mutationFn: (data: { otp: string }) => profileApi.toggle2FA(data.otp, "active"),
        onSuccess: () => {
            toast.success("Đã bật xác thực 2 bước thành công!");
            updateProfile({
                google2fa_enabled: true,
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
        verify2faMutation.mutate({ otp });
    }

    return (
        <Dialog>
            {verify2faMutation.isPending && <Loading />}
            <form onSubmit={handleSubmit} className="flex flex-col justify-center space-y-6">
                <DialogTrigger asChild>
                    <Button variant="outline" size="sm" className="w-full text-xs sm:w-auto">
                        Bật xác thực
                    </Button>
                </DialogTrigger>
                <DialogContent className="w-[95vw] max-w-[95vw] bg-white p-2 py-6 sm:max-w-[600px] sm:px-6">
                    <DialogHeader>
                        <DialogTitle>Bật xác thực hai yếu tố (2FA)</DialogTitle>
                        <DialogDescription>
                            Quét mã QR bên dưới bằng ứng dụng <b>Google Authenticator</b> hoặc <b>Authy</b> trên điện
                            thoại của bạn. Sau đó, nhập mã xác thực gồm 6 chữ số để hoàn tất kích hoạt.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4">
                        <div className="flex flex-col items-center gap-4">
                            <div className="relative flex h-56 w-56 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-100 to-blue-300 p-3 shadow-lg">
                                {isLoading || isFetching ? (
                                    <Skeleton
                                        className="absolute inset-0 !rounded-xl object-contain"
                                        width={200}
                                        height={200}
                                    />
                                ) : (
                                    <Image
                                        src={data?.qr_base64 ?? ""}
                                        width={200}
                                        height={200}
                                        alt="QR Code"
                                        className="rounded-xl object-contain"
                                    />
                                )}
                            </div>
                            <div className="flex flex-col items-center gap-2">
                                <span className="flex items-center gap-2">
                                    <span className="bg-primary rounded px-3 py-1 text-sm text-white shadow">
                                        Mã: <strong className="font-mono">{data?.secret}</strong>
                                    </span>
                                </span>
                                <p
                                    onClick={() => !isFetching && refetch()}
                                    className="flex cursor-pointer items-center gap-1 text-xs font-medium text-blue-600 transition"
                                >
                                    Đổi mã khác <RotateCcw size={16} />
                                </p>
                            </div>
                        </div>
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
                        <ConfirmDialog
                            message="Sau khi xác thực, bạn sẽ không thể nhìn thấy mã này nữa? Bạn có chắc chắn đã lưu nó ở đâu đó chưa?"
                            action={() => handleSubmit({ preventDefault: () => {} } as React.FormEvent)}
                        >
                            <Button
                                type="submit"
                                className="w-full text-white sm:w-auto"
                                disabled={verify2faMutation.isPending}
                            >
                                Xác thực
                            </Button>
                        </ConfirmDialog>
                    </DialogFooter>
                </DialogContent>
            </form>
        </Dialog>
    );
}
