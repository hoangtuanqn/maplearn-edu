import React from "react";
import ShowProfile from "./_components/ShowProfile";
import { Metadata } from "next";
export const metadata: Metadata = {
    title: "Thông tin tài khoản",
};

const ProfilePage = () => {
    return (
        <>
            <h3 className="block-heading mb-6">Thông tin cá nhân</h3>
            <ShowProfile />
        </>
    );
};

export default ProfilePage;
