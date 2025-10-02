import InfoStudentCard from "./_components/InfoStudentCard";
import { redirect } from "next/navigation";
import studentApiServer from "~/apiRequest/server/admin/student";
import Stats from "./_components/Stats";
import Breadcrumb from "~/app/admin/_components/Breadcrumb";

const StudentComparisonPage = async ({ params }: { params: Promise<{ slug: string; id: string; id2: string }> }) => {
    const { slug, id, id2 } = await params;
    const breadcrumbData = [
        { label: "Dashboard", href: "/admin" },
        { label: "Khóa học", href: "/admin/courses" },
        { label: "Chi tiết khóa học", href: `/admin/courses/${slug}` },
        { label: "Quá trình học", href: `/admin/courses/${slug}/students/${id}` },
        { label: "So sánh quá trình", href: `/admin/courses/${slug}/${id}/compare/${id2}` },
    ];
    let studentA, studentB;
    try {
        const [resA, resB] = await Promise.all([
            studentApiServer.getLearningStats(slug, id),
            studentApiServer.getLearningStats(slug, id2),
        ]);
        studentA = resA.data.data;
        studentB = resB.data.data;
    } catch {
        redirect("/admin/courses");
    }

    return (
        <div className="mt-5 min-h-screen bg-[#F5F5F5]">
            <div className="mb-6 flex flex-col gap-5">
                <Breadcrumb breadcrumbData={breadcrumbData} />
            </div>
            <div className="mx-auto bg-white px-4 py-8 sm:px-6 lg:px-8">
                <div className="mb-8 text-center lg:mb-12">
                    <h1 className="mb-2 text-xl font-bold tracking-tight text-gray-900">So Sánh Quá Trình Học Tập</h1>
                    <p className="text-sm text-gray-500">
                        Phân tích chi tiết tiến độ học tập và hiệu suất của hai học viên
                    </p>
                </div>

                <div className="mb-8 grid grid-cols-1 gap-5 lg:mb-12 lg:grid-cols-2 lg:gap-7">
                    <InfoStudentCard infoStudent={studentA} colorScheme="blue" />
                    <InfoStudentCard infoStudent={studentB} colorScheme="green" />
                </div>

                <Stats studentA={studentA} studentB={studentB} />
            </div>
        </div>
    );
};

export default StudentComparisonPage;
