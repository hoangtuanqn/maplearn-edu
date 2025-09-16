"use client";

import { useMutation } from "@tanstack/react-query";

import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";

import privateApi from "~/libs/apis/privateApi";
import { AppDispatch, RootState } from "~/store";
import { setUser } from "~/store/userSlice";
import { UserType } from "~/schemaValidate/user.schema";
import { notificationErrorApi } from "~/libs/apis/http";
import { getLocalStorage, removeLocalStorage, setLocalStorage } from "~/libs/localStorage";

export function useAuth() {
    const dispatch = useDispatch<AppDispatch>();
    const router = useRouter();
    let user: UserType | null;
    if (typeof window !== "undefined") {
        user = JSON.parse(getLocalStorage("user") || "null") as UserType | null;
    }
    user = useSelector((state: RootState) => state.user.user);

    // ✅ Hàm login
    const login = (user: UserType) => {
        if (typeof window !== "undefined") {
            setLocalStorage("user", JSON.stringify(user));
        }
        dispatch(setUser(user));
    };

    const updateProfile = (payload: Partial<UserType>) => {
        dispatch(
            setUser({
                ...user,
                ...payload,
            } as UserType),
        );
    };
    // Mutation resend verify email
    const resendVerifyEmail = useMutation({
        mutationFn: () =>
            privateApi.post("/profile/resend-verify-email", {
                email: user?.email,
            }),
        onSuccess: () => {
            toast.success("Đã gửi lại email xác thực!");
        },
        onError: (error) => {
            notificationErrorApi(error);
        },
    });

    // ✅ Mutation để logout
    const logoutUser = useMutation({
        mutationFn: async () => {
            await privateApi.post("/auth/logout");
        },
        onSettled: () => {
            dispatch(setUser(null)); // Xoá user khỏi Redux
            if (typeof window !== "undefined") {
                removeLocalStorage("user"); // Xoá user khỏi localStorage
            }
            router.push("/auth/login");
            toast.success("Đăng xuất thành công!");
        },
        onError: () => {
            toast.error("Có lỗi khi đăng xuất!");
        },
    });

    return {
        user,
        updateProfile,
        resendVerifyEmail,
        login,
        logout: () => logoutUser.mutate(),
    };
}
