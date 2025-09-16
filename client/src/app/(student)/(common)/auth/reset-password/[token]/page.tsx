import { Metadata } from "next";
import FormResetPassword from "../_components/FormResetPassword";
import Link from "next/link";
import { redirect } from "next/navigation";
import authApi from "~/apiRequest/auth";
export const metadata: Metadata = {
    title: "Đặt lại mật khẩu",
};

const ResetPasswordPage = async ({ params }: { params: Promise<{ token: string }> }) => {
    const { token } = await params;
    let email = "";
    if (!token) {
        redirect("/auth/login");
    } else {
        try {
            const res = await authApi.checkTokenResetPassword({
                token,
            });
            email = res.data.data?.email ?? "";
        } catch {
            redirect("/auth/login");
        }
    }
    return (
        <>
            <div className="w-full">
                <h3 className="mb-10 text-center text-xl font-semibold uppercase">Đặt lại mật khẩu của bạn</h3>
                <FormResetPassword email={email} />

                <div className="mt-10 text-center text-sm">
                    <span>Đã lấy lại được mật khẩu? </span>
                    <Link className="underline hover:text-gray-900" href="/auth/login">
                        Đăng nhập ngay
                    </Link>
                </div>
            </div>
        </>
    );
};

export default ResetPasswordPage;
