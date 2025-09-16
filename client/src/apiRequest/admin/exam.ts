import privateApi from "~/libs/apis/privateApi";
import { ExamListResponse } from "~/schemaValidate/admin/exam.schema";
export const EXAM_PER_PAGE = 20;
const examApi = {
    getExams: (
        page: number = 1,
        limit: number = EXAM_PER_PAGE,
        search: string = "",
        querySortOther: string = "",
        queryOther: string = "",
    ) => {
        let query = `/exams-admin?page=${page}&limit=${limit}`;
        if (search) {
            query += `&filter[title]=${search}`;
        }
        if (querySortOther) {
            query += `&sort=${querySortOther}`; // Các value cần sort: -created_at, download_count, ...
        }
        if (queryOther) {
            query += `&${queryOther}`; // Các value khác nếu cần
        }
        return privateApi.get<ExamListResponse>(query);
    },

    addPaperExam: (data: any) => privateApi.post("/exams-admin", data),
};
export default examApi;
