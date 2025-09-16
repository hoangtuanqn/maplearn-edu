import Posts from "./Posts";
import TopStudents from "./TopStudents";
// import CourseActive from "./CourseActive";
const SidebarRight = () => {
    return (
        <aside className="hidden w-[22%] 2xl:block">
            <div
                className="scrollbar sticky w-[100%] rounded-md"
                // className="sticky w-[100%] overflow-hidden rounded-md pt-5"
                style={{ top: "76px", maxHeight: "calc(100vh - 76px)" }}
            >
                <div className="flex flex-col gap-5"></div>
                <TopStudents />
                {/* <CourseActive /> */}
                <Posts />
            </div>
        </aside>
    );
};

export default SidebarRight;
