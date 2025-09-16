import publicApi from "~/libs/apis/publicApi";
import { TeacherDetailType, TeacherListType } from "~/schemaValidate/teachher.schema";

const teacherApi = {
    getTeachers: async () => {
        const res = await publicApi.get<TeacherListType>("/teachers");
        return res.data.data;
    },
    getDetailTeacher: async (id: number) => {
        const res = await publicApi.get<TeacherDetailType>(`/teachers/${id}`);
        return res.data.data;
    },
};
export default teacherApi;
