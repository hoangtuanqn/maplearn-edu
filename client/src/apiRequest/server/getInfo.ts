import withAuthHeaders from "~/libs/withAuthHeaders";
import { UserType } from "~/schemaValidate/user.schema";

const getInfoApi = async () =>
    withAuthHeaders<{
        success: boolean;
        message: string;
        data: UserType;
    }>(`/api/me`);
export default getInfoApi;
