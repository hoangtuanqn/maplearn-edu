import withAuthHeaders from "~/libs/withAuthHeaders";
import { CourseDetailResponse, LessonDetailResponse } from "~/schemaValidate/courseDetail.schema";

const courseDetailServer = {
    getDetailCourse: (slug: string) => withAuthHeaders<CourseDetailResponse>(`/api/course/${slug}`),
    getDetailLesson: (courseSlug: string, lessonSlug: string) =>
        withAuthHeaders<LessonDetailResponse>(`/api/course/${courseSlug}/lecture/${lessonSlug}`),
};
export default courseDetailServer;
