"use client";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import examApi from "~/apiRequest/exam";
import Loading from "~/app/(student)/_components/Loading";
import { Checkbox } from "~/components/ui/checkbox";
import { notificationErrorApi } from "~/libs/apis/http";

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
            <div className="mt-4 flex items-center gap-3 max-lg:flex-col">
                <div className="flex-1">
                    <label className="flex cursor-pointer items-start gap-3 rounded-lg border p-3 text-sm">
                        <Checkbox checked={agree} onCheckedChange={(v) => setAgree(v === true)} className="mt-0.5" />
                        <span className="text-gray-700">
                            Tôi xác nhận đã đọc và đồng ý với
                            <a className="text-primary hover:underline" href="#">
                                {" "}
                                Điều khoản sử dụng
                            </a>
                            ,{" "}
                            <a className="text-primary hover:underline" href="#">
                                Quy định phòng thi
                            </a>
                            , và cam kết <strong>không gian lận</strong> trong quá trình làm bài.
                        </span>
                    </label>
                    <p className="mt-2 text-xs text-gray-500">
                        Lượt làm đầu tiên được tính xếp hạng. Hãy chuẩn bị kết nối ổn định và môi trường yên tĩnh.
                    </p>
                </div>

                <div
                    onClick={() => {
                        if (agree) {
                            startExamMutation.mutate();
                        }
                    }}
                    className={`t1-flex-center h-32 w-32 rounded-full text-center text-2xl font-medium text-white shadow-sm ${
                        agree
                            ? "bg-primary hover:bg-primary-light cursor-pointer duration-150 ease-out"
                            : "bg-primary/50 cursor-not-allowed"
                    }`}
                >
                    <span>Bắt đầu</span>
                </div>
            </div>
        </>
    );
};

export default StartExam;
