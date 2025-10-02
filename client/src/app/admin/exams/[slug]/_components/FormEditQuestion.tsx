"use client";
import { Edit3 } from "lucide-react";
import { Button } from "~/components/ui/button";
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "~/components/ui/dialog";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { QuestionsExamResponse } from "~/schemaValidate/exam.schema";
import { useState } from "react";
import { Plus, Trash2, CheckCircle, Square, Circle, ArrowUpDown, Hash } from "lucide-react";
import { Textarea } from "~/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "~/components/ui/select";
import { useMutation } from "@tanstack/react-query";
import { notificationErrorApi } from "~/libs/apis/http";
import { toast } from "sonner";
import examApi from "~/apiRequest/admin/exam";
import { useRouter } from "next/navigation";

export function FormEditQuestion({ question }: { question: QuestionsExamResponse["data"]["questions"][number] }) {
    const router = useRouter();
    // Question types
    const questionTypes = [
        { value: "SINGLE_CHOICE", label: "Trắc nghiệm một đáp án", icon: Circle },
        { value: "MULTIPLE_CHOICE", label: "Trắc nghiệm nhiều đáp án", icon: Square },
        { value: "DRAG_DROP", label: "Kéo thả", icon: ArrowUpDown },
        { value: "TRUE_FALSE", label: "Đúng/Sai", icon: CheckCircle },
        { value: "NUMERIC_INPUT", label: "Nhập số", icon: Hash },
    ];

    // Sync is_correct with correct array for initial state
    const initialCorrect = Array.isArray(question.correct) ? question.correct : [];
    const initialOptions = (question.options || []).map((opt) => ({
        ...opt,
        is_correct:
            initialCorrect.includes(opt.content) ||
            (question.type === "TRUE_FALSE" && initialCorrect.length > 0 && initialCorrect[0] === opt.content),
    }));
    const [editData, setEditData] = useState(() => ({
        type: question.type,
        content: question.content,
        marks: question.marks,
        options: initialOptions,
        correct: [...initialCorrect],
        explanation: question.explanation || "",
    }));
    const [open, setOpen] = useState(false);

    // Update helpers
    const updateField = (field: string, value: any) => {
        setEditData((prev) => ({ ...prev, [field]: value }));
    };
    const updateOption = (idx: number, value: string) => {
        const newOptions = [...editData.options];
        newOptions[idx] = { ...newOptions[idx], content: value };
        setEditData((prev) => ({ ...prev, options: newOptions }));
    };
    const addOption = () => {
        setEditData((prev) => ({ ...prev, options: [...prev.options, { content: "", is_correct: false }] }));
    };
    const removeOption = (idx: number) => {
        if (editData.options.length > 2) {
            setEditData((prev) => ({ ...prev, options: prev.options.filter((_, i) => i !== idx) }));
        }
    };
    const toggleCorrect = (idx: number) => {
        let newOptions = [...editData.options];
        let newCorrect: string[] = [];
        if (editData.type === "SINGLE_CHOICE" || editData.type === "TRUE_FALSE") {
            newOptions = newOptions.map((opt, i) => ({ ...opt, is_correct: i === idx }));
            newCorrect = [newOptions[idx].content];
        } else if (editData.type === "MULTIPLE_CHOICE") {
            newOptions[idx].is_correct = !newOptions[idx].is_correct;
            newCorrect = newOptions.filter((opt) => opt.is_correct).map((opt) => opt.content);
        } else if (editData.type === "DRAG_DROP") {
            // For DRAG_DROP, correct is ordered array of contents
            newOptions[idx].is_correct = !newOptions[idx].is_correct;
            // Keep order as in options
            newCorrect = newOptions.filter((opt) => opt.is_correct).map((opt) => opt.content);
        }
        setEditData((prev) => ({ ...prev, options: newOptions, correct: newCorrect }));
    };

    // For DRAG_DROP: move correct option up/down
    const moveCorrect = (idx: number, direction: "up" | "down") => {
        if (editData.type !== "DRAG_DROP") return;
        const correct = [...editData.correct];
        if ((direction === "up" && idx === 0) || (direction === "down" && idx === correct.length - 1)) return;
        const swapIdx = direction === "up" ? idx - 1 : idx + 1;
        [correct[idx], correct[swapIdx]] = [correct[swapIdx], correct[idx]];
        setEditData((prev) => ({ ...prev, correct }));
    };

    // Handle type change
    const handleTypeChange = (value: string) => {
        let newOptions = editData.options;
        if (value === "TRUE_FALSE") {
            newOptions = [
                { content: "Đúng", is_correct: false },
                { content: "Sai", is_correct: false },
            ];
        } else if (value === "NUMERIC_INPUT") {
            newOptions = [];
        } else if (value === "DRAG_DROP") {
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
        setEditData((prev) => ({ ...prev, type: value as typeof prev.type, options: newOptions, correct: [] }));
    };

    const mutationEditQuestion = useMutation({
        mutationFn: (data: typeof editData) => examApi.editQuestion(question.id, data),
        onSuccess: () => {
            setOpen(false);
            router.refresh();
            toast.success("Cập nhật câu hỏi thành công");
        },
        onError: notificationErrorApi,
    });

    // Demo save handler
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        mutationEditQuestion.mutate(editData);
        // console.log("Edited question:", editData);
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button variant="outline" size="sm" className="flex items-center gap-1">
                    <Edit3 className="h-3 w-3" />
                    Sửa
                </Button>
            </DialogTrigger>
            <DialogContent className="bg-white sm:max-w-[800px]">
                <DialogHeader>
                    <DialogTitle>Chỉnh sửa câu hỏi</DialogTitle>
                    <DialogDescription>Thay đổi thông tin câu hỏi. Nhấn lưu để hoàn tất.</DialogDescription>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                        <div className="w-full">
                            <Label className="mb-2 block">Loại câu hỏi</Label>
                            <Select value={editData.type} onValueChange={handleTypeChange}>
                                <SelectTrigger className="mb-2 w-full">
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                    {questionTypes.map((type) => (
                                        <SelectItem key={type.value} value={type.value}>
                                            {type.label}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                        <div>
                            <Label className="mb-2 block">Điểm số</Label>
                            <Input
                                type="number"
                                step="0.25"
                                min={0}
                                max={10}
                                value={editData.marks}
                                onChange={(e) =>
                                    updateField("marks", Math.max(0, Math.min(parseFloat(e.target.value) || 0, 10)))
                                }
                                placeholder="Nhập điểm"
                                className="mb-2"
                            />
                        </div>
                    </div>
                    <div>
                        <Label className="mb-2 block">Nội dung câu hỏi</Label>
                        <Textarea
                            value={editData.content}
                            onChange={(e) => updateField("content", e.target.value)}
                            placeholder="Nhập nội dung câu hỏi..."
                            rows={3}
                            className="mb-2"
                        />
                    </div>
                    {/* Options based on type */}
                    {(editData.type === "SINGLE_CHOICE" || editData.type === "MULTIPLE_CHOICE") && (
                        <div>
                            <div className="mb-3 flex items-center justify-between">
                                <Label className="mb-2 block">Các lựa chọn</Label>
                                <Button type="button" variant="ghost" size="sm" onClick={addOption}>
                                    <Plus className="h-4 w-4" /> Thêm lựa chọn
                                </Button>
                            </div>
                            <div className="space-y-2">
                                {editData.options.map((option, idx) => (
                                    <div key={idx} className="flex items-center gap-3">
                                        <Button
                                            type="button"
                                            variant={option.is_correct ? "default" : "outline"}
                                            size="sm"
                                            onClick={() => toggleCorrect(idx)}
                                        >
                                            {option.is_correct ? (
                                                <CheckCircle className="h-4 w-4 text-green-600" />
                                            ) : (
                                                <Circle className="h-4 w-4 text-gray-400" />
                                            )}
                                        </Button>
                                        <div className="flex-1">
                                            <Input
                                                value={option.content}
                                                onChange={(e) => updateOption(idx, e.target.value)}
                                                placeholder={`Lựa chọn ${idx + 1}`}
                                                className="mb-2 w-full"
                                            />
                                        </div>
                                        {editData.options.length > 2 && (
                                            <Button
                                                type="button"
                                                variant="ghost"
                                                size="sm"
                                                onClick={() => removeOption(idx)}
                                            >
                                                <Trash2 className="h-4 w-4 text-red-600" />
                                            </Button>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                    {editData.type === "TRUE_FALSE" && (
                        <div>
                            <Label className="mb-2 block">Chọn đáp án đúng</Label>
                            <div className="space-y-2">
                                {editData.options.map((option, idx) => (
                                    <div key={idx} className="flex items-center gap-3">
                                        <Button
                                            type="button"
                                            variant={option.is_correct ? "default" : "outline"}
                                            size="sm"
                                            onClick={() => toggleCorrect(idx)}
                                        >
                                            {option.is_correct ? (
                                                <CheckCircle className="h-4 w-4 text-green-600" />
                                            ) : (
                                                <Circle className="h-4 w-4 text-gray-400" />
                                            )}
                                        </Button>
                                        <span className="ml-2 font-medium">{option.content}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                    {editData.type === "DRAG_DROP" && (
                        <div>
                            <div className="mb-3 flex items-center justify-between">
                                <Label className="mb-2 block">Các phần tử kéo thả (chọn đáp án đúng và thứ tự)</Label>
                                <Button type="button" variant="ghost" size="sm" onClick={addOption}>
                                    <Plus className="h-4 w-4" /> Thêm phần tử
                                </Button>
                            </div>
                            <div className="space-y-2">
                                {editData.options.map((option, idx) => (
                                    <div key={idx} className="flex items-center gap-3">
                                        <Button
                                            type="button"
                                            variant={option.is_correct ? "default" : "outline"}
                                            size="sm"
                                            onClick={() => toggleCorrect(idx)}
                                        >
                                            {option.is_correct ? (
                                                <CheckCircle className="h-4 w-4 text-green-600" />
                                            ) : (
                                                <Circle className="h-4 w-4 text-gray-400" />
                                            )}
                                        </Button>
                                        <div className="flex-1">
                                            <Input
                                                value={option.content}
                                                onChange={(e) => updateOption(idx, e.target.value)}
                                                placeholder={`Phần tử ${idx + 1}`}
                                                className="mb-2 w-full"
                                            />
                                        </div>
                                        {editData.options.length > 2 && (
                                            <Button
                                                type="button"
                                                variant="ghost"
                                                size="sm"
                                                onClick={() => removeOption(idx)}
                                            >
                                                <Trash2 className="h-4 w-4 text-red-600" />
                                            </Button>
                                        )}
                                    </div>
                                ))}
                            </div>
                            {/* Show correct answers in order if any */}
                            {editData.correct.length > 1 && (
                                <div className="mt-4">
                                    <Label className="mb-2 block">Thứ tự đáp án đúng</Label>
                                    <div className="space-y-2">
                                        {editData.correct.map((content, idx) => (
                                            <div key={idx} className="flex items-center gap-2">
                                                <span className="rounded bg-gray-100 px-2 py-1 text-sm">{idx + 1}</span>
                                                <span className="font-medium">{content}</span>
                                                <Button
                                                    type="button"
                                                    variant="ghost"
                                                    size="sm"
                                                    disabled={idx === 0}
                                                    onClick={() => moveCorrect(idx, "up")}
                                                >
                                                    ↑
                                                </Button>
                                                <Button
                                                    type="button"
                                                    variant="ghost"
                                                    size="sm"
                                                    disabled={idx === editData.correct.length - 1}
                                                    onClick={() => moveCorrect(idx, "down")}
                                                >
                                                    ↓
                                                </Button>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    )}
                    {editData.type === "NUMERIC_INPUT" && (
                        <div>
                            <Label className="mb-2 block">Đáp án chính xác</Label>
                            <Input
                                type="number"
                                value={editData.correct[0] || ""}
                                onChange={(e) => updateField("correct", [e.target.value])}
                                placeholder="Nhập đáp án số"
                                className="mb-2"
                            />
                        </div>
                    )}
                    <div>
                        <Label className="mb-2 block">Giải thích (tùy chọn)</Label>
                        <Textarea
                            value={editData.explanation}
                            onChange={(e) => updateField("explanation", e.target.value)}
                            placeholder="Nhập giải thích cho câu hỏi..."
                            rows={2}
                            className="mb-2"
                        />
                    </div>
                    <DialogFooter>
                        <DialogClose asChild>
                            <Button variant="outline" type="button">
                                Hủy
                            </Button>
                        </DialogClose>
                        <Button type="submit" variant="primary">
                            Lưu thay đổi
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}
