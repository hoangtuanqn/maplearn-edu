"use client";

import { useMutation } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import studentApi from "~/apiRequest/admin/student";
import Loading from "~/app/(student)/_components/Loading";
import { DangerConfirm } from "~/components/DangerConfirm";
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
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { notificationErrorApi } from "~/libs/apis/http";
import { generateStrongPassword } from "~/libs/hepler";

export function ResetPassword({ id }: { id: string }) {
    const [newPassword, setNewPassword] = useState("");

    const handleGenerate = () => {
        const pwd = generateStrongPassword();
        setNewPassword(pwd);
    };
    const updatePasswordMutation = useMutation({
        mutationFn: (data: { password: string }) => studentApi.resetPassword(id, data),
        onSuccess: () => {
            toast.success("Đặt lại mật khẩu thành công");
        },
        onError: notificationErrorApi,
    });

    const handleSubmit = () => {
        updatePasswordMutation.mutate({ password: newPassword });
    };
    useEffect(() => {
        handleGenerate();
    }, []);
    return (
        <>
            {updatePasswordMutation.isPending && <Loading />}
            <Dialog>
                <form>
                    <DialogTrigger asChild>
                        <Button variant="outlineBlack">Đặt lại mật khẩu</Button>
                    </DialogTrigger>
                    <DialogContent className="bg-white sm:max-w-[600px]">
                        <DialogHeader>
                            <DialogTitle>Đặt lại mật khẩu</DialogTitle>
                            <DialogDescription>
                                Hệ thống sẽ tạo mật khẩu ngẫu nhiên mạnh cho người dùng.
                            </DialogDescription>
                        </DialogHeader>
                        <div className="grid gap-4">
                            <div className="grid gap-3">
                                <Label htmlFor="password">Mật khẩu mới</Label>
                                <div className="flex gap-2">
                                    <div className="flex-1">
                                        <Input id="password" value={newPassword} readOnly className="flex-1" />
                                    </div>
                                    <Button type="button" variant="outline" onClick={handleGenerate}>
                                        Tạo mới
                                    </Button>
                                </div>
                            </div>
                        </div>
                        <DialogFooter>
                            <DialogClose asChild>
                                <Button variant="outline">Đóng</Button>
                            </DialogClose>
                            <DangerConfirm
                                message="Bạn có chắc chắn muốn đặt lại mật khẩu? Bạn cần lưu lại mật khẩu trước khi bấm xác nhận!"
                                action={() => handleSubmit()}
                            >
                                <Button type="submit" variant={"primary"}>
                                    Cập nhật
                                </Button>
                            </DangerConfirm>
                        </DialogFooter>
                    </DialogContent>
                </form>
            </Dialog>
        </>
    );
}
