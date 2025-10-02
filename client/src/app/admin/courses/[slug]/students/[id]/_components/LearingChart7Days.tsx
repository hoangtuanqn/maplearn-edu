"use client";
import React from "react";
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
    CartesianGrid,
    Legend,
    LineChart,
    Line,
} from "recharts";
import { Last7DaysItemSchema } from "~/schemaValidate/admin/student.schema";
const LearingChart7Days = ({ learningStats }: { learningStats: Last7DaysItemSchema[] }) => {
    return (
        <div className="mb-8 grid grid-cols-1 gap-3 lg:grid-cols-2">
            <div className="rounded-lg border border-gray-100 bg-white p-6 shadow-sm">
                <h2 className="mb-4 text-base font-semibold text-gray-900">
                    Biểu đồ số bài giảng đã học (7 ngày gần nhất)
                </h2>
                <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={learningStats} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="date" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="lessons_completed" fill="#3b82f6" name="Bài giảng" />
                    </BarChart>
                </ResponsiveContainer>
            </div>
            <div className="rounded-lg border border-gray-100 bg-white p-6 shadow-sm">
                <h2 className="mb-4 text-base font-semibold text-gray-900">Biểu đồ thời lượng học (7 ngày gần nhất)</h2>
                <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={learningStats} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="date" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Line
                            type="monotone"
                            dataKey="total_duration"
                            stroke="#8b5cf6"
                            name="Giờ học"
                            strokeWidth={3}
                        />
                    </LineChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
};

export default LearingChart7Days;
