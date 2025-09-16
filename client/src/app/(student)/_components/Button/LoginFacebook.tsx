"use client";
import Image from "next/image";
import { APP } from "~/config/env";

const LoginFacebook = () => {
    return (
        <button
            onClick={() => (window.location.href = `${APP.API_ROOT}/api/v1/auth/facebook`)}
            className="cursor-pointer"
        >
            <div className="t1-flex-center rounded-xl view_tooltip" data-tooltip-content="Đăng nhập bằng Facebook">
                <Image
                    src="/assets/icons/facebook.webp"
                    alt="Facebook"
                    className="object-cover"
                    width={35}
                    height={35}
                />
            </div>
        </button>
    );
};

export default LoginFacebook;
