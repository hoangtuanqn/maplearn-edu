"use client";
import Image from "next/image";
import React from "react";
import RenderLatex from "~/components/RenderLatex";
import { Badge } from "~/components/ui/badge";
import { Button } from "~/components/ui/button";
import { QuestionsExamResponse } from "~/schemaValidate/exam.schema";
import SingleChoice from "~/app/(student)/exams/[slug]/doing/_components/SingleChoice";
import MultipleChoice from "~/app/(student)/exams/[slug]/doing/_components/MultipleChoice";
import NumericInput from "~/app/(student)/exams/[slug]/doing/_components/NumericInput";
import TrueFalseAnswer from "~/app/(student)/exams/[slug]/doing/_components/TrueFalseAnswer";
import DragDrop from "~/app/(student)/exams/[slug]/doing/_components/DragDrop";
import { FileText, Plus, Trash2 } from "lucide-react";
import { DangerConfirm } from "~/components/DangerConfirm";
import { useMutation } from "@tanstack/react-query";
import examApi from "~/apiRequest/admin/exam";
import { notificationErrorApi } from "~/libs/apis/http";
import { toast } from "sonner";
import Loading from "~/app/(student)/_components/Loading";
import { FormEditQuestion } from "./FormEditQuestion";
import { useRouter } from "next/navigation";
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
const QuestionList = ({ exam }: { exam: QuestionsExamResponse["data"] }) => {
    const router = useRouter();

    const mutationDeleteQuestion = useMutation({
        mutationFn: (id: number) => examApi.deleteQuestion(id),
        onSuccess: () => {
            // Sau khi xóa thành công, refetch lại danh sách câu hỏi
            router.refresh();
            toast.success("Xóa câu hỏi thành công");
        },
        onError: notificationErrorApi,
    });
    return (
        <>
            {mutationDeleteQuestion.isPending && <Loading />}
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
                                <FormEditQuestion question={question} />
                                <DangerConfirm
                                    message={`Bạn có chắc chắn muốn xóa câu hỏi có ID "${question.id}" này? Hành động này không thể hoàn tác.`}
                                    action={() => mutationDeleteQuestion.mutate(question.id)}
                                >
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        className="flex items-center gap-1 text-red-600 hover:text-red-700"
                                    >
                                        <Trash2 className="h-3 w-3" />
                                        Xóa
                                    </Button>
                                </DangerConfirm>
                            </div>
                        </div>

                        {/* Question Content */}
                        <div className="p-6">
                            {question.type !== "DRAG_DROP" && (
                                <div className="mb-4">
                                    <h4 className="mb-2 font-medium text-gray-900">Nội dung câu hỏi:</h4>
                                    <div className="rounded-lg bg-white p-4 text-[16px] text-gray-800">
                                        <RenderLatex content={question.content} />
                                    </div>
                                </div>
                            )}

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
                                        {question.type === "SINGLE_CHOICE" && Array.isArray(question.correct) && (
                                            <SingleChoice
                                                activeAnswer={[question.correct[0]]}
                                                handleChoiceAnswer={() => {}}
                                                idQuestion={question.id}
                                                answers={question.options}
                                            />
                                        )}
                                        {question.type === "MULTIPLE_CHOICE" && (
                                            <MultipleChoice
                                                activeAnswers={question.correct}
                                                handleChoiceAnswer={() => {}}
                                                idQuestion={question.id}
                                                answers={question.options}
                                            />
                                        )}
                                        {question.type === "NUMERIC_INPUT" && (
                                            <NumericInput
                                                handleChoiceAnswer={() => {}}
                                                idQuestion={question.id}
                                                activeAnswer={question.correct}
                                            />
                                        )}
                                        {question.type === "TRUE_FALSE" && (
                                            <TrueFalseAnswer
                                                idQuestion={question.id}
                                                answers={question.options || []}
                                                activeAnswer={question.correct}
                                                handleChoiceAnswer={() => {}}
                                            />
                                        )}
                                        {question.type === "DRAG_DROP" && (
                                            <DragDrop
                                                question={question.content || ""}
                                                items={(question.options || []).map((opt: any, idx: number) => ({
                                                    id: opt.id ?? idx,
                                                    content: opt.content,
                                                    is_correct: opt.is_correct,
                                                }))}
                                                activeAnswers={question.correct ?? []}
                                                idQuestion={question.id}
                                                handleChoiceAnswer={() => {}}
                                                disabled={true}
                                            />
                                        )}
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
                        <Button onClick={() => {}} className="mt-4 flex items-center gap-2">
                            <Plus className="h-4 w-4" />
                            Thêm câu hỏi đầu tiên
                        </Button>
                    </div>
                )}
            </div>
        </>
    );
};

export default QuestionList;
