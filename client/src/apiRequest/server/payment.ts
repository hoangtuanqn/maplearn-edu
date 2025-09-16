// libs/apis/invoiceApiServer.ts
import { cookies } from "next/headers";
import serverApi from "~/libs/apis/serverApi";
import { PaymentDetailResponse } from "~/schemaValidate/payment.schema";

const paymentApiServer = {
    getPaymentDetail: async (code: string) => {
        const cookie = await cookies(); // 👈 KHÔNG cần await

        return serverApi.get<PaymentDetailResponse>(`/api/payments/${code}`, {
            headers: {
                cookie: cookie.toString(), // 👈 gắn thủ công cookie
            },
        });
    },
};

export default paymentApiServer;
