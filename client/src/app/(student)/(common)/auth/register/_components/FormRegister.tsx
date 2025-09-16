"use client";
import { toast } from "sonner";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import useCapsLockWarning from "~/hooks/useCapsLockWarning";
import Loading from "~/app/(student)/_components/Loading";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "~/components/ui/form";
import { useAuth } from "~/hooks/useAuth";
import { FormRegisterType, registerSchema } from "../../auth.schema";
import authApi from "~/apiRequest/auth";
import PasswordStrengthMeter from "~/app/(student)/_components/Auth/PasswordStrengthMeter";
import zxcvbn from "zxcvbn";
import { notificationErrorApi } from "~/libs/apis/http";

const FormLogin = () => {
    const { isCapsLockOn, handleKeyEvent, handleFocus } = useCapsLockWarning();
    const { login } = useAuth();
    const router = useRouter();
    const form = useForm<FormRegisterType>({
        mode: "onBlur",
        resolver: zodResolver(registerSchema),
        defaultValues: {
            full_name: "",
            email: "",
            username: "",
            password: "",
            confirmPassword: "",
        },
    });

    // Khai báo mutation
    const registerMutaion = useMutation({
        mutationFn: (data: FormRegisterType) => authApi.create(data),
        onSuccess: (res) => {
            login(res.data.data);
            router.push("/");
            toast.success("Tạo tài khoản thành công! Vui lòng kiểm tra email để xác thực tài khoản của bạn.");
        },
        onError: notificationErrorApi,
    });

    const onSubmit: SubmitHandler<FormRegisterType> = async (data) => {
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
                        name="full_name"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Họ và tên </FormLabel>
                                <FormControl>
                                    <Input placeholder="Nhập họ và tên của bạn" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Địa chỉ email của bạn</FormLabel>
                                <FormControl>
                                    <Input type="email" placeholder="Nhập địa chỉ email của bạn" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
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
                        Tạo tài khoản
                    </Button>
                </form>
            </Form>
        </>
    );
};

export default FormLogin;
