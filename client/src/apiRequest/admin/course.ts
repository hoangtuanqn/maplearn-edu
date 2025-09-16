import privateApi from "~/libs/apis/privateApi";
import { ChapterLesson } from "~/schemaValidate/chapterLessonCourse.schema";
import { CourseGetDetailResponse, CourseStats } from "~/schemaValidate/course.schema";
import { LessonResponse } from "~/schemaValidate/courseDetail.schema";
import { ResponseSchemaBasic } from "~/schemaValidate/response.schema";

const courseAdminApi = {
    addChapter: (data: { course_slug: string; title: string; position: number }) =>
        privateApi.post<ChapterLesson>(`/chapters/`, data),
    // Admin
    createCourse: (data: any) => privateApi.post<CourseGetDetailResponse>("/courses", data),
    createLesson: (chapterId: number, data: any) =>
        privateApi.post<LessonResponse>(`/lessons`, {
            chapter_id: chapterId,
            ...data,
        }),

    // Delete
    deleteCourse: (slug: string) => privateApi.delete<ResponseSchemaBasic>(`/courses/${slug}`),
    deleteChapter: (chapterId: number) => privateApi.delete<ResponseSchemaBasic>(`/chapters/${chapterId}`),
    deleteLesson: (slug: string) => privateApi.delete<ResponseSchemaBasic>(`/lessons/${slug}`),
    updateCourse: (slug: string, data: any) => privateApi.patch<CourseGetDetailResponse>(`/courses/${slug}`, data),

    // get thống kê học viên đăng ký khóa học trong 7 ngày
    getCourseStudentStats: (slug: string) => privateApi.get<CourseStats>(`/courses/${slug}/stats-enrollments`),
};
export default courseAdminApi;
