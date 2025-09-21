import privateApi from "~/libs/apis/privateApi";
import { PaymentStats, PaymentWithCourse } from "~/schemaValidate/admin/payment.schema";

export const PAYMENT_PER_PAGE = 20;
const paymentApi = {
    getPayments: (
        page: number = 1,
        limit: number = PAYMENT_PER_PAGE,
        querySortOther: string = "",
        queryOther: string = "",
    ) => {
        let query = `/payments-admin?page=${page}&limit=${limit}`;
        if (querySortOther) {
            query += `&sort=${querySortOther}`; // Các value cần sort: -created_at, download_count, ...
        }
        if (queryOther) {
            query += `&${queryOther}`; // Các value khác nếu cần
        }
        return privateApi.get<PaymentWithCourse>(query);
    },
    getStats: (date_from: string, date_to: string) => {
        return privateApi.get<PaymentStats>(`/admin/payments/stats?date_from=${date_from}&date_to=${date_to}`);
    },
};
export default paymentApi;
