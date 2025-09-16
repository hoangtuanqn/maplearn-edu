import privateApi from "~/libs/apis/privateApi";
import { LessonHistoryResponse } from "~/schemaValidate/lesson.schema";

const lessonApi = {
    updateTimeVideo: (lesson_id: number, progress: number) =>
        privateApi.post<LessonHistoryResponse>(`/lesson-history/`, { lesson_id, progress }),
};
export default lessonApi;
