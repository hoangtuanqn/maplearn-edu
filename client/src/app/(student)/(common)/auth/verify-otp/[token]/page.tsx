import { Metadata } from "next";
import { redirect } from "next/navigation";
import FormVerifyOtp from "../_components/FormVerifyOtp";

export const metadata: Metadata = {
    title: "Xác minh bảo mật hai lớp",
};

const VerifyOtp = async ({ params }: { params: Promise<{ token: string }> }) => {
    const { token } = await params;
    if (!token) {
        redirect("/auth/login");
    }
    return (
        <>
            <div className="mx-auto max-w-full rounded-xl px-4 py-10 text-center sm:px-8">
                <header className="mb-8">
                    <h1 className="mb-1 text-2xl font-bold">Mã xác nhận</h1>
                    <p className="text-sm text-slate-500">
                        Nhập mã 6 chữ số trong ứng dụng <b className="font-bold text-gray-500">Google Authenticator</b>
                    </p>
                </header>
                <FormVerifyOtp />
            </div>
        </>
    );
};

export default VerifyOtp;
