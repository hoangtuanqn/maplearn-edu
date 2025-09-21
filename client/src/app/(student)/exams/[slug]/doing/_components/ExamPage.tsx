"use client";
import React, { useCallback, useEffect, useState } from "react";

import { useMutation } from "@tanstack/react-query";
import examApi from "~/apiRequest/exam";
import { getLocalStorage, removeLocalStorage, setLocalStorage } from "~/libs/localStorage";
import { Question, QuestionsExamResponse } from "~/schemaValidate/exam.schema";
import useCountDown from "~/hooks/useCountDown";
import { formatter } from "~/libs/format";
import FullScreen from "../_components/FullScreen";
import { AnswerLocalStorage } from "../exam.type";

import Sidebar from "../_components/Sidebar";
import Footer from "../_components/Footer";
import Questions from "../_components/Questions";
import { toast } from "sonner";
import { useUnsavedChangesWarning } from "~/hooks/useUnsavedChangesWarning";
import Loading from "~/app/(student)/_components/Loading";
import { useRouter } from "next/navigation";
import { exitFullscreen } from "~/libs/hepler";
import { AlertTriangle, Clock, Shield } from "lucide-react";

const ExamPage = ({ slug, questionsRes }: { slug: string; questionsRes: QuestionsExamResponse["data"] }) => {
    const [mounted, setMounted] = useState(false);
    const [questionActive, setQuestionActive] = useState(0); // index câu hiện tại
    const [infoExam, setInfoExam] = useState<AnswerLocalStorage>();
    const [questions, setQuestions] = useState<Question[]>([]);
    const [answers, setAnswers] = useState<Record<number, string[]>>({});
    const [violationCount, setViolationCount] = useState(0); // tính số lần vi phạm
    const { timeLeft, setTimeLeft } = useCountDown(1);
    const { timeLeft: countdownSubmit, setTimeLeft: setCountdownSubmit } = useCountDown(0);
    const router = useRouter();

    // Còn thời gian làm bài mà reload sẽ có cảnh báo
    useUnsavedChangesWarning(timeLeft > 0);

    // Chọn đáp án
    // idx: chỉ dành cho cái drag_drop thôi nhé
    const handleChoiceAnswer = (questionId: number, answer: string, idx?: number) => {
        const question = questions.find((ques) => ques.id === questionId);

        switch (question?.type) {
            case "SINGLE_CHOICE":
            case "NUMERIC_INPUT":
            case "TRUE_FALSE":
                setAnswers((prev) => ({ ...prev, [questionId]: [answer] }));
                break;
            case "MULTIPLE_CHOICE":
                setAnswers((prev) => {
                    const currentAnswers = prev[questionId] || [];

                    if (currentAnswers.includes(answer)) {
                        // Nếu đã chọn rồi thì bỏ chọn
                        return { ...prev, [questionId]: currentAnswers.filter((ans) => ans !== answer) };
                    } else {
                        // Nếu chưa chọn thì thêm vào
                        return { ...prev, [questionId]: [...currentAnswers, answer] };
                    }
                });
                break;
            case "DRAG_DROP":
                if (idx) {
                    setAnswers((prev) => {
                        const countAnswer = question.options.length ?? 0;
                        // Loại bỏ phần tử rỗng k có giá trị
                        const newAnswers = Array.from(
                            { length: countAnswer },
                            (_, i) => prev?.[questionId]?.[i],
                        ).filter((ans) => ans);
                        newAnswers[idx - 1] = answer; // idx - 1 vì mảng bắt đầu từ 0
                        return { ...prev, [questionId]: newAnswers };
                    });
                }
                break;
            default:
                toast.error("Loại câu hỏi không hợp lệ!");
        }
    };

    // Submit bài thi
    const submitAnswerMutation = useMutation({
        mutationFn: (data: AnswerLocalStorage) => examApi.submitAnswer(slug, data),
        onSuccess: (data) => {
            console.log("Nộp bài rồi: ", data);

            toast.success("Đã nộp bài làm thành công");
            exitFullscreen();
            removeLocalStorage(slug); // Xóa dữ liệu localStorage sau khi nộp bài
            router.push(`/exams/${slug}/results/${data.data.data.id_attempt}`);
        },
        onError: () => {
            toast.error("Đã có lỗi xảy ra khi nộp bài");
            router.push(`/exams/${slug}`);
        },
    });

    const handleSubmitExam = useCallback(() => {
        const dataExam = getLocalStorage(slug);
        const answers = JSON.parse(dataExam ?? "{}") as AnswerLocalStorage;
        submitAnswerMutation.mutate(answers);
    }, [slug, submitAnswerMutation]);

    // Detected Cheat Exam
    const detectCheatingMutation = useMutation({
        mutationFn: async () => {
            const res = await examApi.detectCheating(slug);
            return res.data.data;
        },
        onSuccess: (data) => {
            if (data.status !== "in_progress") {
                removeLocalStorage(slug);
                alert(data.note || "Bài thi đã bị hủy do vi phạm quy chế thi.");
                exitFullscreen();
                router.push(`/exams/${slug}/results`);
            }
            setViolationCount(data.violation_count ?? 0);
        },
        onError: () => {
            // router.push(`/exams/${slug}`);
        },
    });
    // Function sẽ được gọi nếu phát hiện gian lận
    const handleCheatingDetected = () => {
        // Api đang rảnh rỗi thì mới gọi
        if (!detectCheatingMutation.isPending) {
            detectCheatingMutation.mutate();
        }
    };

    // Mount
    useEffect(() => setMounted(true), []);

    // Lấy dữ liệu từ localStorage khi load lần đầu
    useEffect(() => {
        const dataStr = getLocalStorage(slug);
        if (dataStr) {
            const data: AnswerLocalStorage = JSON.parse(dataStr);
            setInfoExam(data);
            setAnswers(data.answers || {});
            setQuestionActive(data.questionActive || 0);
            // ! Không xóa: mở lại khi đi bảo vệ
            // setCountdownSubmit(1 * 60 - Math.floor((Date.now() - data.start) / 1000)); // tính thời gian còn lại
        } else {
            const startTime = Date.now();
            const newData: AnswerLocalStorage = { answers: {}, start: startTime, questionActive: 0 };
            setInfoExam(newData);
            setLocalStorage(slug, JSON.stringify(newData));
            // setCountdownSubmit(5 * 60);
            // ! Không xóa: mở lại khi đi bảo vệ
            // setCountdownSubmit(1 * 60); // test thì 1p thôi
        }
    }, [setCountdownSubmit, slug]);

    // Khi có dữ liệu câu hỏi
    useEffect(() => {
        setQuestions(questionsRes.questions || []);
        // Thiết lập thời gian ban đầu
        if (questionsRes.duration_minutes && infoExam?.start) {
            const durationSec = questionsRes.duration_minutes * 60;
            const passedSec = Math.floor((Date.now() - infoExam.start) / 1000);
            setTimeLeft(Math.max(durationSec - passedSec, 0));
            // setTimeLeft(5);
        }
    }, [questionsRes, infoExam, setTimeLeft]);

    // Lưu lại answers vào localStorage mỗi khi thay đổi
    useEffect(() => {
        if (infoExam) {
            setLocalStorage(
                slug,
                JSON.stringify({
                    answers,
                    start: infoExam.start, // Giữ nguyên start ban đầu
                    questionActive, // Giữ nguyên questionActive ban đầu
                }),
            );
        }
    }, [answers, infoExam, questionActive, slug]);

    useEffect(() => {
        if (timeLeft == 0 && !submitAnswerMutation.isPending && submitAnswerMutation.submittedAt === 0) {
            handleSubmitExam();
        }
    }, [timeLeft, handleSubmitExam, submitAnswerMutation]);
    return (
        <>
            {submitAnswerMutation.isPending && <Loading />}
            {questionsRes.anti_cheat_enabled && !submitAnswerMutation.isPending && (
                <FullScreen violationCount={violationCount} onDetected={handleCheatingDetected} />
            )}

            <div className="min-h-screen">
                <div className="mx-auto px-4 py-6">
                    {/* Header */}
                    <div className="mb-6 rounded-xl border border-gray-100 bg-white p-6 shadow-sm">
                        <h2 className="text-primary text-2xl font-bold">{questionsRes.title}</h2>
                        <div className="mt-2 flex items-center gap-2 text-sm text-gray-600">
                            <Shield className="text-primary h-4 w-4" />
                            <span>Đang làm bài thi - Vui lòng không rời khỏi trang</span>
                        </div>
                    </div>

                    {/* Alerts */}
                    <div className="mb-6 space-y-4">
                        {questionsRes.anti_cheat_enabled && violationCount > 0 && (
                            <div className="rounded-xl border border-yellow-200 bg-yellow-50 p-4 shadow-sm">
                                <div className="flex items-center gap-3">
                                    <AlertTriangle className="h-5 w-5 text-yellow-600" />
                                    <div className="flex-1">
                                        <div className="flex items-center gap-3">
                                            <span className="font-semibold text-yellow-800">Cảnh báo vi phạm:</span>
                                            <span className="rounded-full bg-red-100 px-2 py-1 text-sm font-bold text-red-700">
                                                {violationCount}/{questionsRes.max_violation_attempts}
                                            </span>
                                        </div>
                                        <p className="mt-1 text-sm text-yellow-700">
                                            Nếu bạn vi phạm quá {questionsRes.max_violation_attempts} lần, hệ thống sẽ
                                            tự động hủy bài thi.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        )}

                        {timeLeft > 1 && timeLeft <= 180 && (
                            <div className="rounded-xl border border-red-200 bg-red-50 p-4 shadow-sm">
                                <div className="flex items-center gap-3">
                                    <Clock className="h-5 w-5 text-red-600" />
                                    <div className="flex-1">
                                        <div className="flex items-center gap-3">
                                            <span className="font-semibold text-red-800">Cảnh báo:</span>
                                            <span className="rounded-full bg-red-100 px-3 py-1 text-sm font-bold text-red-700">
                                                {formatter.parseMinutesSeconds(timeLeft)}
                                            </span>
                                        </div>
                                        <p className="mt-1 text-sm text-red-700">
                                            Hệ thống sẽ tự động nộp bài khi hết giờ.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Main Content */}
                    <div className="flex flex-col gap-6 xl:flex-row">
                        <Questions
                            payload={{
                                questions,
                                questionActive,
                                answers,
                                handleChoiceAnswer,
                                mounted,
                                setQuestionActive,
                            }}
                        />

                        <Sidebar
                            payload={{
                                handleSubmitExam,
                                setQuestionActive,
                                questions,
                                countdownSubmit,
                                timeLeft,
                                questionActive,
                                answers,
                            }}
                        />
                    </div>

                    <Footer payload={{ setQuestionActive, questionActive, countQuestion: questions.length, answers }} />
                </div>
            </div>
        </>
    );
};

export default ExamPage;
