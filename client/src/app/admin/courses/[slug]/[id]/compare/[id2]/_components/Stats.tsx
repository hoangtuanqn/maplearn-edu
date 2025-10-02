"use client";
import { TrendingUp, TrendingDown, Minus, AlertTriangle, CheckCircle2 } from "lucide-react";
import type { StudyProgress7DaysSchema } from "~/schemaValidate/admin/student.schema";
import {
    Bar,
    BarChart,
    CartesianGrid,
    Cell,
    Legend,
    Line,
    LineChart,
    Pie,
    PieChart,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis,
} from "recharts";

const Stats = ({ studentA, studentB }: { studentA: StudyProgress7DaysSchema; studentB: StudyProgress7DaysSchema }) => {
    const violationDataA = [
        {
            name: "Không vi phạm",
            value: Number(studentA.no_violation_count ?? 0),
            color: "#10b981",
        },
        {
            name: "Có vi phạm",
            value: Number(studentA.violation_count ?? 0),
            color: "#ef4444",
        },
    ];

    const violationDataB = [
        {
            name: "Không vi phạm",
            value: Number(studentB.no_violation_count ?? 0),
            color: "#10b981",
        },
        {
            name: "Có vi phạm",
            value: Number(studentB.violation_count ?? 0),
            color: "#ef4444",
        },
    ];

    const chapterProgressData = (studentA.chapter_progress || []).map((item, idx) => ({
        chapter: `Chương ${idx + 1}`,
        [studentA.full_name]: item.completion_rate,
        [studentB.full_name]: studentB.chapter_progress?.[idx]?.completion_rate ?? 0,
    }));

    const weeklyStudyData = (studentA.last_7_days || []).map((item, idx) => {
        return {
            date: item.date,
            [studentA.full_name]: Number(item.total_duration),
            [studentB.full_name]: Number(studentB.last_7_days?.[idx]?.total_duration ?? 0),
        };
    });

    const maxExamLength = Math.max(studentA.exam_attempts.length, studentB.exam_attempts.length);
    const examAttemptsData = Array.from({ length: maxExamLength }, (_, idx) => ({
        name: `Lần thi thứ ${idx + 1}`,
        [studentA.full_name]: studentA.exam_attempts[idx]?.score ?? null,
        [studentB.full_name]: studentB.exam_attempts[idx]?.score ?? null,
    }));

    const lessonsCompletedA = studentA.last_7_days?.reduce((sum, d) => sum + d.lessons_completed, 0) ?? 0;
    const lessonsCompletedB = studentB.last_7_days?.reduce((sum, d) => sum + d.lessons_completed, 0) ?? 0;
    const lessonsDiff = lessonsCompletedB - lessonsCompletedA;
    const scoreDiff = (studentB.highest_score ?? 0) - (studentA.highest_score ?? 0);
    const examDiff = studentB.exam_attempts.length - studentA.exam_attempts.length;
    const streakDiff = studentB.max_streak - studentA.max_streak;

    const CustomTooltip = ({ active, payload, label }: any) => {
        if (active && payload && payload.length) {
            return (
                <div className="rounded-lg border bg-white p-3 shadow-lg">
                    <p className="text-foreground mb-2 text-sm font-semibold">{label}</p>
                    {payload.map((entry: any, index: number) => (
                        <p key={index} className="text-muted-foreground text-xs">
                            <span style={{ color: entry.color }}>{entry.name}:</span>{" "}
                            <span className="text-foreground font-semibold">{entry.value}</span>
                        </p>
                    ))}
                </div>
            );
        }
        return null;
    };

    const ComparisonIndicator = ({ value }: { value: number }) => {
        if (value > 0) {
            return (
                <span className="flex items-center justify-center gap-1 text-green-400">
                    <TrendingUp className="h-4 w-4" />+{value}
                </span>
            );
        } else if (value < 0) {
            return (
                <span className="flex items-center justify-center gap-1 text-red-400">
                    <TrendingDown className="h-4 w-4" />
                    {value}
                </span>
            );
        }
        return (
            <span className="text-muted-foreground flex items-center justify-center">
                <Minus className="h-4 w-4" />0
            </span>
        );
    };

    return (
        <>
            <div className="mb-8 grid grid-cols-1 gap-5 lg:grid-cols-2 lg:gap-7">
                {/* Chapter Progress Chart */}
                <div className="rounded-xl border border-gray-100 bg-white p-5 shadow-sm transition-all hover:border-blue-300/60 hover:shadow-md">
                    <h3 className="mb-4 text-base font-semibold text-gray-900">Tiến Độ (%) Theo Chương</h3>
                    <ResponsiveContainer width="100%" height={260}>
                        <BarChart data={chapterProgressData} margin={{ top: 10, right: 10, left: -10, bottom: 40 }}>
                            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" vertical={false} />
                            <XAxis
                                dataKey="chapter"
                                tick={{ fontSize: 12, fill: "#64748b" }}
                                tickLine={false}
                                angle={-45}
                                textAnchor="end"
                                height={60}
                            />
                            <YAxis tick={{ fontSize: 12, fill: "#64748b" }} tickLine={false} axisLine={false} />
                            <Tooltip content={<CustomTooltip />} />
                            <Legend wrapperStyle={{ fontSize: "13px", paddingTop: "10px" }} iconType="circle" />
                            <Bar dataKey={studentA.full_name} fill="#3b82f6" radius={[6, 6, 0, 0]} />
                            <Bar dataKey={studentB.full_name} fill="#10b981" radius={[6, 6, 0, 0]} />
                        </BarChart>
                    </ResponsiveContainer>
                </div>

                {/* Weekly Study Time Chart */}
                <div className="rounded-xl border border-gray-100 bg-white p-5 shadow-sm transition-all hover:border-green-300/60 hover:shadow-md">
                    <h3 className="mb-4 text-base font-semibold text-gray-900">
                        Giờ học từng ngày (trong 7 ngày gần nhất)
                    </h3>
                    <ResponsiveContainer width="100%" height={260}>
                        <LineChart data={weeklyStudyData} margin={{ top: 10, right: 10, left: -10, bottom: 20 }}>
                            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" vertical={false} />
                            <XAxis
                                dataKey="date"
                                tick={{ fontSize: 12, fill: "#64748b" }}
                                tickLine={false}
                                axisLine={false}
                            />
                            <YAxis
                                tick={{ fontSize: 12, fill: "#64748b" }}
                                tickLine={false}
                                axisLine={false}
                                label={{
                                    value: "Giờ",
                                    angle: -90,
                                    position: "insideLeft",
                                    style: { fontSize: 12, fill: "#64748b" },
                                }}
                            />
                            <Tooltip content={<CustomTooltip />} />
                            <Legend wrapperStyle={{ fontSize: "13px", paddingTop: "5px" }} iconType="circle" />
                            <Line
                                type="monotone"
                                dataKey={studentA.full_name}
                                stroke="#3b82f6"
                                strokeWidth={3}
                                dot={{ fill: "#3b82f6", strokeWidth: 2, r: 4 }}
                                activeDot={{ r: 6 }}
                            />
                            <Line
                                type="monotone"
                                dataKey={studentB.full_name}
                                stroke="#10b981"
                                strokeWidth={3}
                                dot={{ fill: "#10b981", strokeWidth: 2, r: 4 }}
                                activeDot={{ r: 6 }}
                            />
                        </LineChart>
                    </ResponsiveContainer>
                </div>
            </div>

            <div className="mb-8 grid grid-cols-1 gap-6 lg:grid-cols-3 lg:gap-8">
                {/* Exam History Chart */}
                <div className="border-border bg-card hover:border-primary/50 rounded-xl border p-6 transition-all lg:col-span-2">
                    <h3 className="text-foreground mb-6 text-lg font-semibold">Điểm thi từng đợt</h3>
                    <ResponsiveContainer width="100%" height={300}>
                        <LineChart data={examAttemptsData} margin={{ top: 20, right: 10, left: -20, bottom: 20 }}>
                            <CartesianGrid strokeDasharray="3 3" stroke="oklch(0.22 0 0)" vertical={false} />
                            <XAxis
                                dataKey="name"
                                tick={{ fontSize: 11, fill: "oklch(0.6 0 0)" }}
                                tickLine={false}
                                axisLine={false}
                            />
                            <YAxis
                                domain={[0, studentA.max_score_exam_paper ?? 10]}
                                tick={{ fontSize: 11, fill: "oklch(0.6 0 0)" }}
                                tickLine={false}
                                axisLine={false}
                                label={{
                                    value: "Điểm",
                                    angle: -90,
                                    position: "insideLeft",
                                    style: { fontSize: 11, fill: "oklch(0.6 0 0)" },
                                }}
                            />
                            <Tooltip content={<CustomTooltip />} />
                            <Legend wrapperStyle={{ fontSize: "12px", paddingTop: "10px" }} iconType="circle" />
                            <Line
                                type="monotone"
                                dataKey={studentA.full_name}
                                stroke="oklch(0.6 0.22 250)"
                                strokeWidth={3}
                                dot={{ fill: "oklch(0.6 0.22 250)", strokeWidth: 2, r: 5 }}
                                activeDot={{ r: 7 }}
                                connectNulls
                            />
                            <Line
                                type="monotone"
                                dataKey={studentB.full_name}
                                stroke="oklch(0.65 0.20 160)"
                                strokeWidth={3}
                                dot={{ fill: "oklch(0.65 0.20 160)", strokeWidth: 2, r: 5 }}
                                activeDot={{ r: 7 }}
                                connectNulls
                            />
                        </LineChart>
                    </ResponsiveContainer>
                </div>

                {/* Violations Comparison */}
                <div className="border-border bg-card hover:border-primary/50 rounded-xl border p-6 transition-all">
                    <h3 className="text-foreground mb-6 text-lg font-semibold">Vi Phạm Thi Cử</h3>

                    <div className="space-y-6">
                        {/* Student A Violations */}
                        <div>
                            <p className="mb-3 text-sm font-medium text-blue-400">{studentA.full_name}</p>
                            <div className="mb-3 flex items-center justify-center">
                                <ResponsiveContainer width="100%" height={120}>
                                    <PieChart>
                                        <Pie
                                            data={violationDataA}
                                            cx="50%"
                                            cy="50%"
                                            innerRadius={30}
                                            outerRadius={50}
                                            paddingAngle={2}
                                            dataKey="value"
                                        >
                                            {violationDataA.map((entry, index) => (
                                                <Cell key={`cell-a-${index}`} fill={entry.color} />
                                            ))}
                                        </Pie>
                                        <Tooltip />
                                    </PieChart>
                                </ResponsiveContainer>
                            </div>
                            <div className="space-y-2">
                                <div className="flex items-center justify-between text-xs">
                                    <div className="flex items-center gap-2">
                                        <div className="h-2 w-2 rounded-full bg-green-500" />
                                        <span className="text-muted-foreground">Không vi phạm</span>
                                    </div>
                                    <span className="text-foreground font-semibold">{violationDataA[0].value}</span>
                                </div>
                                <div className="flex items-center justify-between text-xs">
                                    <div className="flex items-center gap-2">
                                        <div className="h-2 w-2 rounded-full bg-red-500" />
                                        <span className="text-muted-foreground">Có vi phạm</span>
                                    </div>
                                    <span className="text-foreground font-semibold">{violationDataA[1].value}</span>
                                </div>
                            </div>
                        </div>

                        <div className="border-border border-t" />

                        {/* Student B Violations */}
                        <div>
                            <p className="mb-3 text-sm font-medium text-green-400">{studentB.full_name}</p>
                            <div className="mb-3 flex items-center justify-center">
                                <ResponsiveContainer width="100%" height={120}>
                                    <PieChart>
                                        <Pie
                                            data={violationDataB}
                                            cx="50%"
                                            cy="50%"
                                            innerRadius={30}
                                            outerRadius={50}
                                            paddingAngle={2}
                                            dataKey="value"
                                        >
                                            {violationDataB.map((entry, index) => (
                                                <Cell key={`cell-b-${index}`} fill={entry.color} />
                                            ))}
                                        </Pie>
                                        <Tooltip />
                                    </PieChart>
                                </ResponsiveContainer>
                            </div>
                            <div className="space-y-2">
                                <div className="flex items-center justify-between text-xs">
                                    <div className="flex items-center gap-2">
                                        <div className="h-2 w-2 rounded-full bg-green-500" />
                                        <span className="text-muted-foreground">Không vi phạm</span>
                                    </div>
                                    <span className="text-foreground font-semibold">{violationDataB[0].value}</span>
                                </div>
                                <div className="flex items-center justify-between text-xs">
                                    <div className="flex items-center gap-2">
                                        <div className="h-2 w-2 rounded-full bg-red-500" />
                                        <span className="text-muted-foreground">Có vi phạm</span>
                                    </div>
                                    <span className="text-foreground font-semibold">{violationDataB[1].value}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="border-border bg-card hover:border-primary/50 mb-8 rounded-xl border p-6 transition-all">
                <h3 className="text-foreground mb-6 text-lg font-semibold">Bảng So Sánh Chi Tiết</h3>
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead>
                            <tr className="border-border border-b">
                                <th className="text-muted-foreground pb-4 text-left text-sm font-semibold">Chỉ Số</th>
                                <th className="pb-4 text-center text-sm font-semibold text-blue-400">
                                    {studentA.full_name}
                                </th>
                                <th className="pb-4 text-center text-sm font-semibold text-green-400">
                                    {studentB.full_name}
                                </th>
                                <th className="text-muted-foreground pb-4 text-center text-sm font-semibold">
                                    Chênh Lệch
                                </th>
                            </tr>
                        </thead>
                        <tbody className="divide-border divide-y">
                            <tr className="hover:bg-secondary/50 transition-colors">
                                <td className="text-foreground py-4 text-sm">Bài đã học (7 ngày)</td>
                                <td className="py-4 text-center text-sm font-semibold text-blue-400">
                                    {lessonsCompletedA}
                                </td>
                                <td className="py-4 text-center text-sm font-semibold text-green-400">
                                    {lessonsCompletedB}
                                </td>
                                <td className="py-4 text-center text-sm font-semibold">
                                    <ComparisonIndicator value={lessonsDiff} />
                                </td>
                            </tr>
                            <tr className="hover:bg-secondary/50 transition-colors">
                                <td className="text-foreground py-4 text-sm">Điểm thi cao nhất</td>
                                <td className="py-4 text-center text-sm font-semibold text-blue-400">
                                    {studentA.highest_score ?? "-"}
                                </td>
                                <td className="py-4 text-center text-sm font-semibold text-green-400">
                                    {studentB.highest_score ?? "-"}
                                </td>
                                <td className="py-4 text-center text-sm font-semibold">
                                    <ComparisonIndicator value={scoreDiff} />
                                </td>
                            </tr>
                            <tr className="hover:bg-secondary/50 transition-colors">
                                <td className="text-foreground py-4 text-sm">Số lần thi</td>
                                <td className="py-4 text-center text-sm font-semibold text-blue-400">
                                    {studentA.exam_attempts.length}
                                </td>
                                <td className="py-4 text-center text-sm font-semibold text-green-400">
                                    {studentB.exam_attempts.length}
                                </td>
                                <td className="py-4 text-center text-sm font-semibold">
                                    <ComparisonIndicator value={examDiff} />
                                </td>
                            </tr>
                            <tr className="hover:bg-secondary/50 transition-colors">
                                <td className="text-foreground py-4 text-sm">Chuỗi học liên tiếp (max streak)</td>
                                <td className="py-4 text-center text-sm font-semibold text-blue-400">
                                    {studentA.max_streak} ngày
                                </td>
                                <td className="py-4 text-center text-sm font-semibold text-green-400">
                                    {studentB.max_streak} ngày
                                </td>
                                <td className="py-4 text-center text-sm font-semibold">
                                    <ComparisonIndicator value={streakDiff} />
                                </td>
                            </tr>
                            <tr className="hover:bg-secondary/50 transition-colors">
                                <td className="text-foreground py-4 text-sm">Tỷ lệ hoàn thành</td>
                                <td className="py-4 text-center text-sm font-semibold text-blue-400">
                                    {studentA.completion_rate}%
                                </td>
                                <td className="py-4 text-center text-sm font-semibold text-green-400">
                                    {studentB.completion_rate}%
                                </td>
                                <td className="py-4 text-center text-sm font-semibold">
                                    <ComparisonIndicator value={studentB.completion_rate - studentA.completion_rate} />
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>

            <div className="border-border bg-card hover:border-primary/50 rounded-xl border p-6 transition-all">
                <h3 className="text-foreground mb-6 text-lg font-semibold">Tóm Tắt & Nhận Xét</h3>
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                    {/* Strengths */}
                    <div className="space-y-4">
                        <div className="flex items-center gap-2">
                            <CheckCircle2 className="h-5 w-5 text-green-400" />
                            <h4 className="text-foreground text-base font-semibold">Điểm Mạnh</h4>
                        </div>
                        <div className="space-y-3">
                            {studentB.highest_score && studentB.highest_score > (studentA.highest_score ?? 0) && (
                                <div className="flex gap-3 rounded-lg border border-green-500/10 bg-green-500/5 p-3">
                                    <CheckCircle2 className="mt-0.5 h-4 w-4 flex-shrink-0 text-green-400" />
                                    <p className="text-muted-foreground text-sm">
                                        <span className="font-semibold text-green-400">{studentB.full_name}</span> đạt
                                        điểm thi cao hơn ({studentB.highest_score} so với {studentA.highest_score ?? 0})
                                    </p>
                                </div>
                            )}
                            {studentB.completion_rate > studentA.completion_rate && (
                                <div className="flex gap-3 rounded-lg border border-green-500/10 bg-green-500/5 p-3">
                                    <CheckCircle2 className="mt-0.5 h-4 w-4 flex-shrink-0 text-green-400" />
                                    <p className="text-muted-foreground text-sm">
                                        <span className="font-semibold text-green-400">{studentB.full_name}</span> có tỷ
                                        lệ hoàn thành cao hơn ({studentB.completion_rate}% so với{" "}
                                        {studentA.completion_rate}%)
                                    </p>
                                </div>
                            )}
                            {studentB.max_streak > studentA.max_streak && (
                                <div className="flex gap-3 rounded-lg border border-green-500/10 bg-green-500/5 p-3">
                                    <CheckCircle2 className="mt-0.5 h-4 w-4 flex-shrink-0 text-green-400" />
                                    <p className="text-muted-foreground text-sm">
                                        <span className="font-semibold text-green-400">{studentB.full_name}</span> có
                                        chuỗi học tập ổn định hơn ({studentB.max_streak} ngày so với{" "}
                                        {studentA.max_streak} ngày)
                                    </p>
                                </div>
                            )}
                            {violationDataB[1].value === 0 && (
                                <div className="flex gap-3 rounded-lg border border-green-500/10 bg-green-500/5 p-3">
                                    <CheckCircle2 className="mt-0.5 h-4 w-4 flex-shrink-0 text-green-400" />
                                    <p className="text-muted-foreground text-sm">
                                        <span className="font-semibold text-green-400">{studentB.full_name}</span> không
                                        có vi phạm nào trong quá trình thi cử
                                    </p>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Improvement Opportunities */}
                    <div className="space-y-4">
                        <div className="flex items-center gap-2">
                            <AlertTriangle className="h-5 w-5 text-yellow-400" />
                            <h4 className="text-foreground text-base font-semibold">Cơ Hội Cải Thiện</h4>
                        </div>
                        <div className="space-y-3">
                            {studentA.completion_rate < 100 && (
                                <div className="flex gap-3 rounded-lg border border-yellow-500/10 bg-yellow-500/5 p-3">
                                    <TrendingUp className="mt-0.5 h-4 w-4 flex-shrink-0 text-yellow-400" />
                                    <p className="text-muted-foreground text-sm">
                                        <span className="font-semibold text-blue-400">{studentA.full_name}</span> cần
                                        hoàn thành {100 - studentA.completion_rate}% khóa học còn lại
                                    </p>
                                </div>
                            )}
                            {violationDataA[1].value > 0 && (
                                <div className="flex gap-3 rounded-lg border border-yellow-500/10 bg-yellow-500/5 p-3">
                                    <TrendingUp className="mt-0.5 h-4 w-4 flex-shrink-0 text-yellow-400" />
                                    <p className="text-muted-foreground text-sm">
                                        <span className="font-semibold text-blue-400">{studentA.full_name}</span> cần
                                        cải thiện kỹ năng làm bài thi để tránh vi phạm ({violationDataA[1].value} lần vi
                                        phạm)
                                    </p>
                                </div>
                            )}
                            {studentA.max_streak < 7 && (
                                <div className="flex gap-3 rounded-lg border border-yellow-500/10 bg-yellow-500/5 p-3">
                                    <TrendingUp className="mt-0.5 h-4 w-4 flex-shrink-0 text-yellow-400" />
                                    <p className="text-muted-foreground text-sm">
                                        <span className="font-semibold text-blue-400">{studentA.full_name}</span> nên
                                        duy trì học tập đều đặn hơn để tăng chuỗi học tập
                                    </p>
                                </div>
                            )}
                            <div className="flex gap-3 rounded-lg border border-blue-500/10 bg-blue-500/5 p-3">
                                <TrendingUp className="mt-0.5 h-4 w-4 flex-shrink-0 text-blue-400" />
                                <p className="text-muted-foreground text-sm">
                                    Cả hai học sinh đều có thể tham gia thêm các hoạt động thảo luận để nâng cao hiểu
                                    biết
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Stats;
