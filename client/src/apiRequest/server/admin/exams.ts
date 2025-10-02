import withAuthHeaders from "~/libs/withAuthHeaders";
import { QuestionsExamResponse } from "~/schemaValidate/exam.schema";

const examApiServer = {
    getExamDetail: (slug: string) => withAuthHeaders<QuestionsExamResponse>(`/api/admin/exams/${slug}`),
};
export default examApiServer;
