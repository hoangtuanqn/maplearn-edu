"use client";
import HeaderSection from "./HeaderSection";
import { useQuery } from "@tanstack/react-query";
import courseApi from "~/apiRequest/course";
import { useAuth } from "~/hooks/useAuth";
import CourseSkeleton from "../../courses/_components/CourseSkeleton";
import DisplayCourse from "~/app/(student)/_components/Courses/DisplayCourse";

const ListCourseRecommended = () => {
    const { data: courses, isLoading } = useQuery({
        queryKey: ["user", "course", "recommended"],
        queryFn: async () => {
            const response = await courseApi.getCourseRecommended();
            return response.data.data;
        },
        staleTime: 1000 * 60 * 5, // 5 minutes
    });
    

    const { user } = useAuth();
    if (!user) return null;
    return (
        <>
            <div className="mt-3.5 bg-white px-4 py-6 shadow-sm md:rounded-xl xl:mt-6">
                <HeaderSection title={"Được gợi ý cho bạn"} />
                <div className="mt-4 grid grid-cols-2 gap-x-4 gap-y-6 md:grid-cols-3 xl:grid-cols-4">
                    {isLoading && [...Array(8).keys()].map((index) => <CourseSkeleton key={index} />)}
                    {courses?.map((course) => {
                        return <DisplayCourse key={course.id} course={course} />;
                    })}
                </div>
            </div>
        </>
    );
};

export default ListCourseRecommended;
