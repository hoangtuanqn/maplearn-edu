import React, { Suspense } from "react";
import { Metadata } from "next";

import HistoryExamList from "./_components/HistoryExamList";
import { FilterAttemptExams } from "./_components/FilterAttemptExams";

export const metadata: Metadata = {
    title: "Lịch sử làm bài thi",
};
const CoursePage = () => {
    return (
        <section className="mt-5 bg-[#F5F5F5] p-2">
            {/* <div className="item-center mt-5 flex justify-end">
                <Link href="/admin/courses/create">
                    <Button variant="primary">Thêm khóa học</Button>
                </Link>
            </div> */}
            <div className="mt-3 rounded-lg bg-white p-4 pb-8 shadow-sm">
                <div className="flex items-center justify-between">
                    <div className="flex w-full items-center justify-between">
                        <div>
                            <h3 className="text-primary text-xl font-bold">Lịch sử làm bài thi</h3>
                            <p className="text-sm text-slate-500">
                                Danh sách lịch sử làm bài thi sẽ được hiển thị ở đây.
                            </p>
                        </div>
                        <Suspense>
                            <FilterAttemptExams />
                        </Suspense>
                    </div>
                </div>
                <Suspense>
                    <HistoryExamList />
                </Suspense>
            </div>
        </section>
    );
};

export default CoursePage;
