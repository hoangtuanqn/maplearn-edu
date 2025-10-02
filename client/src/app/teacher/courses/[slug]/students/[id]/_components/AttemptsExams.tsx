import Link from "next/link";
import React from "react";
import DisplayNoData from "~/app/(student)/_components/Courses/DisplayNoData";
import DisplayTotalResult from "~/app/admin/_components/DisplayTotalResult";
import { formatter } from "~/libs/format";
import { ExamAttemptSchema } from "~/schemaValidate/admin/student.schema";

const AttemptsExams = ({ testResults }: { testResults: ExamAttemptSchema[] }) => {
    return (
        <div className="mb-8 rounded-lg border border-gray-100 bg-white p-6 shadow-sm">
            <h2 className="mb-4 text-base font-semibold text-gray-900">Lịch sử làm kiểm tra</h2>
            <div className="mt-8 overflow-x-auto">
                <DisplayTotalResult total={testResults.length} />
                <table className="min-w-full rounded-xl bg-white shadow-sm">
                    <thead>
                        <tr className="border-b border-gray-200">
                            <th className="px-4 py-3 text-left text-xs font-semibold text-zinc-600">Lần làm bài</th>
                            <th className="px-4 py-3 text-left text-xs font-semibold text-zinc-600">
                                Tên bài kiểm tra
                            </th>
                            <th className="px-4 py-3 text-left text-xs font-semibold text-zinc-600">Ngày làm</th>
                            <th className="px-4 py-3 text-left text-xs font-semibold text-zinc-600">Điểm số</th>
                        </tr>
                    </thead>
                    <tbody className="text-xs">
                        {testResults.length == 0 && (
                            <tr>
                                <td colSpan={4} className="py-6">
                                    <DisplayNoData title="Chưa có dữ liệu bài làm của người dùng" />
                                </td>
                            </tr>
                        )}
                        {testResults.map((attempt, idx) => (
                            <tr
                                key={idx}
                                className="border-b border-gray-100 transition-colors last:border-b-0 hover:bg-blue-50"
                            >
                                <td className="px-4 py-3 text-zinc-500">{idx + 1}</td>
                                <td className="px-4 py-3 text-zinc-500">
                                    <Link
                                        href={`/exams/${attempt.slug_exam}/results/${attempt.id}`}
                                        className="text-blue-500"
                                        target="_blank"
                                    >
                                        {attempt.title}
                                    </Link>
                                </td>
                                <td className="px-4 py-3 text-zinc-500">{formatter.date(attempt.created_at, true)}</td>
                                <td
                                    className={`px-4 py-3 ${
                                        attempt.score >= attempt.pass_score ? "text-green-600" : "text-red-600"
                                    }`}
                                >
                                    {attempt.score}/{attempt.max_score} điểm
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AttemptsExams;
