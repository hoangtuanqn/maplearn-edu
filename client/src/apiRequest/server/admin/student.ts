import withAuthHeaders from "~/libs/withAuthHeaders";
import { StudyProgress7DaysResponse } from "~/schemaValidate/admin/student.schema";
import { StudentDetailResponseType } from "~/schemaValidate/user.schema";

const studentApiServer = {
    getDetailStudent: (id: string) => withAuthHeaders<StudentDetailResponseType>(`/api/admin/students/${id}`),

    // get thông tin học tập trong 7 ngày của học viên
    getLearningStats: (course: string, id: string) =>
        withAuthHeaders<StudyProgress7DaysResponse>(`/api/admin/courses/${course}/${id}/stats`),
};
export default studentApiServer;
