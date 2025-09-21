import React from "react";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Textarea } from "~/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { Badge } from "~/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "~/components/ui/select";
import { Plus, Trash2, CheckCircle, Circle, Square, ArrowUpDown, Hash } from "lucide-react";

// Question types
const questionTypes = [
    { value: "SINGLE_CHOICE", label: "Trắc nghiệm một đáp án", icon: Circle },
    { value: "MULTIPLE_CHOICE", label: "Trắc nghiệm nhiều đáp án", icon: Square },
    { value: "DRAG_DROP", label: "Kéo thả", icon: ArrowUpDown },
    { value: "TRUE_FALSE", label: "Đúng/Sai", icon: CheckCircle },
    { value: "NUMERIC_INPUT", label: "Nhập số", icon: Hash },
];

// Question interface
interface QuestionOption {
    content: string;
    is_correct?: boolean;
}

interface Question {
    id: string;
    type: "SINGLE_CHOICE" | "MULTIPLE_CHOICE" | "DRAG_DROP" | "TRUE_FALSE" | "NUMERIC_INPUT";
    content: string;
    score: number;
    options: QuestionOption[];
    correct_answer?: string[];
    explanation?: string;
}

interface FormAddQuestionProps {
    questions: Question[];
    setQuestions: React.Dispatch<React.SetStateAction<Question[]>>;
    maxScore: number;
    getTotalScore: () => number;
}

const FormAddQuestion: React.FC<FormAddQuestionProps> = ({ questions, setQuestions, maxScore, getTotalScore }) => {
    // Question management functions
    const addQuestion = () => {
        const newQuestion: Question = {
            id: Date.now().toString(),
            type: "SINGLE_CHOICE",
            content: "",
            score: 0.25,
            options: [
                { content: "", is_correct: false },
                { content: "", is_correct: false },
                { content: "", is_correct: false },
                { content: "", is_correct: false },
            ],
            correct_answer: [],
            explanation: "",
        };
        setQuestions([...questions, newQuestion]);
    };

    const removeQuestion = (questionId: string) => {
        setQuestions(questions.filter((q) => q.id !== questionId));
    };

    const updateQuestion = (questionId: string, updates: Partial<Question>) => {
        setQuestions(questions.map((q) => (q.id === questionId ? { ...q, ...updates } : q)));
    };

    const updateQuestionOption = (questionId: string, optionIndex: number, content: string) => {
        const question = questions.find((q) => q.id === questionId);
        if (question) {
            const newOptions = [...question.options];
            newOptions[optionIndex] = { ...newOptions[optionIndex], content };
            updateQuestion(questionId, { options: newOptions });
        }
    };

    const toggleCorrectAnswer = (questionId: string, optionIndex: number) => {
        const question = questions.find((q) => q.id === questionId);
        if (!question) return;

        const newOptions = [...question.options];

        if (question.type === "SINGLE_CHOICE" || question.type === "TRUE_FALSE") {
            // For single choice and true/false, only one can be correct
            newOptions.forEach((opt, idx) => {
                opt.is_correct = idx === optionIndex;
            });
        } else if (question.type === "MULTIPLE_CHOICE") {
            // For multiple choice, toggle the selected option
            newOptions[optionIndex].is_correct = !newOptions[optionIndex].is_correct;
        }

        // Update correct_answer array based on selected options
        const correctAnswers = newOptions.filter((opt) => opt.is_correct).map((opt) => opt.content);

        updateQuestion(questionId, {
            options: newOptions,
            correct_answer: correctAnswers,
        });
    };

    const addQuestionOption = (questionId: string) => {
        const question = questions.find((q) => q.id === questionId);
        if (question) {
            const newOptions = [...question.options, { content: "", is_correct: false }];
            updateQuestion(questionId, { options: newOptions });
        }
    };

    const removeQuestionOption = (questionId: string, optionIndex: number) => {
        const question = questions.find((q) => q.id === questionId);
        if (question && question.options.length > 2) {
            const newOptions = question.options.filter((_, idx) => idx !== optionIndex);
            updateQuestion(questionId, { options: newOptions });
        }
    };

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h3 className="text-lg font-semibold text-gray-900">Câu hỏi</h3>
                    <p
                        className={`text-sm ${getTotalScore() > maxScore ? "font-semibold text-red-600" : "text-gray-600"}`}
                    >
                        Tổng điểm: {getTotalScore().toFixed(2)}/{maxScore} điểm
                        {getTotalScore() > maxScore && " (Vượt quá giới hạn!)"}
                    </p>
                </div>
                <Button type="button" onClick={addQuestion} className="flex items-center gap-2" variant="outline">
                    <Plus className="h-4 w-4" />
                    Thêm câu hỏi
                </Button>
            </div>

            {questions.map((question, questionIndex) => (
                <Card key={question.id} className="border border-gray-200">
                    <CardHeader className="pb-4">
                        <div className="flex items-center justify-between">
                            <CardTitle className="text-base">Câu {questionIndex + 1}</CardTitle>
                            <div className="flex items-center gap-2">
                                <Badge variant="outline">
                                    {questionTypes.find((t) => t.value === question.type)?.label}
                                </Badge>
                                <Button
                                    type="button"
                                    variant="ghost"
                                    size="sm"
                                    onClick={() => removeQuestion(question.id)}
                                    className="text-red-600 hover:text-red-700"
                                >
                                    <Trash2 className="h-4 w-4" />
                                </Button>
                            </div>
                        </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        {/* Question Type */}
                        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                            <div>
                                <label className="text-sm font-medium text-gray-700">Loại câu hỏi</label>
                                <Select
                                    value={question.type}
                                    onValueChange={(value: any) => {
                                        const newType = value as Question["type"];
                                        let newOptions = question.options;

                                        // Reset options based on question type
                                        if (newType === "TRUE_FALSE") {
                                            newOptions = [
                                                { content: "Đúng", is_correct: false },
                                                { content: "Sai", is_correct: false },
                                            ];
                                        } else if (newType === "NUMERIC_INPUT") {
                                            newOptions = [];
                                        } else if (newType === "DRAG_DROP") {
                                            newOptions = [
                                                { content: "", is_correct: true },
                                                { content: "", is_correct: true },
                                            ];
                                        } else if (newOptions.length < 2) {
                                            newOptions = [
                                                { content: "", is_correct: false },
                                                { content: "", is_correct: false },
                                            ];
                                        }

                                        updateQuestion(question.id, {
                                            type: newType,
                                            options: newOptions,
                                            correct_answer: [],
                                        });
                                    }}
                                >
                                    <SelectTrigger>
                                        <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {questionTypes.map((type) => (
                                            <SelectItem key={type.value} value={type.value}>
                                                <div className="flex items-center gap-2">
                                                    <type.icon className="h-4 w-4" />
                                                    {type.label}
                                                </div>
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>

                            <div>
                                <label className="text-sm font-medium text-gray-700">Điểm số</label>
                                <Input
                                    type="number"
                                    step="0.25"
                                    min="0"
                                    max={maxScore}
                                    value={question.score}
                                    onChange={(e) =>
                                        updateQuestion(question.id, {
                                            score: Math.max(0, Math.min(parseFloat(e.target.value) || 0, maxScore)),
                                        })
                                    }
                                    placeholder="Nhập điểm"
                                />
                            </div>
                        </div>

                        {/* Question Content */}
                        <div>
                            <label className="text-sm font-medium text-gray-700">Nội dung câu hỏi</label>
                            <Textarea
                                value={question.content}
                                onChange={(e) => updateQuestion(question.id, { content: e.target.value })}
                                placeholder="Nhập nội dung câu hỏi..."
                                rows={3}
                            />
                        </div>

                        {/* Options based on question type */}
                        {question.type === "SINGLE_CHOICE" && (
                            <div>
                                <div className="mb-3 flex items-center justify-between">
                                    <label className="text-sm font-medium text-gray-700">Các lựa chọn</label>
                                    <Button
                                        type="button"
                                        variant="ghost"
                                        size="sm"
                                        onClick={() => addQuestionOption(question.id)}
                                    >
                                        <Plus className="h-4 w-4" />
                                        Thêm lựa chọn
                                    </Button>
                                </div>
                                <div className="space-y-2">
                                    {question.options.map((option, optionIndex) => (
                                        <div key={optionIndex} className="flex items-center gap-3">
                                            <Button
                                                type="button"
                                                variant="ghost"
                                                size="sm"
                                                onClick={() => toggleCorrectAnswer(question.id, optionIndex)}
                                                className={`p-2 ${option.is_correct ? "bg-green-50 text-green-600" : "text-gray-400"}`}
                                            >
                                                <Circle
                                                    className={`h-4 w-4 ${option.is_correct ? "fill-current" : ""}`}
                                                />
                                            </Button>
                                            <Input
                                                value={option.content}
                                                onChange={(e) =>
                                                    updateQuestionOption(question.id, optionIndex, e.target.value)
                                                }
                                                placeholder={`Lựa chọn ${optionIndex + 1}`}
                                                className="flex-1"
                                            />
                                            {question.options.length > 2 && (
                                                <Button
                                                    type="button"
                                                    variant="ghost"
                                                    size="sm"
                                                    onClick={() => removeQuestionOption(question.id, optionIndex)}
                                                    className="text-red-600"
                                                >
                                                    <Trash2 className="h-4 w-4" />
                                                </Button>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {question.type === "MULTIPLE_CHOICE" && (
                            <div>
                                <div className="mb-3 flex items-center justify-between">
                                    <label className="text-sm font-medium text-gray-700">
                                        Các lựa chọn (chọn nhiều đáp án đúng)
                                    </label>
                                    <Button
                                        type="button"
                                        variant="ghost"
                                        size="sm"
                                        onClick={() => addQuestionOption(question.id)}
                                    >
                                        <Plus className="h-4 w-4" />
                                        Thêm lựa chọn
                                    </Button>
                                </div>
                                <div className="space-y-2">
                                    {question.options.map((option, optionIndex) => (
                                        <div key={optionIndex} className="flex items-center gap-3">
                                            <Button
                                                type="button"
                                                variant="ghost"
                                                size="sm"
                                                onClick={() => toggleCorrectAnswer(question.id, optionIndex)}
                                                className={`p-2 ${option.is_correct ? "bg-green-50 text-green-600" : "text-gray-400"}`}
                                            >
                                                <Square
                                                    className={`h-4 w-4 ${option.is_correct ? "fill-current" : ""}`}
                                                />
                                            </Button>
                                            <Input
                                                value={option.content}
                                                onChange={(e) =>
                                                    updateQuestionOption(question.id, optionIndex, e.target.value)
                                                }
                                                placeholder={`Lựa chọn ${optionIndex + 1}`}
                                                className="flex-1"
                                            />
                                            {question.options.length > 2 && (
                                                <Button
                                                    type="button"
                                                    variant="ghost"
                                                    size="sm"
                                                    onClick={() => removeQuestionOption(question.id, optionIndex)}
                                                    className="text-red-600"
                                                >
                                                    <Trash2 className="h-4 w-4" />
                                                </Button>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {question.type === "TRUE_FALSE" && (
                            <div>
                                <label className="mb-3 block text-sm font-medium text-gray-700">Chọn đáp án đúng</label>
                                <div className="space-y-2">
                                    {question.options.map((option, optionIndex) => (
                                        <div key={optionIndex} className="flex items-center gap-3">
                                            <Button
                                                type="button"
                                                variant="ghost"
                                                size="sm"
                                                onClick={() => toggleCorrectAnswer(question.id, optionIndex)}
                                                className={`p-2 ${option.is_correct ? "bg-green-50 text-green-600" : "text-gray-400"}`}
                                            >
                                                <Circle
                                                    className={`h-4 w-4 ${option.is_correct ? "fill-current" : ""}`}
                                                />
                                            </Button>
                                            <span className="flex-1 py-2">{option.content}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {question.type === "DRAG_DROP" && (
                            <div>
                                <div className="mb-3 flex items-center justify-between">
                                    <label className="text-sm font-medium text-gray-700">Các phần tử kéo thả</label>
                                    <Button
                                        type="button"
                                        variant="ghost"
                                        size="sm"
                                        onClick={() => addQuestionOption(question.id)}
                                    >
                                        <Plus className="h-4 w-4" />
                                        Thêm phần tử
                                    </Button>
                                </div>
                                <div className="space-y-2">
                                    {question.options.map((option, optionIndex) => (
                                        <div key={optionIndex} className="flex items-center gap-3">
                                            <ArrowUpDown className="h-4 w-4 text-blue-600" />
                                            <Input
                                                value={option.content}
                                                onChange={(e) =>
                                                    updateQuestionOption(question.id, optionIndex, e.target.value)
                                                }
                                                placeholder={`Phần tử ${optionIndex + 1}`}
                                                className="flex-1"
                                            />
                                            {question.options.length > 2 && (
                                                <Button
                                                    type="button"
                                                    variant="ghost"
                                                    size="sm"
                                                    onClick={() => removeQuestionOption(question.id, optionIndex)}
                                                    className="text-red-600"
                                                >
                                                    <Trash2 className="h-4 w-4" />
                                                </Button>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {question.type === "NUMERIC_INPUT" && (
                            <div>
                                <label className="text-sm font-medium text-gray-700">Đáp án chính xác</label>
                                <Input
                                    type="number"
                                    value={question.correct_answer?.[0] || ""}
                                    onChange={(e) =>
                                        updateQuestion(question.id, {
                                            correct_answer: [e.target.value],
                                        })
                                    }
                                    placeholder="Nhập đáp án số"
                                />
                            </div>
                        )}

                        {/* Explanation */}
                        <div>
                            <label className="text-sm font-medium text-gray-700">Giải thích (tùy chọn)</label>
                            <Textarea
                                value={question.explanation || ""}
                                onChange={(e) => updateQuestion(question.id, { explanation: e.target.value })}
                                placeholder="Nhập giải thích cho câu hỏi..."
                                rows={2}
                            />
                        </div>
                    </CardContent>
                </Card>
            ))}

            {questions.length === 0 && (
                <div className="py-8 text-center text-gray-500">
                    <p>Chưa có câu hỏi nào. Hãy thêm câu hỏi đầu tiên!</p>
                </div>
            )}
        </div>
    );
};

export default FormAddQuestion;
