import publicApi from "~/libs/apis/publicApi";
import { GradeLevelListResponse, GradeLevelWithCoursesResponse } from "~/schemaValidate/gradesLevel.schema";

const gradesLevelApi = {
    getGradesLevels: async () => publicApi.get<GradeLevelListResponse>(`/grade-levels`),
    // Lấy danh sách cấp học + khóa học theo cấp học (mặc định 8 khóa trong mỗi cấp học)
    getCoursesByGradeLevel: async () => publicApi.get<GradeLevelWithCoursesResponse>(`/grade-levels/courses`),
};
export default gradesLevelApi;
