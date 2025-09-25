import React from "react";

import { Metadata } from "next";
import FormChangePassword from "./change-password/FormChangePassword";
export const metadata: Metadata = {
    title: "Thay đổi mật khẩu tài khoản",
};
const EditProfilePage = () => {
    return (
        <>
            <h3 className="block-heading mb-6 uppercase">Thay đổi mật khẩu</h3>
            <div className="flex flex-col gap-4 font-medium">
                <FormChangePassword />
            </div>
        </>
    );
};

export default EditProfilePage;
