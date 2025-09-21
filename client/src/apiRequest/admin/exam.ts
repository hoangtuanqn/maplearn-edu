import privateApi from "~/libs/apis/privateApi";
import { ExamAttemptResponse, ExamListResponse } from "~/schemaValidate/admin/exam.schema";
import { QuestionsExamResponse } from "~/schemaValidate/exam.schema";
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

    // get detail
    getExamDetail: (slug: string) => privateApi.get<QuestionsExamResponse>(`/exams-admin/${slug}`),

    addPaperExam: (data: any) => privateApi.post("/exams-admin", data),
    deletePaperExam: (slug: string) => privateApi.delete(`/exams-admin/${slug}`),
    updatePaperExam: (slug: string, data: any) => privateApi.put(`/exams-admin/${slug}`, data),

    // get tất cả lịch sử làm bài thi
    getAllExamAttempts: (
        page: number = 1,
        limit: number = EXAM_PER_PAGE,
        search: string = "",
        querySortOther: string = "",
        queryOther: string = "",
    ) => {
        let query = `/exams-admin/all-history?page=${page}&limit=${limit}`;
        if (search) {
            query += `&filter[search]=${search}`;
        }
        if (querySortOther) {
            query += `&sort=${querySortOther}`; // Các value cần sort: -created_at, download_count, ...
        }
        if (queryOther) {
            query += `&${queryOther}`; // Các value khác nếu cần
        }
        return privateApi.get<ExamAttemptResponse>(query);
    },
};
export default examApi;
