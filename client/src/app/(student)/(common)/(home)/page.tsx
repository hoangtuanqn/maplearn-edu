import Banner from "./_components/Banner";
import Courses from "./_components/Courses";
import Teachers from "./_components/Teachers";
import DashboardStats from "./_components/DashboardStats";
import ListCourseRecommended from "./_components/ListCourseRecommended";
import SidebarLeft from "../../_components/SidebarLeft";
import SidebarRight from "../../_components/SidebarRight";
import TopStudents from "../../_components/SidebarRight/TopStudents";

const StudentHomePage = () => {
    return (
        <>
            <section className="flex gap-2">
                <SidebarLeft />
                <div className="mx-auto w-[100%] sm:m-0 sm:mr-auto md:w-[80%] lg:mx-auto lg:w-[85%] xl:w-[70%] 2xl:w-[52%]">
                    {/* Home Tab */}
                    <div className="max-md:bg-white max-md:p-4">
                        {/* Banner */}
                        <Banner />
                        {/* <CourseActive className="xl:hidden" /> */}
                        <TopStudents className="max-2xl:mt-4 2xl:hidden" />
                    </div>
                    {/* Dashboard Stats */}

                    <DashboardStats />
                    {/* Giáo viên */}
                    <Teachers />

                    {/* Đề xuất khóa học cho bạn */}
                    <ListCourseRecommended />

                    {/* Danh sách các khóa học */}
                    <Courses />
                </div>

                <SidebarRight />
            </section>
        </>
    );
};

export default StudentHomePage;
