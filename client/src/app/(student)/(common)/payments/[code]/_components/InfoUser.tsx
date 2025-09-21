"use client";
import React from "react";
import Skeleton from "react-loading-skeleton";
import { useAuth } from "~/hooks/useAuth";
import { User, Mail, Phone, GraduationCap, MapPin, UserCheck } from "lucide-react";

const InfoUser = () => {
    const { user } = useAuth();
    return (
        <div className="p-6">
            <div className="mb-4 flex items-center gap-2">
                <User className="text-primary h-5 w-5" />
                <h3 className="text-lg font-semibold text-gray-900">Hóa đơn gửi đến</h3>
            </div>
            {user ? (
                <div className="space-y-3">
                    <div className="flex items-center gap-3">
                        <UserCheck className="text-primary h-4 w-4" />
                        <span className="font-semibold text-gray-900">{user?.full_name}</span>
                    </div>
                    <div className="flex items-center gap-3">
                        <Mail className="text-primary h-4 w-4" />
                        <span className="text-sm text-gray-700">{user?.email}</span>
                    </div>
                    {user?.phone_number && (
                    <div className="flex items-center gap-3">
                        <Phone className="text-primary h-4 w-4" />
                        <span className="text-sm text-gray-700">{user?.phone_number}</span>
                    </div>)}
                    {user?.school && (
                        <div className="flex items-center gap-3">
                            <GraduationCap className="text-primary h-4 w-4" />
                            <span className="text-sm text-gray-700">{user?.school}</span>
                        </div>
                    )}
                    <div className="flex items-center gap-3">
                        <MapPin className="text-primary h-4 w-4" />
                        <span className="text-sm text-gray-700">{user?.city ? `${user?.city}, ` : ""}Việt Nam</span>
                    </div>
                    <div className="border-t border-gray-100 pt-3">
                        <p className="text-sm text-gray-600">
                            Loại chủ thể: <span className="text-primary font-semibold">Cá nhân</span>
                        </p>
                    </div>
                </div>
            ) : (
                <div className="space-y-3">
                    {[...Array(6)].map((_, index) => (
                        <Skeleton height={20} key={index} />
                    ))}
                </div>
            )}
        </div>
    );
};

export default InfoUser;
