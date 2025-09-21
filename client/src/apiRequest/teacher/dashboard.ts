import privateApi from "~/libs/apis/privateApi";
import { DashboardResponse } from "~/schemaValidate/teacher/dashboard.schema";

const dashboardTeacherApi = {
    getDashboard: async () => {
        return privateApi.get<DashboardResponse>("/teacher/dashboard");
    },
};
export default dashboardTeacherApi;
