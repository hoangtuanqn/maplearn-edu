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
import {
    Edit,
    Lock,
    Mail,
    Phone,
    MapPin,
    Calendar,
    GraduationCap,
    Facebook,
    Shield,
    User,
    UserCheck,
    Clock,
} from "lucide-react";

const ProfileField = ({
    icon: Icon,
    label,
    value,
    isLink = false,
    href = "",
    action = null,
}: {
    icon: any;
    label: string;
    value: string | React.ReactNode;
    isLink?: boolean;
    href?: string;
    action?: React.ReactNode;
}) => (
    <div className="group rounded-xl border border-gray-100 bg-white p-4 transition-all hover:border-gray-200 hover:shadow-sm">
        <div className="flex items-start gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gray-100 text-gray-600 group-hover:bg-gray-200">
                <Icon size={18} />
            </div>
            <div className="min-w-0 flex-1">
                <div className="mb-1 text-sm font-medium text-gray-500">{label}</div>
                {isLink && href ? (
                    <Link
                        href={href}
                        target="_blank"
                        className="text-sm font-medium break-all text-blue-600 transition-colors hover:text-blue-700"
                    >
                        {value}
                    </Link>
                ) : (
                    <div className="font-medium break-words text-gray-900">{value}</div>
                )}
            </div>
            {action && <div className="flex-shrink-0">{action}</div>}
        </div>
    </div>
);

const ShowProfile = () => {
    const { user: profile, resendVerifyEmail } = useAuth();

    const handleResendVerifyEmail = () => {
        resendVerifyEmail.mutate();
    };

    if (!profile) return null;

    return (
        <>
            {resendVerifyEmail.isPending && <Loading />}

            <div className="space-y-6">
                {/* Header Section */}
                <div className="rounded-xl border border-gray-100 bg-white p-6 shadow-sm">
                    <div className="flex flex-col items-center gap-6 sm:flex-row sm:items-start">
                        <div className="relative">
                            <DisplayAvatar avatar={profile.avatar} fullName={profile.full_name} ratio="24" />
                            <div className="absolute -right-2 -bottom-2 flex h-8 w-8 items-center justify-center rounded-full border-3 border-white bg-green-500 shadow-lg">
                                <UserCheck size={14} className="text-white" />
                            </div>
                        </div>

                        <div className="flex-1 text-center sm:text-left">
                            <h1 className="mb-2 text-2xl font-bold text-gray-900">{profile.full_name}</h1>
                            <div className="mb-4 flex items-center justify-center gap-2 sm:justify-start">
                                <User size={14} className="text-gray-400" />
                                <span className="text-sm text-gray-500">@{profile.username}</span>
                            </div>

                            <div className="flex flex-col gap-3 sm:flex-row sm:gap-4">
                                <Link href="/profile/edit" className="flex-1 sm:flex-initial">
                                    <Button className="bg-primary hover:primary/90 w-full px-6 text-white sm:w-auto">
                                        <Edit size={16} className="mr-2" />
                                        Chỉnh sửa thông tin
                                    </Button>
                                </Link>
                                <Link href="/profile/change-password" className="flex-1 sm:flex-initial">
                                    <Button
                                        variant="outline"
                                        className="w-full border-gray-300 px-6 hover:bg-gray-50 sm:w-auto"
                                    >
                                        <Lock size={16} className="mr-2" />
                                        Đổi mật khẩu
                                    </Button>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Profile Information Grid */}
                <div className="grid gap-4 md:grid-cols-2">
                    {/* Email */}
                    <ProfileField
                        icon={Mail}
                        label="Địa chỉ email"
                        value={
                            <div className="flex flex-col gap-2">
                                <span className={!profile.email_verified_at ? "text-gray-400" : ""}>
                                    {profile.email}
                                </span>
                                {!profile.email_verified_at && (
                                    <div className="flex items-center gap-2">
                                        <Clock size={12} className="text-amber-500" />
                                        <span className="text-xs text-amber-600">Chưa xác thực</span>
                                    </div>
                                )}
                            </div>
                        }
                        action={
                            !profile.email_verified_at ? (
                                <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={handleResendVerifyEmail}
                                    className="border-amber-300 text-xs text-amber-700 hover:bg-amber-50"
                                >
                                    Xác thực
                                </Button>
                            ) : null
                        }
                    />

                    {/* Phone */}
                    <ProfileField icon={Phone} label="Số điện thoại" value={profile.phone_number || "Chưa cập nhật"} />

                    {/* Gender */}
                    <ProfileField icon={User} label="Giới tính" value={getGender(profile.gender)} />

                    {/* Birth Year */}
                    <ProfileField
                        icon={Calendar}
                        label="Năm sinh"
                        value={profile.birth_year?.toString() || "Chưa cập nhật"}
                    />

                    {/* City */}
                    <ProfileField icon={MapPin} label="Tỉnh thành" value={profile.city || "Chưa cập nhật"} />

                    {/* School */}
                    <ProfileField icon={GraduationCap} label="Trường học" value={profile.school || "Chưa cập nhật"} />
                </div>

                {/* Additional Information */}
                <div className="space-y-4">
                    {/* Facebook Link */}
                    {profile.facebook_link && (
                        <ProfileField
                            icon={Facebook}
                            label="Liên kết Facebook"
                            value={profile.facebook_link}
                            isLink={true}
                            href={profile.facebook_link}
                        />
                    )}

                    {/* Two Factor Authentication */}
                    <ProfileField
                        icon={Shield}
                        label="Xác minh 2 bước"
                        value={
                            <div className="flex items-center gap-2">
                                <div
                                    className={`h-2 w-2 rounded-full ${
                                        profile.google2fa_enabled ? "bg-green-500" : "bg-gray-400"
                                    }`}
                                />
                                <span className={profile.google2fa_enabled ? "text-green-700" : "text-gray-600"}>
                                    {profile.google2fa_enabled ? "Đã kích hoạt" : "Chưa kích hoạt"}
                                </span>
                            </div>
                        }
                        action={
                            <div className="flex items-center">
                                {profile.google2fa_enabled ? <UnActive2Fa /> : <Active2Fa />}
                            </div>
                        }
                    />
                </div>

                {/* Security Notice */}
                <div className="rounded-xl border border-blue-100 bg-blue-50 p-4">
                    <div className="flex items-start gap-3">
                        <Shield className="mt-0.5 h-5 w-5 flex-shrink-0 text-blue-600" />
                        <div>
                            <h3 className="mb-1 font-medium text-blue-900">Bảo mật tài khoản</h3>
                            <p className="text-sm text-blue-700">
                                Để bảo vệ tài khoản, hãy sử dụng mật khẩu mạnh và bật xác minh 2 bước. Không chia sẻ
                                thông tin đăng nhập với người khác.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ShowProfile;
