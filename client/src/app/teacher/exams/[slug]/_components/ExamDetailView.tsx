"use client";
import React from "react";
import { BookOpen, Edit3, FileText } from "lucide-react";
import { Button } from "~/components/ui/button";
import { Badge } from "~/components/ui/badge";
import { QuestionsExamResponse } from "~/schemaValidate/exam.schema";
import QuestionList from "./QuestionList";
import InfomationExam from "./InfomationExam";
import Link from "next/link";
import { FormAddQuestion } from "./FormAddQuestion";

interface ExamDetailViewProps {
    exam: QuestionsExamResponse["data"];
}

const ExamDetailView: React.FC<ExamDetailViewProps> = ({ exam }) => {
    const getDifficultyColor = (difficulty: string) => {
        switch (difficulty) {
            case "easy":
                return "bg-green-100 text-green-800";
            case "normal":
                return "bg-blue-100 text-blue-800";
            case "hard":
                return "bg-orange-100 text-orange-800";
            case "very_hard":
                return "bg-red-100 text-red-800";
            default:
                return "bg-gray-100 text-gray-800";
        }
    };

    const getDifficultyText = (difficulty: string) => {
        switch (difficulty) {
            case "easy":
                return "Dễ";
            case "normal":
                return "Trung bình";
            case "hard":
                return "Khó";
            case "very_hard":
                return "Rất khó";
            default:
                return "Không xác định";
        }
    };
    const totalMarks = exam.questions.reduce((sum, q) => sum + q.marks, 0);

    return (
        <div className="space-y-6">
            {/* Header Section */}
            <div className="rounded-xl border border-gray-100 bg-white p-6 shadow-sm">
                <div className="flex items-start justify-between">
                    <div className="flex items-center gap-4">
                        <div className="bg-primary/10 text-primary flex h-14 w-14 items-center justify-center rounded-lg">
                            <BookOpen className="h-7 w-7" />
                        </div>
                        <div>
                            <h1 className="text-2xl font-bold text-gray-900">{exam.title}</h1>

                            <div className="mt-2 flex items-center gap-2">
                                <Badge variant="outline" className={getDifficultyColor(exam.difficulty)}>
                                    {getDifficultyText(exam.difficulty)}
                                </Badge>
                                <Badge variant="outline" className="bg-indigo-100 text-indigo-800">
                                    {exam.exam_type}
                                </Badge>
                            </div>
                        </div>
                    </div>
                    <div className="flex gap-2">
                        <Link href={`/teacher/exams/${exam.slug}/edit`}>
                            <Button variant="outline" className="flex items-center gap-2">
                                <Edit3 className="h-4 w-4" />
                                Chỉnh sửa đề thi
                            </Button>
                        </Link>
                    </div>
                </div>
            </div>

            {/* Exam Information */}
            <InfomationExam exam={exam} />

            {/* Questions Section */}
            <div className="rounded-xl border border-gray-100 bg-white p-6 shadow-sm">
                <div className="mb-6 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="bg-primary/10 text-primary flex h-10 w-10 items-center justify-center rounded-lg">
                            <FileText className="h-5 w-5" />
                        </div>
                        <div>
                            <h3 className="text-lg font-semibold text-gray-900">
                                Danh sách câu hỏi ({exam.questions.length})
                            </h3>
                            <p className="text-sm text-gray-600">Tổng điểm: {totalMarks} điểm</p>
                            {totalMarks < exam.max_score && (
                                <p className="mt-1 text-lg text-red-600">
                                    Tổng điểm các câu hỏi nhỏ hơn điểm tối đa của đề thi. Vui lòng kiểm tra lại!
                                </p>
                            )}
                        </div>
                    </div>
                    <div className="flex">{totalMarks < exam.max_score && <FormAddQuestion idPaper={exam.id} />}</div>
                </div>

                {/* Questions List */}
                <QuestionList exam={exam} />
                <div className="mt-6">
                    <FormAddQuestion idPaper={exam.id} />
                </div>
            </div>
        </div>
    );
};

export default ExamDetailView;
