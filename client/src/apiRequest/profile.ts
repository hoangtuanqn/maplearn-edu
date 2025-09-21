import privateApi from "~/libs/apis/privateApi";
import { CourseListResponse } from "~/schemaValidate/course.schema";
import { FormChangePasswordType, ProfileType, UserType } from "~/schemaValidate/user.schema";
import { Active2FAResponse, Generate2FAType } from "~/schemaValidate/twoFactor";
import { PaymentListResponse } from "~/schemaValidate/payment.schema";

export const PAYMENT_PER_PAGE = 20;
const profileApi = {
    update: (data: ProfileType) => privateApi.post("/profile/update", data),
    changePassword: (data: FormChangePasswordType) => privateApi.post("/profile/change-password", data),
    getCourseMe: () => privateApi.get<CourseListResponse>("/profile/courses"),
    getPayments: async (
        page: number = 1,
        limit: number = PAYMENT_PER_PAGE,
        search: string = "",
        querySortOther: string = "",
        queryOther: string = "",
    ) => {
        let query = `/profile/payments?page=${page}&limit=${limit}`;

        if (search) {
            query += `&filter[title]=${search}`;
        }
        if (querySortOther) {
            query += `&sort=${querySortOther}`; // Các value cần sort: -created_at, download_count, ...
        }
        if (queryOther) {
            query += `&${queryOther}`; // Các value khác nếu cần
        }
        return privateApi.get<PaymentListResponse>(query);
    },
    generate2FA: () => privateApi.get<Generate2FAType>("/profile/2fa/generate"),
    toggle2FA: (otp: string, type: string) => privateApi.post<Active2FAResponse>("/profile/2fa/toggle", { otp, type }),
    getMeInfo: (headers?: { [key: string]: string }) => {
        return privateApi.post<{
            success: boolean;
            message: string;
            data: UserType;
        }>(`/auth/me`, undefined, headers ? { headers } : undefined);
    },
};
export default profileApi;
