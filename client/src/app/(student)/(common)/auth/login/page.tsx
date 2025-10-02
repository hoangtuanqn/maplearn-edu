import { Metadata } from "next";
import FormLogin from "./_components/FormLogin";

import Link from "next/link";
import ActionLogin from "../_components/ActionLogin";
import { Suspense } from "react";
export const metadata: Metadata = {
    title: "Đăng nhập tài khoản",
};
const Login = () => {
    return (
        <>
            <div className="w-full">
                <h3 className="mb-10 text-center text-xl font-semibold uppercase">Đăng nhập</h3>
                <Suspense>
                    <FormLogin />
                </Suspense>
                <ActionLogin />
                <div className="mt-10 text-center text-sm">
                    <span>Chưa có tài khoản? </span>
                    <Link className="underline hover:text-gray-900" href="/auth/register">
                        Đăng ký
                    </Link>
                </div>
            </div>
        </>
    );
};

export default Login;
