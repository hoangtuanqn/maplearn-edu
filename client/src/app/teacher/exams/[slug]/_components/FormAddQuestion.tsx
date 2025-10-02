import { useState } from "react";
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
import { Textarea } from "~/components/ui/textarea";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "~/components/ui/select";
import { Plus, Trash2, CheckCircle, Square, Circle, ArrowUpDown, Hash } from "lucide-react";
import { toast } from "sonner";
import { notificationErrorApi } from "~/libs/apis/http";
import examApi from "~/apiRequest/admin/exam";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
// Question types
const questionTypes = [
    { value: "SINGLE_CHOICE", label: "Trắc nghiệm một đáp án", icon: Circle },
    { value: "MULTIPLE_CHOICE", label: "Trắc nghiệm nhiều đáp án", icon: Square },
    { value: "DRAG_DROP", label: "Kéo thả", icon: ArrowUpDown },
    { value: "TRUE_FALSE", label: "Đúng/Sai", icon: CheckCircle },
    { value: "NUMERIC_INPUT", label: "Nhập số", icon: Hash },
];

export function FormAddQuestion({ idPaper }: { idPaper: number }) {
    const router = useRouter();
    const [open, setOpen] = useState(false);
    const [addData, setAddData] = useState<{
        type: string;
        content: string;
        marks: number;
        options: { content: string; is_correct: boolean }[];
        correct: string[];
        explanation: string;
    }>({
        type: "SINGLE_CHOICE",
        content: "",
        marks: 1,
        options: [
            { content: "", is_correct: false },
            { content: "", is_correct: false },
        ],
        correct: [],
        explanation: "",
    });

    // Update helpers
    const updateField = (field: string, value: any) => {
        setAddData((prev) => ({ ...prev, [field]: value }));
    };
    const updateOption = (idx: number, value: string) => {
        const newOptions = [...addData.options];
        newOptions[idx] = { ...newOptions[idx], content: value };
        setAddData((prev) => ({ ...prev, options: newOptions }));
    };
    const addOption = () => {
        setAddData((prev) => ({ ...prev, options: [...prev.options, { content: "", is_correct: false }] }));
    };
    const removeOption = (idx: number) => {
        if (addData.options.length > 2) {
            setAddData((prev) => ({ ...prev, options: prev.options.filter((_, i) => i !== idx) }));
        }
    };
    const toggleCorrect = (idx: number) => {
        let newOptions = [...addData.options];
        let newCorrect: string[] = [];
        if (addData.type === "SINGLE_CHOICE" || addData.type === "TRUE_FALSE") {
            newOptions = newOptions.map((opt, i) => ({ ...opt, is_correct: i === idx }));
            newCorrect = [newOptions[idx].content];
        } else if (addData.type === "MULTIPLE_CHOICE") {
            newOptions[idx].is_correct = !newOptions[idx].is_correct;
            newCorrect = newOptions.filter((opt) => opt.is_correct).map((opt) => opt.content);
        } else if (addData.type === "DRAG_DROP") {
            newOptions[idx].is_correct = !newOptions[idx].is_correct;
            newCorrect = newOptions.filter((opt) => opt.is_correct).map((opt) => opt.content);
        }
        setAddData((prev) => ({ ...prev, options: newOptions, correct: newCorrect }));
    };
    // For DRAG_DROP: move correct option up/down
    const moveCorrect = (idx: number, direction: "up" | "down") => {
        if (addData.type !== "DRAG_DROP") return;
        const correct = [...addData.correct];
        if ((direction === "up" && idx === 0) || (direction === "down" && idx === correct.length - 1)) return;
        const swapIdx = direction === "up" ? idx - 1 : idx + 1;
        [correct[idx], correct[swapIdx]] = [correct[swapIdx], correct[idx]];
        setAddData((prev) => ({ ...prev, correct }));
    };
    // Handle type change
    const handleTypeChange = (value: string) => {
        let newOptions = addData.options;
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
        setAddData((prev) => ({ ...prev, type: value as typeof prev.type, options: newOptions, correct: [] }));
    };

    const mutationAddQuestion = useMutation({
        mutationFn: async (data) => examApi.addQuestion(data),
        onSuccess: () => {
            setOpen(false);
            router.refresh();
            setAddData({
                content: "",
                marks: 0,
                type: "SINGLE_CHOICE",
                options: [
                    { content: "", is_correct: false },
                    { content: "", is_correct: false },
                ],
                correct: [],
                explanation: "",
            });
            toast.success("Thêm câu hỏi thành công");
        },
        onError: notificationErrorApi,
    });

    // Save handler
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Validate
        if (!addData.content.trim()) {
            toast.error("Vui lòng nhập nội dung câu hỏi");
            return;
        }
        if (addData.marks <= 0) {
            toast.error("Điểm số phải lớn hơn 0");
            return;
        }
        if (addData.type === "NUMERIC_INPUT") {
            if (!addData.correct[0] || (typeof addData.correct[0] === "string" && addData.correct[0].trim() === "")) {
                toast.error("Vui lòng nhập đáp án số");
                return;
            }
        } else if (addData.type === "DRAG_DROP") {
            if (addData.options.length < 2) {
                toast.error("Phải có ít nhất 2 phần tử kéo thả");
                return;
            }
            const hasEmptyOptions = addData.options.some((opt) => !opt.content.trim());
            if (hasEmptyOptions) {
                toast.error("Tất cả phần tử kéo thả phải có nội dung");
                return;
            }
            if (addData.correct.length === 0) {
                toast.error("Vui lòng chọn ít nhất một đáp án đúng");
                return;
            }
        } else {
            if (addData.options.length < 2) {
                toast.error("Phải có ít nhất 2 lựa chọn");
                return;
            }
            const hasEmptyOptions = addData.options.some((opt) => !opt.content.trim());
            if (hasEmptyOptions) {
                toast.error("Tất cả lựa chọn phải có nội dung");
                return;
            }
            const hasCorrectAnswer = addData.options.some((opt) => opt.is_correct);
            if (!hasCorrectAnswer) {
                toast.error("Vui lòng chọn ít nhất một đáp án đúng");
                return;
            }
            if (addData.type === "SINGLE_CHOICE" || addData.type === "TRUE_FALSE") {
                const correctCount = addData.options.filter((opt) => opt.is_correct).length;
                if (correctCount !== 1) {
                    toast.error("Chỉ được có một đáp án đúng");
                    return;
                }
            }
            console.log(addData);

            mutationAddQuestion.mutate({
                exam_paper_id: idPaper,
                ...addData,
            } as any);
        }
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button variant="outline" className="w-full">
                    Thêm câu hỏi
                </Button>
            </DialogTrigger>
            <DialogContent className="bg-white sm:max-w-[800px]">
                <DialogHeader>
                    <DialogTitle>Thêm câu hỏi mới</DialogTitle>
                    <DialogDescription>Nhập thông tin câu hỏi. Nhấn lưu để hoàn tất.</DialogDescription>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                        <div className="w-full">
                            <Label className="mb-2 block">Loại câu hỏi</Label>
                            <Select value={addData.type} onValueChange={handleTypeChange}>
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
                                value={addData.marks}
                                onChange={(e) =>
                                    updateField("marks", Math.max(0, Math.min(parseFloat(e.target.value) || 0, 10)))
                                }
                                placeholder="Nhập điểm"
                                className="mb-2"
                            />
                        </div>
                    </div>
                    <div>
                        <Label className="mb-2 block">Nội dung câu hỏi ({addData.content.length}/1000)</Label>
                        <Textarea
                            value={addData.content}
                            onChange={(e) => updateField("content", e.target.value)}
                            placeholder="Nhập nội dung câu hỏi..."
                            maxLength={1000}
                            rows={3}
                            className="mb-2"
                        />
                    </div>
                    {/* Options based on type */}
                    {(addData.type === "SINGLE_CHOICE" || addData.type === "MULTIPLE_CHOICE") && (
                        <div>
                            <div className="mb-3 flex items-center justify-between">
                                <Label className="mb-2 block">Các lựa chọn</Label>
                                <Button type="button" variant="ghost" size="sm" onClick={addOption}>
                                    <Plus className="h-4 w-4" /> Thêm lựa chọn
                                </Button>
                            </div>
                            <div className="space-y-2">
                                {addData.options.map((option, idx) => (
                                    <div key={idx} className="flex items-start gap-3">
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
                                                maxLength={255}
                                            />
                                        </div>
                                        {addData.options.length > 2 && (
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
                    {addData.type === "TRUE_FALSE" && (
                        <div>
                            <Label className="mb-2 block">Chọn đáp án đúng</Label>
                            <div className="space-y-2">
                                {addData.options.map((option, idx) => (
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
                    {addData.type === "DRAG_DROP" && (
                        <div>
                            <div className="mb-3 flex items-center justify-between">
                                <Label className="mb-2 block">Các phần tử kéo thả (chọn đáp án đúng và thứ tự)</Label>
                                <Button type="button" variant="ghost" size="sm" onClick={addOption}>
                                    <Plus className="h-4 w-4" /> Thêm phần tử
                                </Button>
                            </div>
                            <div className="space-y-2">
                                {addData.options.map((option, idx) => (
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
                                        {addData.options.length > 2 && (
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
                            {addData.correct.length > 1 && (
                                <div className="mt-4">
                                    <Label className="mb-2 block">Thứ tự đáp án đúng</Label>
                                    <div className="space-y-2">
                                        {addData.correct.map((content, idx) => (
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
                                                    disabled={idx === addData.correct.length - 1}
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
                    {addData.type === "NUMERIC_INPUT" && (
                        <div>
                            <Label className="mb-2 block">Đáp án chính xác</Label>
                            <Input
                                type="number"
                                value={addData.correct[0] || ""}
                                onChange={(e) => updateField("correct", [e.target.value])}
                                placeholder="Nhập đáp án số"
                                className="mb-2"
                            />
                        </div>
                    )}
                    <div>
                        <Label className="mb-2 block">Giải thích (tùy chọn 0/5000)</Label>
                        <Textarea
                            value={addData.explanation}
                            onChange={(e) => updateField("explanation", e.target.value)}
                            placeholder="Nhập giải thích cho câu hỏi..."
                            rows={2}
                            maxLength={5000}
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
                            Tạo mới
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}
