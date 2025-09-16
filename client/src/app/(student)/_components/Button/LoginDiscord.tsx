"use client";
import Image from "next/image";
import { APP } from "~/config/env";

const LoginDiscord = () => {
    return (
        <button
            onClick={() => (window.location.href = `${APP.API_ROOT}/api/v1/auth/discord`)}
            className="cursor-pointer"
        >
            <div
                className="t1-flex-center view_tooltip overflow-hidden rounded-full"
                data-tooltip-content="Đăng nhập bằng Discord"
            >
                <Image src="/assets/icons/discord.jpg" alt="Twitter" className="object-cover" width={35} height={35} />
            </div>
        </button>
    );
};

export default LoginDiscord;
