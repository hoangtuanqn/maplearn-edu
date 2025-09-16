"use client";

import { useEffect } from "react";
// import Loading from "~/app/(student)/_components/Loading";
import Loading from "~/app/(student)/_components/Loading";
import { toast } from "sonner";
import { setLocalStorage } from "~/libs/localStorage";
import { useRouter, useSearchParams } from "next/navigation";

const SocialPage = () => {
    const searchParams = useSearchParams();
    const router = useRouter();
    const token = searchParams.get("token");

    useEffect(() => {
        if (token) {
            setLocalStorage("token2fa", token);
            toast.info("Vui lòng nhập 2FA để tiếp tục!");
            router.push("/auth/verify-otp/" + token);
        } else {
            toast.success("Đăng nhập thành công!");
            router.push("/");
        }
    }, [token, router]);

    return (
        <>
            <Loading />
            <h1>Vui lòng chờ xác nhận</h1>
        </>
    );
};

export default SocialPage;
