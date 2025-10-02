import { Award, BookOpen, Calendar, Target, Trophy, Clock } from "lucide-react";
import DisplayAvatar from "~/app/(student)/_components/DisplayAvatar";
import { formatter } from "~/libs/format";
import type { StudyProgress7DaysSchema } from "~/schemaValidate/admin/student.schema";

const InfoStudentCard = ({
    infoStudent,
    colorScheme = "blue",
}: {
    infoStudent: StudyProgress7DaysSchema;
    colorScheme?: "blue" | "green";
}) => {
    const colors = {
        blue: {
            gradient: "from-blue-400/10 to-blue-500/5",
            border: "border-blue-300/30",
            accent: "text-blue-500",
            badge: "bg-blue-100 text-blue-600 border-blue-200",
            stat: "bg-blue-50 border-blue-100",
            shadow: "shadow-blue-100",
        },
        green: {
            gradient: "from-green-400/10 to-green-500/5",
            border: "border-green-300/30",
            accent: "text-green-500",
            badge: "bg-green-100 text-green-600 border-green-200",
            stat: "bg-green-50 border-green-100",
            shadow: "shadow-green-100",
        },
    };

    const scheme = colors[colorScheme];

    const recentLessonsCompleted = infoStudent.last_7_days?.reduce((sum, d) => sum + d.lessons_completed, 0) ?? 0;

    return (
        <div
            className={`group relative overflow-hidden rounded-xl border ${scheme.border} bg-white ${scheme.shadow} transition-all`}
        >
            <div className={`absolute inset-0 bg-gradient-to-br ${scheme.gradient} opacity-40`} />

            <div className="relative p-5 sm:p-7">
                <div className="mb-5 flex items-start gap-4">
                    <div className="relative">
                        <DisplayAvatar ratio="16" avatar={infoStudent.avatar} fullName={infoStudent.full_name} />
                        <div
                            className={`absolute -right-2 -bottom-2 rounded-full ${scheme.badge} border px-2 py-0.5 text-xs font-semibold shadow-sm`}
                        >
                            #{colorScheme === "blue" ? "1" : "2"}
                        </div>
                    </div>

                    <div className="min-w-0 flex-1">
                        <h3 className="text-foreground mb-1 text-lg leading-tight font-bold sm:text-xl">
                            {infoStudent.full_name}
                        </h3>
                        <p className="text-muted-foreground mb-2 text-xs sm:text-sm">{infoStudent.email}</p>

                        <div className="flex flex-wrap gap-2 text-xs sm:gap-3">
                            <div className="text-muted-foreground flex items-center gap-1.5">
                                <Calendar className="h-3.5 w-3.5" />
                                <span>{formatter.date(infoStudent.enrolled_at)}</span>
                            </div>
                            <div className="text-muted-foreground flex items-center gap-1.5">
                                <Trophy className={`h-3.5 w-3.5 ${scheme.accent}`} />
                                <span>
                                    <span className={`font-semibold ${scheme.accent}`}>{infoStudent.max_streak}</span>{" "}
                                    ngày streak
                                </span>
                            </div>
                            {infoStudent.last_learned_at && (
                                <div className="text-muted-foreground flex items-center gap-1.5">
                                    <Clock className="h-3.5 w-3.5" />
                                    <span>Học gần nhất: {formatter.date(infoStudent.last_learned_at)}</span>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                <div className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-4 sm:gap-3">
                    <div className={`rounded-lg border ${scheme.stat} p-3 shadow-sm transition-all`}>
                        <BookOpen className={`mb-1 h-5 w-5 ${scheme.accent}`} />
                        <p className="text-foreground text-xl leading-tight font-bold">{recentLessonsCompleted}</p>
                        <p className="text-muted-foreground mt-1 text-xs">Bài đã học (7 ngày qua)</p>
                    </div>

                    <div className={`rounded-lg border ${scheme.stat} p-3 shadow-sm transition-all`}>
                        <Target className={`mb-1 h-5 w-5 ${scheme.accent}`} />
                        <p className="text-foreground text-xl leading-tight font-bold">
                            {infoStudent.completion_rate}%
                        </p>
                        <p className="text-muted-foreground mt-1 text-xs">Hoàn thành</p>
                    </div>

                    <div className={`rounded-lg border ${scheme.stat} p-3 shadow-sm transition-all`}>
                        <Award className={`mb-1 h-5 w-5 ${scheme.accent}`} />
                        <p className="text-foreground text-xl leading-tight font-bold">
                            {infoStudent.highest_score ?? "--"}
                        </p>
                        <p className="text-muted-foreground mt-1 text-xs">Điểm cao nhất</p>
                    </div>

                    <div className={`rounded-lg border ${scheme.stat} p-3 shadow-sm transition-all`}>
                        <Clock className={`mb-1 h-5 w-5 ${scheme.accent}`} />
                        <p className="text-foreground text-xl leading-tight font-bold">{infoStudent.total_duration}</p>
                        <p className="text-muted-foreground mt-1 text-xs">Tổng thời gian học</p>
                    </div>
                </div>

                <div className="mt-5">
                    <div className="mb-2 flex items-center justify-between text-xs">
                        <span className="text-muted-foreground">Tiến độ khóa học</span>
                        <span className={`font-semibold ${scheme.accent}`}>{infoStudent.completion_rate}%</span>
                    </div>
                    <div className="h-2 overflow-hidden rounded-full bg-gray-100">
                        <div
                            className={`h-full rounded-full bg-gradient-to-r ${scheme.gradient.replace("/10", "").replace("/5", "")} transition-all duration-500`}
                            style={{ width: `${infoStudent.completion_rate}%` }}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default InfoStudentCard;
