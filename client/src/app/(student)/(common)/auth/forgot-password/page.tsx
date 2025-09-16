import { Metadata } from "next";
import FormForgot from "./_components/FormForgot";
import Link from "next/link";
export const metadata: Metadata = {
    title: "Quên mật khẩu",
};
const Login = () => {
    return (
        <>
            <div className="w-full">
                <h3 className="mb-10 text-center text-xl font-semibold uppercase">Quên mật khẩu</h3>
                <FormForgot />
                <div className="mt-10 text-center text-sm">
                    <span>Đã lấy lại được mật khẩu? </span>
                    <Link className="underline hover:text-gray-900" href="/auth/login">
                        Đăng nhập lại
                    </Link>
                </div>
            </div>
        </>
    );
};

export default Login;
