import React from "react";
import FormEdit from "./_components/FormEdit";
import { Metadata } from "next";
import { redirect } from "next/navigation";
import getInfoApi from "~/apiRequest/server/getInfo";
export const metadata: Metadata = {
    title: "Chỉnh sửa thông tin tài khoản",
};
const EditProfilePage = async () => {
    let user;
    try {
        const res = await getInfoApi();
        user = res.data.data;
    } catch {
        redirect("/profile");
    }
    return (
        <>
            <h3 className="block-heading mb-6">Chỉnh sửa thông tin</h3>
            <div className="flex flex-col gap-4 font-medium">
                <FormEdit user={user} />
            </div>
        </>
    );
};

export default EditProfilePage;
