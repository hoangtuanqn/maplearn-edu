import privateApi from "~/libs/apis/privateApi";
import { CourseDetailResponse } from "~/schemaValidate/courseDetail.schema";

const courseDetailApi = {
    getDetailCourse: (courseSlug: string, headers?: { [key: string]: string }) => {
        return privateApi.get<CourseDetailResponse>(`/courses/${courseSlug}/study`, headers ? { headers } : undefined);
    },
    getDetailLesson: (courseSlug: string, lessonSlug: string, headers?: { [key: string]: string }) => {
        return privateApi.get<CourseDetailResponse>(
            `/courses/${courseSlug}/study/${lessonSlug}`,
            headers ? { headers } : undefined,
        );
    },
};
export default courseDetailApi;
