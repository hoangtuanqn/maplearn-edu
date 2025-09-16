// libs/apis/examApiServer.ts

import withAuthHeaders from "~/libs/withAuthHeaders";
import { QuestionsExamResponse, ResultDetailExamResponse, ResultExamResponse } from "~/schemaValidate/exam.schema";

const examApiServer = {
    getExamDetail: (slug: string) => withAuthHeaders<QuestionsExamResponse>(`/api/exam/${slug}`),

    getQuestions: (slug: string) => withAuthHeaders<QuestionsExamResponse>(`/api/exam/${slug}/questions`),

    getExamResults: (id: string | null, slug: string) => {
        const query = id ? `/api/exam/${slug}/results/${id}` : `/api/exam/${slug}/results`;
        return withAuthHeaders<ResultExamResponse>(query);
    },

    getResultDetail: (slug: string, idAttempt: string) =>
        withAuthHeaders<ResultDetailExamResponse>(`/api/exam/${slug}/results/${idAttempt}/detail`),
};

export default examApiServer;
