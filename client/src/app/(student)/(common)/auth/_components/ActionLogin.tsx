import React from "react";
import LoginGoogle from "../../../_components/Button/LoginGoogle";
import LoginFacebook from "../../../_components/Button/LoginFacebook";
import LoginDiscord from "../../../_components/Button/LoginDiscord";

const ActionLogin = () => {
    return (
        <div className="mt-12 flex flex-col gap-2">
            <div className="t1-flex-center gap-2 text-gray-500">
                <span className="block h-[1.5px] w-20 bg-black/40"></span> <span>hoặc tiếp tục với</span>
                <span className="block h-[1.5px] w-20 bg-black/40"></span>
            </div>
            <div className="mt-4 flex justify-center gap-4 text-[12px] sm:flex-row sm:text-sm">
                <LoginGoogle />
                <LoginFacebook />
                <LoginDiscord />
            </div>
        </div>
    );
};

export default ActionLogin;
