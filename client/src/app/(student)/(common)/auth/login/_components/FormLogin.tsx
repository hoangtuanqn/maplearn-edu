"use client";
import Link from "next/link";
import { toast } from "sonner";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormLoginType, loginSchema } from "../../auth.schema";
import useCapsLockWarning from "~/hooks/useCapsLockWarning";
import Loading from "~/app/(student)/_components/Loading";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "~/components/ui/form";
import { setLocalStorage } from "~/libs/localStorage";
import { useAuth } from "~/hooks/useAuth";
import { notificationErrorApi } from "~/libs/apis/http";
import authApi from "~/apiRequest/auth";
const FormLogin = () => {
    const { isCapsLockOn, handleKeyEvent, handleFocus } = useCapsLockWarning();
    const { login } = useAuth();
    const router = useRouter();
    const form = useForm<FormLoginType>({
        mode: "onBlur",
        resolver: zodResolver(loginSchema),
        defaultValues: {
            username: "",
            password: "",
        },
    });

    // Khai báo mutation
    const loginMutation = useMutation({
        mutationFn: (data: FormLoginType) => authApi.login(data),

        onSuccess: (res) => {
            // Người dùng bật bảo vệ 2 lớp
            if (res.data?.["2fa_required"] && res.data?.token) {
                toast.info("Vui lòng nhập 2FA để tiếp tục!");
                setLocalStorage("token2fa", res.data?.token ?? "");
                router.push("/auth/verify-otp/" + res.data?.token);
            } else {
                login(res.data.data);
                router.push("/");
                toast.success("Đăng nhập thành công!");
            }
        },

        onError: notificationErrorApi,
    });

    const onSubmit: SubmitHandler<FormLoginType> = async (data) => {
        loginMutation.mutate(data);
    };
    return (
        <>
            {loginMutation.isPending && <Loading />}
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <FormField
                        control={form.control}
                        name="username"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Tên tài khoản</FormLabel>
                                <FormControl>
                                    <Input placeholder="Nhập tên tài khoản của bạn" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="password"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Mật khẩu</FormLabel>
                                <FormControl>
                                    <Input
                                        type="password"
                                        placeholder="Nhập mật khẩu của bạn"
                                        onKeyDown={handleKeyEvent}
                                        onKeyUp={handleKeyEvent}
                                        onFocus={handleFocus}
                                        {...field}
                                    />
                                </FormControl>

                                <FormMessage />
                                <div className="flex justify-between">
                                    {isCapsLockOn && (
                                        <span className="text-yellow-500">Chú ý: Bạn đang bật Caps Lock</span>
                                    )}
                                    <Link href="/auth/forgot-password" className="ml-auto underline">
                                        Quên mật khẩu?
                                    </Link>
                                </div>
                            </FormItem>
                        )}
                    />
                    <Button type="submit" className="w-full text-white">
                        Đăng nhập
                    </Button>
                </form>
            </Form>
        </>
    );
};

export default FormLogin;
