"use client";
import gradesLevelApi from "~/apiRequest/gradesLevel";
import DisplayCourse from "~/app/(student)/_components/Courses/DisplayCourse";
import HeaderSection from "./HeaderSection";
import { useQuery } from "@tanstack/react-query";
import CourseSkeleton from "../../../(common)/courses/_components/CourseSkeleton";
import { gradeLevelsMock } from "~/mockdata/gradeLevels";

const Courses = () => {
    const { data: gradeLevels, isLoading } = useQuery({
        queryKey: ["user", "gradeLevels"],
        queryFn: async () => {
            const response = await gradesLevelApi.getCoursesByGradeLevel();
            return response.data.data;
        },
        staleTime: 1000 * 60 * 5, // 5 minutes
    });

    return (
        <>
            {isLoading && (
                <>
                    {[...Array(3)].map((_, index) => (
                        <div key={index} className="mt-3.5 bg-white px-4 py-6 shadow-sm md:rounded-xl xl:mt-6">
                            <HeaderSection title={"Chờ tải dữ liệu ..."} />
                            <div className="mt-4 grid grid-cols-2 gap-x-4 gap-y-6 md:grid-cols-3 xl:grid-cols-4">
                                {Array.from({ length: 8 }).map((_, index) => (
                                    <CourseSkeleton key={index} />
                                ))}
                            </div>
                        </div>
                    ))}
                </>
            )}
            {gradeLevels?.map((level) => {
                if (level.courses.length === 0) return null; // Bỏ qua nếu ko có khóa học nào
                return (
                    <div key={level.slug} className="mt-3.5 bg-white px-4 py-6 shadow-sm md:rounded-xl xl:mt-6">
                        <HeaderSection
                            title={"Khóa học " + gradeLevelsMock.find((item) => item.slug === level.slug)?.name}
                            url={`/courses?grade_level=${level.slug}`}
                        />
                        <div className="mt-4 grid grid-cols-2 gap-x-4 gap-y-6 md:grid-cols-3 xl:grid-cols-4">
                            {level.courses?.map((course) => {
                                return <DisplayCourse key={course.id} course={course} />;
                            })}
                        </div>
                    </div>
                );
            })}
        </>
    );
};

export default Courses;
