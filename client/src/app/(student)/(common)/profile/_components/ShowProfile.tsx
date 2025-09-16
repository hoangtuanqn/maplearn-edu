"use client";
import Link from "next/link";
import React from "react";
import { Button } from "~/components/ui/button";
import { useAuth } from "~/hooks/useAuth";
import { getGender } from "~/libs/hepler";
import Loading from "~/app/(student)/_components/Loading";
import { Active2Fa } from "./Active2Fa";
import { UnActive2Fa } from "./UnActive2Fa";

import DisplayAvatar from "~/app/(student)/_components/DisplayAvatar";

const ShowProfile = () => {
    const { user: profile, resendVerifyEmail } = useAuth();
    const handleResendVerifyEmail = () => {
        resendVerifyEmail.mutate();
    };

    if (!profile) return;
    return (
        <>
            {resendVerifyEmail.isPending && <Loading />}
            <div className="flex w-fit max-w-full flex-col gap-4 px-2 font-medium sm:px-0">
                <div className="mb-5 flex flex-col items-center gap-4 sm:flex-row sm:gap-8">
                    <DisplayAvatar avatar={profile.avatar} fullName={profile.full_name} ratio="24" />
                    <div className="flex w-full flex-col gap-3 leading-5 font-normal sm:w-auto">
                        <Link href="/profile/edit">
                            <Button className="w-full px-5 text-white sm:w-auto">Chỉnh sửa thông tin</Button>
                        </Link>
                        <Link href="/profile/change-password">
                            <Button variant={"outline"} className="w-full px-5 sm:w-auto">
                                Thay đổi mật khẩu
                            </Button>
                        </Link>
                    </div>
                </div>
                <div className="flex flex-col gap-2 md:flex-row">
                    <div className="w-full text-gray-400 md:w-48">Họ và tên</div>
                    <div className="break-words">{profile.full_name}</div>
                </div>
                <div className="flex flex-col gap-2 md:flex-row">
                    <div className="w-full text-gray-400 md:w-48">Tài khoản</div>
                    <div className="break-words">{profile.username}</div>
                </div>
                <div className="flex flex-col gap-2 md:flex-row">
                    <div className="w-full text-gray-400 md:w-48">Email</div>
                    <div className="flex flex-col items-start gap-3 sm:flex-row sm:items-center">
                        <span className={`${!profile.email_verified_at && "text-slate-300"} break-all`}>
                            {profile.email}
                        </span>
                        {!profile.email_verified_at && (
                            <Button
                                variant="outline"
                                size="sm"
                                onClick={handleResendVerifyEmail}
                                className="w-full text-xs sm:w-auto"
                            >
                                Gửi lại email xác thực
                            </Button>
                        )}
                    </div>
                </div>
                <div className="flex flex-col gap-2 md:flex-row">
                    <div className="w-full text-gray-400 md:w-48">Số điện thoại</div>
                    <div className="break-words">{profile.phone_number}</div>
                </div>

                <div className="flex flex-col gap-2 md:flex-row">
                    <div className="w-full text-gray-400 md:w-48">Giới tính</div>
                    <div>{getGender(profile.gender)}</div>
                </div>
                <div className="flex flex-col gap-2 md:flex-row">
                    <div className="w-full text-gray-400 md:w-48">Năm sinh</div>
                    <div>{profile.birth_year}</div>
                </div>
                <div className="flex flex-col gap-2 md:flex-row">
                    <div className="w-full text-gray-400 md:w-48">Tỉnh thành</div>
                    <div className="break-words">{profile.city}</div>
                </div>
                <div className="flex flex-col gap-2 md:flex-row">
                    <div className="w-full text-gray-400 md:w-48">Trường học</div>
                    <div className="break-words">{profile.school}</div>
                </div>
                <div className="flex flex-col gap-2 md:flex-row">
                    <div className="w-full text-gray-400 md:w-48">Link Facebook</div>
                    <Link
                        href={profile.facebook_link ?? ""}
                        target="_blank"
                        className="text-primary break-all duration-75 hover:opacity-75"
                    >
                        {profile.facebook_link}
                    </Link>
                </div>
                <div className="flex flex-col gap-2 md:flex-row">
                    <div className="w-full text-gray-400 md:w-48">Xác minh 2 bước</div>
                    <div className="flex flex-col items-start gap-2 sm:flex-row sm:items-center">
                        <span>{profile.google2fa_enabled ? "Đã bật" : "Chưa bật"}</span>
                        {profile.google2fa_enabled ? <UnActive2Fa /> : <Active2Fa />}
                    </div>
                </div>
            </div>
        </>
    );
};

export default ShowProfile;
