import withAuthHeaders from "~/libs/withAuthHeaders";
import { StudentDetailResponseType } from "~/schemaValidate/user.schema";

const studentApiServer = {
    getDetailStudent: (id: string) => withAuthHeaders<StudentDetailResponseType>(`/api/admin/students/${id}`),
};
export default studentApiServer;
