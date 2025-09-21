"use client";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import examApi from "~/apiRequest/exam";
import Loading from "~/app/(student)/_components/Loading";
import { Checkbox } from "~/components/ui/checkbox";
import { notificationErrorApi } from "~/libs/apis/http";
import { Play, Shield, CheckCircle } from "lucide-react";

const StartExam = ({ slug }: { slug: string }) => {
    const router = useRouter();
    const [agree, setAgree] = useState(false);
    const startExamMutation = useMutation({
        mutationFn: async () => {
            const res = await examApi.startExam(slug);
            return res.data.data;
        },
        onSuccess: () => {
            router.push("/exams/" + slug + "/doing");
        },
        onError: notificationErrorApi,
    });
    return (
        <>
            {startExamMutation.isPending && <Loading />}
            <div className="rounded-xl border border-gray-100 bg-white p-6 shadow-sm">
                <div className="mb-4">
                    <h3 className="mb-2 text-lg font-semibold text-gray-900">Chuẩn bị làm bài thi</h3>
                    <p className="text-sm text-gray-600">
                        Vui lòng đọc kỹ các điều khoản và xác nhận trước khi bắt đầu làm bài.
                    </p>
                </div>

                {/* Terms and Conditions */}
                <div className="mb-6">
                    <label className="hover:border-primary/30 flex cursor-pointer items-start gap-3 rounded-lg border border-gray-200 p-4 transition-colors">
                        <Checkbox
                            checked={agree}
                            onCheckedChange={(v) => setAgree(v === true)}
                            className="data-[state=checked]:bg-primary data-[state=checked]:border-primary mt-0.5"
                        />
                        <div className="flex-1">
                            <span className="text-sm leading-relaxed text-gray-700">
                                Tôi xác nhận đã đọc và đồng ý với{" "}
                                <a className="text-primary font-medium hover:underline" href="#">
                                    Điều khoản sử dụng
                                </a>
                                ,{" "}
                                <a className="text-primary font-medium hover:underline" href="#">
                                    Quy định phòng thi
                                </a>
                                , và cam kết <strong className="text-gray-900">không gian lận</strong> trong quá trình
                                làm bài.
                            </span>
                        </div>
                    </label>

                    <div className="mt-3 flex items-start gap-2 text-xs text-gray-500">
                        <Shield className="text-primary mt-0.5 h-3 w-3 flex-shrink-0" />
                        <span>
                            Lượt làm đầu tiên được tính xếp hạng. Hãy chuẩn bị kết nối ổn định và môi trường yên tĩnh.
                        </span>
                    </div>
                </div>

                {/* Start Button */}
                <div className="flex justify-center">
                    <button
                        onClick={() => {
                            if (agree) {
                                startExamMutation.mutate();
                            }
                        }}
                        disabled={!agree}
                        className={`flex h-14 items-center justify-center gap-3 rounded-full px-8 font-semibold text-white shadow-lg transition-all duration-200 ${
                            agree
                                ? "bg-primary hover:bg-primary/90 transform cursor-pointer hover:scale-105 hover:shadow-xl"
                                : "cursor-not-allowed bg-gray-300"
                        }`}
                    >
                        <Play className="h-5 w-5" />
                        <span className="text-lg">Bắt đầu làm bài</span>
                        {agree && <CheckCircle className="h-5 w-5" />}
                    </button>
                </div>

                {/* Additional Info */}
                {agree && (
                    <div className="mt-4 text-center">
                        <div className="inline-flex items-center gap-2 rounded-full bg-green-50 px-3 py-1 text-xs text-green-700">
                            <CheckCircle className="h-3 w-3" />
                            <span>Sẵn sàng vào phòng thi</span>
                        </div>
                    </div>
                )}
            </div>
        </>
    );
};

export default StartExam;
