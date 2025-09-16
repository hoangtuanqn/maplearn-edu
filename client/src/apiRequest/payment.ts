import privateApi from "~/libs/apis/privateApi";
import { PaymentDetailResponse, PaymentResponse } from "~/schemaValidate/payment.schema";

const paymentApi = {
    // Payment cho phép thanh toán nhiều Invoice 1 lúc
    createPayment: async (course_id: number, payment_method: string) => {
        return privateApi.post<PaymentResponse>(`/payments`, {
            course_id,
            payment_method,
        });
    },
    getDetailPayment: async (transaction_code: string, headers: { [key: string]: string }) => {
        return privateApi.get<PaymentDetailResponse>(`/payments/${transaction_code}`, {
            headers,
        });
    },
    cancelPayment: async (transaction_code: string) => {
        return privateApi.post<PaymentDetailResponse>(`/payments/${transaction_code}/cancel`);
    },
};
export default paymentApi;
