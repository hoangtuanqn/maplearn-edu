"use client";
import React from "react";
import {
    BookOpen,
    Clock,
    Users,
    Edit3,
    Trash2,
    Plus,
    Settings,
    MapPin,
    Trophy,
    Target,
    Shield,
    FileText,
    AlertCircle,
} from "lucide-react";
import { Button } from "~/components/ui/button";
import { Badge } from "~/components/ui/badge";
import { QuestionsExamResponse } from "~/schemaValidate/exam.schema";
import RenderLatex from "~/components/RenderLatex";
import Image from "next/image";
import { gradeLevelsMock } from "~/mockdata/gradeLevels";

interface ExamDetailViewProps {
    exam: QuestionsExamResponse["data"];
}

const ExamDetailView: React.FC<ExamDetailViewProps> = ({ exam }) => {
    const handleEditExam = () => {
        // TODO: Implement edit exam logic
        console.log("Edit exam:", exam.id);
    };

    const handleEditQuestion = (questionId: number) => {
        // TODO: Implement edit question logic
        console.log("Edit question:", questionId);
    };

    const handleDeleteQuestion = (questionId: number) => {
        // TODO: Implement delete question logic
        console.log("Delete question:", questionId);
    };

    const handleAddQuestion = () => {
        // TODO: Implement add question logic
        console.log("Add new question to exam:", exam.id);
    };

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

    const getQuestionTypeText = (type: string) => {
        switch (type) {
            case "SINGLE_CHOICE":
                return "Trắc nghiệm 1 đáp án";
            case "MULTIPLE_CHOICE":
                return "Trắc nghiệm nhiều đáp án";
            case "DRAG_DROP":
                return "Kéo thả";
            case "TRUE_FALSE":
                return "Đúng/Sai";
            case "NUMERIC_INPUT":
                return "Nhập số";
            default:
                return type;
        }
    };

    const getQuestionTypeColor = (type: string) => {
        switch (type) {
            case "SINGLE_CHOICE":
                return "bg-blue-100 text-blue-800";
            case "MULTIPLE_CHOICE":
                return "bg-purple-100 text-purple-800";
            case "DRAG_DROP":
                return "bg-green-100 text-green-800";
            case "TRUE_FALSE":
                return "bg-orange-100 text-orange-800";
            case "NUMERIC_INPUT":
                return "bg-pink-100 text-pink-800";
            default:
                return "bg-gray-100 text-gray-800";
        }
    };

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
                        <Button onClick={handleEditExam} variant="outline" className="flex items-center gap-2">
                            <Edit3 className="h-4 w-4" />
                            Chỉnh sửa đề thi
                        </Button>
                    </div>
                </div>
            </div>

            {/* Exam Information */}
            <div className="grid gap-6 lg:grid-cols-2">
                {/* Basic Information */}
                <div className="rounded-xl border border-gray-100 bg-white p-6 shadow-sm">
                    <h3 className="mb-4 flex items-center gap-2 text-lg font-semibold text-gray-900">
                        <Settings className="h-5 w-5" />
                        Thông tin cơ bản
                    </h3>
                    <div className="space-y-4">
                        <div className="flex items-center gap-3">
                            <MapPin className="h-4 w-4 text-gray-500" />
                            <span className="text-sm text-gray-600">Tỉnh thành:</span>
                            <span className="font-medium">{exam.province}</span>
                        </div>
                        <div className="flex items-center gap-3">
                            <Target className="h-4 w-4 text-gray-500" />
                            <span className="text-sm text-gray-600">Cấp bậc:</span>
                            <span className="font-medium">
                                {gradeLevelsMock.find((level) => level.slug === exam.grade_level)?.name}
                            </span>
                        </div>
                        <div className="flex items-center gap-3">
                            <Trophy className="h-4 w-4 text-gray-500" />
                            <span className="text-sm text-gray-600">Điểm tối đa:</span>
                            <span className="font-medium">{exam.max_score} điểm</span>
                        </div>
                        <div className="flex items-center gap-3">
                            <Target className="h-4 w-4 text-gray-500" />
                            <span className="text-sm text-gray-600">Điểm đạt:</span>
                            <span className="font-medium">{exam.pass_score} điểm</span>
                        </div>
                    </div>
                </div>

                {/* Time & Attempts */}
                <div className="rounded-xl border border-gray-100 bg-white p-6 shadow-sm">
                    <h3 className="mb-4 flex items-center gap-2 text-lg font-semibold text-gray-900">
                        <Clock className="h-5 w-5" />
                        Thời gian & Lượt thi
                    </h3>
                    <div className="space-y-4">
                        <div className="flex items-center gap-3">
                            <Clock className="h-4 w-4 text-gray-500" />
                            <span className="text-sm text-gray-600">Thời gian:</span>
                            <span className="font-medium">{exam.duration_minutes} phút</span>
                        </div>
                        <div className="flex items-center gap-3">
                            <Users className="h-4 w-4 text-gray-500" />
                            <span className="text-sm text-gray-600">Tổng lượt thi:</span>
                            <span className="font-medium">{exam.total_attempt_count}</span>
                        </div>
                        <div className="flex items-center gap-3">
                            <Shield className="h-4 w-4 text-gray-500" />
                            <span className="text-sm text-gray-600">Chống gian lận:</span>
                            <Badge variant={exam.anti_cheat_enabled ? "default" : "secondary"}>
                                {exam.anti_cheat_enabled ? "Bật" : "Tắt"}
                            </Badge>
                        </div>
                        <div className="flex items-center gap-3">
                            <AlertCircle className="h-4 w-4 text-gray-500" />
                            <span className="text-sm text-gray-600">Số lần vi phạm tối đa:</span>
                            <span className="font-medium">{exam.max_violation_attempts}</span>
                        </div>
                    </div>
                </div>
            </div>

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
                            <p className="text-sm text-gray-600">
                                Tổng điểm: {exam.questions.reduce((sum, q) => sum + q.marks, 0)} điểm
                            </p>
                        </div>
                    </div>
                    <Button onClick={handleAddQuestion} variant="outline" className="flex items-center gap-2">
                        <Plus className="h-4 w-4" />
                        Thêm câu hỏi
                    </Button>
                </div>

                {/* Questions List */}
                <div className="space-y-4">
                    {exam.questions.map((question, index) => (
                        <div key={question.id} className="overflow-hidden rounded-lg border border-gray-200 bg-gray-50">
                            {/* Question Header */}
                            <div className="flex items-center justify-between border-b border-gray-200 bg-white px-6 py-4">
                                <div className="flex items-center gap-3">
                                    <div className="bg-primary/10 text-primary flex h-8 w-8 items-center justify-center rounded-full text-sm font-bold">
                                        {index + 1}
                                    </div>
                                    <div>
                                        <div className="mb-2 flex items-center gap-2">
                                            <span className="font-semibold text-gray-900">Câu {index + 1}</span>
                                            <Badge variant="outline" className={getQuestionTypeColor(question.type)}>
                                                {getQuestionTypeText(question.type)}
                                            </Badge>
                                        </div>
                                        <p className="text-sm text-gray-600">
                                            Điểm: {question.marks} | ID: {question.id}
                                        </p>
                                    </div>
                                </div>
                                <div className="flex gap-2">
                                    <Button
                                        onClick={() => handleEditQuestion(question.id)}
                                        variant="outline"
                                        size="sm"
                                        className="flex items-center gap-1"
                                    >
                                        <Edit3 className="h-3 w-3" />
                                        Sửa
                                    </Button>
                                    <Button
                                        onClick={() => handleDeleteQuestion(question.id)}
                                        variant="outline"
                                        size="sm"
                                        className="flex items-center gap-1 text-red-600 hover:text-red-700"
                                    >
                                        <Trash2 className="h-3 w-3" />
                                        Xóa
                                    </Button>
                                </div>
                            </div>

                            {/* Question Content */}
                            <div className="p-6">
                                <div className="mb-4">
                                    <h4 className="mb-2 font-medium text-gray-900">Nội dung câu hỏi:</h4>
                                    <div className="rounded-lg bg-white p-4 text-gray-800">
                                        <RenderLatex content={question.content} />
                                    </div>
                                </div>

                                {/* Question Images */}
                                {question.images && question.images.length > 0 && (
                                    <div className="mb-4">
                                        <h4 className="mb-2 font-medium text-gray-900">Hình ảnh:</h4>
                                        <div className="flex flex-wrap gap-2">
                                            {question.images.map((image, imgIndex) => (
                                                <Image
                                                    key={imgIndex}
                                                    src={image}
                                                    alt={`Question image ${imgIndex + 1}`}
                                                    width={80}
                                                    height={80}
                                                    className="h-20 w-20 rounded-lg border object-cover"
                                                />
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {/* Question Options */}
                                {question.options && question.options.length > 0 && (
                                    <div className="mb-4">
                                        <h4 className="mb-2 font-medium text-gray-900">Các lựa chọn:</h4>
                                        <div className="space-y-2">
                                            {question.options.map((option, optionIndex) => {
                                                // Tạm thời đánh dấu đáp án A là đúng (cần cập nhật logic này khi có API đầy đủ)
                                                const isCorrect = option.is_correct; // TODO: Update this logic based on actual correct answer data

                                                return (
                                                    <div
                                                        key={optionIndex}
                                                        className={`flex items-center gap-3 rounded-lg p-3 transition-colors ${
                                                            isCorrect
                                                                ? "border-2 border-green-200 bg-green-50"
                                                                : "border border-gray-200 bg-white hover:bg-gray-50"
                                                        }`}
                                                    >
                                                        <div
                                                            className={`flex h-8 w-8 items-center justify-center rounded-full text-sm font-semibold ${
                                                                isCorrect
                                                                    ? "bg-green-500 text-white shadow-md"
                                                                    : "bg-gray-100 text-gray-600"
                                                            }`}
                                                        >
                                                            {String.fromCharCode(65 + optionIndex)}
                                                        </div>
                                                        <div className="flex-1">
                                                            <RenderLatex content={option.content} />
                                                        </div>
                                                        {isCorrect && (
                                                            <div className="flex items-center gap-2 rounded-full bg-green-100 px-3 py-1">
                                                                <div className="h-2 w-2 rounded-full bg-green-500"></div>
                                                                <span className="text-xs font-semibold text-green-700">
                                                                    Đáp án đúng
                                                                </span>
                                                            </div>
                                                        )}
                                                    </div>
                                                );
                                            })}
                                        </div>
                                    </div>
                                )}

                                {/* Question Explanation */}
                                {question.explanation && (
                                    <div>
                                        <h4 className="mb-2 font-medium text-gray-900">Giải thích:</h4>
                                        <div className="rounded-lg bg-blue-50 p-4 text-blue-800">
                                            <RenderLatex content={question.explanation} />
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    ))}

                    {exam.questions.length === 0 && (
                        <div className="flex flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 py-12">
                            <FileText className="h-12 w-12 text-gray-400" />
                            <h3 className="mt-4 text-lg font-medium text-gray-900">Chưa có câu hỏi nào</h3>
                            <p className="mt-2 text-gray-600">Bắt đầu thêm câu hỏi đầu tiên cho đề thi này.</p>
                            <Button onClick={handleAddQuestion} className="mt-4 flex items-center gap-2">
                                <Plus className="h-4 w-4" />
                                Thêm câu hỏi đầu tiên
                            </Button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ExamDetailView;
