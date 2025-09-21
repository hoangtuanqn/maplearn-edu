import privateApi from "~/libs/apis/privateApi";
import { DashboardResponse } from "~/schemaValidate/admin/dashboard.schema";

const dashboardAdminApi = {
    getDashboard: async () => {
        return privateApi.get<DashboardResponse>("/admin/dashboard");
    },
};
export default dashboardAdminApi;
