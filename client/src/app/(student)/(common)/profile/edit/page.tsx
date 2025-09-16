import React from "react";
import FormEdit from "./_components/FormEdit";
import { Metadata } from "next";
export const metadata: Metadata = {
    title: "Chỉnh sửa thông tin tài khoản",
};
const EditProfilePage = () => {
    return (
        <>
            <h3 className="block-heading mb-6">Chỉnh sửa thông tin</h3>
            <div className="flex flex-col gap-4 font-medium">
                <FormEdit />
            </div>
        </>
    );
};

export default EditProfilePage;
