import publicApi from "~/libs/apis/publicApi";
import { CertificateResponse } from "~/schemaValidate/ceriticate.schema";

const certificateApi = {
    getCertificate: (code: string) => publicApi.get<CertificateResponse>(`certificates/${code}`),
};
export default certificateApi;
