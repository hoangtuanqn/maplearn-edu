import React from "react";
import { gradeLevelsMock } from "~/mockdata/gradeLevels";
import { ShowPasswordPaper } from "./ShowPasswordPaper";
import { AlertCircle, Clock, MapPin, Settings, Shield, Target, Trophy, Users } from "lucide-react";
import { Badge } from "~/components/ui/badge";
import { QuestionsExamResponse } from "~/schemaValidate/exam.schema";
const InfomationExam = ({ exam }: { exam: QuestionsExamResponse["data"] }) => {
    return (
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
                    {exam.url_qr_code_password && (
                        <div className="flex items-center gap-3">
                            <Target className="h-4 w-4 text-gray-500" />
                            <span className="text-sm text-gray-600">Mật khẩu đề thi:</span>
                            <ShowPasswordPaper imageBase64={exam.url_qr_code_password} />
                        </div>
                    )}
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
                        <Badge variant={exam.anti_cheat_enabled ? "primary" : "outline"}>
                            {exam.anti_cheat_enabled ? "Bật" : "Không có"}
                        </Badge>
                    </div>
                    {exam.anti_cheat_enabled && (
                        <div className="flex items-center gap-3">
                            <AlertCircle className="h-4 w-4 text-gray-500" />
                            <span className="text-sm text-gray-600">Số lần vi phạm tối đa:</span>
                            <span className="font-medium">{exam.max_violation_attempts}</span>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default InfomationExam;
