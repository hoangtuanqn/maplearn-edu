"use client";
import React from "react";
import { Button } from "~/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "~/components/ui/form";
import { Input } from "~/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { changePasswordSchema, FormChangePasswordType } from "~/schemaValidate/user.schema";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import profileApi from "~/apiRequest/profile";
import Loading from "~/app/(student)/_components/Loading";
import PasswordStrengthMeter from "~/app/(student)/_components/Auth/PasswordStrengthMeter";
import { useAuth } from "~/hooks/useAuth";
import { useRouter } from "next/navigation";
import axios from "axios";
import zxcvbn from "zxcvbn";

const FormChangePassword = () => {
    const { logout } = useAuth();
    const router = useRouter();
    const form = useForm<FormChangePasswordType>({
        resolver: zodResolver(changePasswordSchema),
        mode: "onBlur",
        defaultValues: {
            password_old: "",
            password_new: "",
            confirmPassword: "",
        },
    });

    const { mutate, isPending } = useMutation({
        mutationFn: (data: FormChangePasswordType) => profileApi.changePassword(data),
        onSuccess: (_) => {
            toast.success("Đã thay đổi mật khẩu thành công! Vui lòng đăng nhập lại!");
            logout();
            router.push("/auth/login");
        },
        onError: (data) => {
            if (axios.isAxiosError(data)) {
                const errors = data.response?.data?.message;
                toast.error(errors);
            }
        },
    });

    const onSubmit = (data: FormChangePasswordType) => {
        if (isPending) {
            toast.warning("Thao tác quá nhanh!");
            return;
        }
        if (zxcvbn(form.watch("password_new")).score < 2) {
            toast.error("Mật khẩu mới quá yếu! Vui lòng nhập mật khẩu khác mạnh hơn!");
            return;
        }
        mutate(data);
    };

    return (
        <>
            {isPending && <Loading />}
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="w-md max-w-full space-y-6">
                    <FormField
                        control={form.control}
                        name="password_old"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="text-sm font-normal">Mật khẩu cũ</FormLabel>
                                <FormControl>
                                    <Input placeholder="Nhập mật khẩu cũ" type="password" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="password_new"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="text-sm font-normal">Mật khẩu mới</FormLabel>
                                <FormControl>
                                    <Input placeholder="Nhập mật khẩu mới" type="password" {...field} />
                                </FormControl>
                                <PasswordStrengthMeter password={form.watch("password_new")} />
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="confirmPassword"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="text-sm font-normal">Xác nhận mật khẩu mới</FormLabel>
                                <FormControl>
                                    <Input placeholder="Nhập lại mật khẩu mới" type="password" {...field} />
                                </FormControl>

                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <Button type="submit" className="text-white">
                        Đổi mật khẩu
                    </Button>
                </form>
            </Form>
        </>
    );
};

export default FormChangePassword;
