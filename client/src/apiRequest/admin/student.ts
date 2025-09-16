import privateApi from "~/libs/apis/privateApi";
import {
    ActivityHistorySchema,
    ImportStudentErrorSchema,
    ImportStudentSuccessSchema,
    UpdateProfileSchema,
} from "~/schemaValidate/admin/student.schema";
import { StudentDetailResponseType, StudentListResponseType, UserType } from "~/schemaValidate/user.schema";
export const USERS_PER_PAGE = 10;
const studentApi = {
    getStudents: () => privateApi.get<StudentListResponseType>("/students"),
    getDetailStudent: (id: string, headers?: { [key: string]: string }) =>
        privateApi.get<StudentDetailResponseType>(`/students/${id}`, headers ? { headers } : undefined),
    updateStudent: (id: string, data: UpdateProfileSchema) =>
        privateApi.put<StudentDetailResponseType>(`/students/${id}`, data),
    resetPassword: (id: string, data: { password: string }) =>
        privateApi.post<StudentDetailResponseType>(`/students/${id}/reset-password`, data),

    // get lịch sử hoạt động
    getActivityHistory: (id: string, page: number = 1, limit: number = USERS_PER_PAGE) =>
        privateApi.get<ActivityHistorySchema>(`/students/${id}/activity-history`, { params: { page, limit } }),

    importStudents: (error_handling: "strict" | "partial", data: Partial<UserType>[]) =>
        privateApi.post<ImportStudentSuccessSchema | ImportStudentErrorSchema>(`/students/import`, {
            error_handling,
            data,
        }),
};
export default studentApi;
