"use client";
import { toast } from "sonner";
import { useMutation } from "@tanstack/react-query";
import { useParams, useRouter } from "next/navigation";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import useCapsLockWarning from "~/hooks/useCapsLockWarning";
import Loading from "~/app/(student)/_components/Loading";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "~/components/ui/form";
import { useAuth } from "~/hooks/useAuth";
import { FormResetPasswordType, resetPasswordSchema } from "../../auth.schema";
import authApi from "~/apiRequest/auth";
import PasswordStrengthMeter from "~/app/(student)/_components/Auth/PasswordStrengthMeter";
import zxcvbn from "zxcvbn";
import { notificationErrorApi } from "~/libs/apis/http";

const FormResetPassword = ({ email }: { email: string }) => {
    const { token } = useParams();
    const { isCapsLockOn, handleKeyEvent, handleFocus } = useCapsLockWarning();
    const { login } = useAuth();
    const router = useRouter();
    const form = useForm<FormResetPasswordType>({
        mode: "onBlur",
        resolver: zodResolver(resetPasswordSchema),
        defaultValues: {
            email: email ?? "",
            password: "",
            confirmPassword: "",
        },
    });

    // Khai báo mutation
    const registerMutaion = useMutation({
        mutationFn: (data: FormResetPasswordType) =>
            authApi.resetPassword({
                ...data,
                token: token as string, // Chuyển đổi token sang chuỗi
            }),
        onSuccess: (res) => {
            login(res.data.data);
            router.push("/");
            toast.success("Đã đặt lại mật khẩu thành công!");
        },
        onError: notificationErrorApi,
    });

    const onSubmit: SubmitHandler<FormResetPasswordType> = async (data) => {
        if (zxcvbn(form.watch("password")).score < 2) {
            toast.error("Mật khẩu quá yếu! Vui lòng nhập mật khẩu khác mạnh hơn!");
            return;
        }
        registerMutaion.mutate(data);
    };
    return (
        <>
            {registerMutaion.isPending && <Loading />}
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Địa chỉ email của bạn</FormLabel>
                                <FormControl>
                                    <Input type="email" placeholder="Nhập địa chỉ email của bạn" {...field} disabled />
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
                                <FormLabel>Mật khẩu mới</FormLabel>
                                <FormControl>
                                    <Input
                                        type="password"
                                        placeholder="Nhập mật khẩu mới của bạn"
                                        onKeyDown={handleKeyEvent}
                                        onKeyUp={handleKeyEvent}
                                        onFocus={handleFocus}
                                        {...field}
                                    />
                                </FormControl>
                                <PasswordStrengthMeter password={form.watch("password")} />

                                {isCapsLockOn && <span className="text-yellow-500">Chú ý: Bạn đang bật Caps Lock</span>}
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="confirmPassword"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Xác nhận lại mật khẩu</FormLabel>
                                <FormControl>
                                    <Input
                                        type="password"
                                        placeholder="Xác nhận lại mật khẩu"
                                        onKeyDown={handleKeyEvent}
                                        onKeyUp={handleKeyEvent}
                                        onFocus={handleFocus}
                                        {...field}
                                    />
                                </FormControl>

                                {isCapsLockOn && <span className="text-yellow-500">Chú ý: Bạn đang bật Caps Lock</span>}
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <Button type="submit" className="w-full text-white">
                        Xác nhận
                    </Button>
                </form>
            </Form>
        </>
    );
};

export default FormResetPassword;
