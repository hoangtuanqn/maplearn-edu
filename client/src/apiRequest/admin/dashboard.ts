import privateApi from "~/libs/apis/privateApi";
import { DashboardResponse } from "~/schemaValidate/admin/dashboard.schema";

const dashboardAdminApi = {
    getDashboard: async (start_date: string, end_date: string) => {
        return privateApi.get<DashboardResponse>("/admin/dashboard", {
            params: {
                start_date,
                end_date,
            },
        });
    },
};
export default dashboardAdminApi;
