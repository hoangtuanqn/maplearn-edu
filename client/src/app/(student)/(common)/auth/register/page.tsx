import { Metadata } from "next";
import FormRegister from "./_components/FormRegister";

import Link from "next/link";
import ActionLogin from "../_components/ActionLogin";
export const metadata: Metadata = {
    title: "Tạo tài khoản",
};
const RegisterPage = () => {
    return (
        <>
            <div className="w-full">
                <h3 className="mb-10 text-center text-xl font-semibold uppercase">Tạo tài khoản</h3>
                <FormRegister />
                <ActionLogin />
                <div className="mt-10 text-center text-sm">
                    <span>Bạn đã có tài khoản? </span>
                    <Link className="underline hover:text-gray-900" href="/auth/login">
                        Đăng nhập
                    </Link>
                </div>
            </div>
        </>
    );
};

export default RegisterPage;
