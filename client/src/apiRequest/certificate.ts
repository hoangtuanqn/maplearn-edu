import publicApi from "~/libs/apis/publicApi";
import { CertificateResponse } from "~/schemaValidate/ceriticate.schema";

const certificateApi = {
    getCertificate: (slug: string, email: string) =>
        publicApi.get<CertificateResponse>(`certificates/${slug}/${email}`),
};
export default certificateApi;
