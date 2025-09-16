import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import authApi from "~/apiRequest/auth";
import { Button } from "~/components/ui/button";
export const metadata: Metadata = {
    title: "Xác thực tài khoản",
};
const VerifyAccountPage = async ({ params }: { params: Promise<{ token: string }> }) => {
    const { token } = await params;
    let success = false;
    try {
        const res = await authApi.verifyEmail(token as string);
        success = res.data?.success;
    } catch {}

    return (
        <div className="t1-flex-center flex-col gap-4">
            {success ? (
                <>
                    <Image src="/assets/icons/success.png" alt="Success" width={140} height={140} />
                    <h2 className="text-primary text-xl font-bold">Bạn đã xác thực tài khoản thành công</h2>
                </>
            ) : (
                <>
                    <Image src="/assets/icons/error.png" alt="Error" width={140} height={140} />
                    <h2 className="text-center text-xl font-semibold text-red-400">Truy cập không hợp lệ!</h2>
                </>
            )}
            <Link href="/">
                <Button className="text-primary" variant={"outline"}>
                    Quay trở về trang chủ
                </Button>
            </Link>
        </div>
    );
};

export default VerifyAccountPage;
