import privateApi from "~/libs/apis/privateApi";
import { StudentEnrollmentResponse } from "~/schemaValidate/admin/course.schema";
import { ChapterLesson } from "~/schemaValidate/chapterLessonCourse.schema";
import { CourseGetDetailResponse, CourseListResponse, CourseStats } from "~/schemaValidate/course.schema";
import { LessonResponse } from "~/schemaValidate/courseDetail.schema";
import { ResponseSchemaBasic } from "~/schemaValidate/response.schema";
const COURSE_PER_PAGE = 20;
const courseAdminApi = {
    getCourses: (
        page: number = 1,
        limit: number = COURSE_PER_PAGE,
        search: string = "",
        querySortOther: string = "",
        queryOther: string = "",
    ) => {
        let query = `/courses-admin?page=${page}&limit=${limit}`;
        if (search) {
            query += `&filter[name]=${search}`;
        }
        if (querySortOther) {
            query += `&sort=${querySortOther}`; // Các value cần sort: -created_at, download_count, ...
        }
        if (queryOther) {
            query += `&${queryOther}`; // Các value khác nếu cần
        }
        return privateApi.get<CourseListResponse>(query);
    },
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

    // get học sinh đã đăng ký học khóa học
    getStudentEnrolled: (slug: string) => privateApi.get<StudentEnrollmentResponse>(`/courses/${slug}/enrollments`),
};
export default courseAdminApi;
