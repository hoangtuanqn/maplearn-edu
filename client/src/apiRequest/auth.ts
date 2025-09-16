import { FormForgotPasswordType, FormLoginType, FormRegisterType, FormResetPasswordType, ResetPasswordPageProps } from "~/app/(student)/(common)/auth/auth.schema";

import publicApi from "~/libs/apis/publicApi";

const authApi = {
    create: (data: FormRegisterType) => publicApi.post("/auth/register", data),
    login: (data: FormLoginType) => publicApi.post("/auth/login", data),
    forgotPassword: (data: FormForgotPasswordType) => publicApi.post("/auth/forgot-password", data),
    resetPassword: (data: FormResetPasswordType & { token: string }) => publicApi.post("/auth/reset-password", data),
    checkTokenResetPassword: (data: { token: string }) =>
        publicApi.post<ResetPasswordPageProps>("/auth/check-token-reset-password", data),

    verifyEmail: (token: string) => publicApi.post("/auth/verify-email", { token }),
    resendVerifyEmail: (email: string) => publicApi.post("/auth/resend-verify-email", { email }),
};
export default authApi;
