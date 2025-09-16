"use client";
import { toast } from "sonner";
import { useMutation } from "@tanstack/react-query";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { forgotPasswordSchema, FormForgotPasswordType } from "../../auth.schema";
import Loading from "~/app/(student)/_components/Loading";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "~/components/ui/form";
import { notificationErrorApi } from "~/libs/apis/http";
import authApi from "~/apiRequest/auth";
const FormForgot = () => {
    const form = useForm<FormForgotPasswordType>({
        mode: "onBlur",
        resolver: zodResolver(forgotPasswordSchema),
        defaultValues: {
            email: "",
        },
    });

    // Khai báo mutation
    const forgotMutation = useMutation({
        mutationFn: (data: FormForgotPasswordType) => authApi.forgotPassword(data),
        onSuccess: (res) => {
            toast.success(
                res.data.message ||
                    "Hãy kiểm tra email của bạn. Nếu địa chỉ đã đăng ký, chúng tôi sẽ gửi liên kết đặt lại mật khẩu ngay lập tức.",
            );
            form.reset();
        },
        onError: notificationErrorApi,
    });

    const onSubmit: SubmitHandler<FormForgotPasswordType> = async (data) => {
        forgotMutation.mutate(data);
    };
    return (
        <>
            {forgotMutation.isPending && <Loading />}
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Địa chỉ email</FormLabel>
                                <FormControl>
                                    <Input type="email" placeholder="Nhập địa chỉ email của bạn" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <Button type="submit" className="w-full text-white">
                        Đặt lại mật khẩu
                    </Button>
                </form>
            </Form>
        </>
    );
};

export default FormForgot;
