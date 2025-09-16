import publicApi from "~/libs/apis/publicApi";
import {
    AttemptExamHistoryResponse,
    AttemptExamResponse,
    ExamCategoriesResponse,
    ExamDetailResponse,
    ExamListResponse,
    QuestionsExamResponse,
    RankingPaper,
} from "~/schemaValidate/exam.schema";
export const QUESTION_PER_PAGE = 10;
// "easy", "normal", "hard", "very_hard"
export const difficulties = [
    {
        id: 1,
        name: "Dễ",
        slug: "easy",
    },
    {
        id: 2,
        name: "Trung bình",
        slug: "normal",
    },
    {
        id: 3,
        name: "Khó",
        slug: "hard",
    },
    {
        id: 4,
        name: "Rất khó",
        slug: "very_hard",
    },
];
export const EXAM_PER_PAGE = 20;

const examApi = {
    getExamCategories: () => publicApi.get<ExamCategoriesResponse>("/exam-categories"),
    getExams: (
        page: number = 1,
        limit: number = EXAM_PER_PAGE,
        search: string = "",
        querySortOther: string = "",
        queryOther: string = "",
    ) => {
        let query = `/exams?page=${page}&limit=${limit}`;
        if (search) {
            query += `&filter[title]=${search}`;
        }
        if (querySortOther) {
            query += `&sort=${querySortOther}`; // Các value cần sort: -created_at, download_count, ...
        }
        if (queryOther) {
            query += `&${queryOther}`; // Các value khác nếu cần
        }
        return publicApi.get<ExamListResponse>(query);
    },
    getDetailExam: (slug: string, headers?: { [key: string]: string }) => {
        return publicApi.get<ExamDetailResponse>(`exams/${slug}`, headers ? { headers } : undefined);
    },
    getExamDifficulties: () => publicApi.get("/exam-difficulties"),

    getQuestions: (slug: string, headers?: { [key: string]: string }) =>
        publicApi.get<QuestionsExamResponse>(`exams/questions/${slug}`, headers ? { headers } : undefined),
    // Bắt đầu làm bài
    startExam: (slug: string) => publicApi.post(`/exams/${slug}/start`),
    // Nộp bài
    submitAnswer: (slug: string, data: any) =>
        publicApi.post(`/exams/${slug}/submit`, {
            data,
        }),

    // Deteced Cheat
    detectCheating: (slug: string) => publicApi.post<AttemptExamResponse>(`/exams/${slug}/detect-cheat`),

    // Lấy kết quả thi
    getExamResults: (id: string | null, slug: string, headers?: { [key: string]: string }) => {
        let query;
        if (id) {
            query = `/exams/${slug}/${id}/results`;
        } else {
            query = `/exams/${slug}/results`;
        }

        return publicApi.get(query, headers ? { headers } : undefined);
    },

    // Lịch sử làm bài
    getAttempts: (slug: string) => publicApi.get<AttemptExamHistoryResponse>(`/exams/${slug}/attempts`),

    // Get Ranking của bài thi
    getRanking: (slug: string) => publicApi.get<RankingPaper>(`/exams/${slug}/ranking`),
    // Get Ranking của tôi
    getRankingMe: (slug: string) => publicApi.get<{ data: { rank: number } }>(`/exams/${slug}/check-ranking`),

    getResultDetail: (slug: string, idAttempt: string, headers?: { [key: string]: string }) =>
        publicApi.get(`/exams/${slug}/${idAttempt}/my-attempts`, headers ? { headers } : undefined),
};
export default examApi;
