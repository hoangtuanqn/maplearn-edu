"use client";
import Image from "next/image";
import { APP } from "~/config/env";

const LoginGoogle = () => {
    return (
        <button
            onClick={() => (window.location.href = `${APP.API_ROOT}/api/v1/auth/google`)}
            className="cursor-pointer"
        >
            <div className="t1-flex-center rounded-xl view_tooltip" data-tooltip-content="Đăng nhập bằng Google">
                <Image src="/assets/icons/google.png" alt="Google" className="object-cover" width={35} height={35} />
            </div>
        </button>
    );
};

export default LoginGoogle;
