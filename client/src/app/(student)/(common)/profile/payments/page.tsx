import { Suspense } from "react";
import InvoiceList from "./_components/PaymentList";
import { Metadata } from "next";
export const metadata: Metadata = {
    title: "Hóa đơn của tôi",
};
const InvoiceProfile = () => {
    return (
        <>
            <h3 className="block-heading mb-6">Hóa đơn của tôi</h3>
            <Suspense>
                <InvoiceList />
            </Suspense>
        </>
    );
};

export default InvoiceProfile;
