"use client";
import React from "react";
import Skeleton from "react-loading-skeleton";
import { useAuth } from "~/hooks/useAuth";

const InfoUser = () => {
    const { user } = useAuth();
    return (
        <div className="rounded-xl border border-slate-200 bg-slate-50 p-6 shadow">
            <h3 className="mb-3 text-lg font-semibold text-blue-700">Hóa đơn gửi đến:</h3>
            {user ? (
                <div className="space-y-1 text-sm text-slate-700">
                    <p className="font-semibold text-blue-700">{user?.full_name}</p>
                    <p>{user?.email}</p>
                    <p>{user?.phone_number}</p>
                    <p>{user?.school}</p>
                    <p>{user?.city ? `${user?.city} - ` : ""} Việt Nam</p>
                    <p>
                        Loại chủ thể: <span className="font-semibold">Cá nhân</span>
                    </p>
                </div>
            ) : (
                <>
                    {[...Array(6)].map((_, index) => (
                        <Skeleton height={20} key={index} />
                    ))}
                </>
            )}
        </div>
    );
};

export default InfoUser;
