import Image from "next/image";

interface Student {
    rank: number;
    name: string;
    avatar?: string;
}

const TopStudents = ({ className = "" }: { className?: string }) => {
    const students: Student[] = [
        {
            rank: 1,
            name: "Phạm Hoàng Tuấn",
            avatar: "https://res.cloudinary.com/dbu1zfbhv/image/upload/v1755032358/avatar/urwizwtbosve0rg7miq2.jpg",
        },
        { rank: 2, name: "Trần Thị Bích" },
        { rank: 3, name: "Lê Hoàng Minh" },
        { rank: 4, name: "Phạm Thu Hương" },
        { rank: 5, name: "Vũ Đức Thành" },
    ];

    const getRankStyles = (rank: number) => {
        if (rank === 1) {
            return {
                container: "h-8.5 w-8.5 bg-gradient-to-b from-[#FFEDB7] to-[#FF9800] p-0.5 shadow-md",
                inner: "bg-gradient-to-b from-[#F32114] to-[#880404] text-[1.25rem]",
            };
        }
        if (rank <= 3) {
            return {
                container: "h-7.5 w-7.5 bg-gradient-to-b from-[#FFFFFF] to-[#B4B5B7] p-0.5 shadow",
                inner: "bg-gradient-to-b from-[#8CB5E9] to-[#0034DF]",
            };
        }
        return {
            container: "h-6.5 w-6.5 bg-gradient-to-b from-[#D2F1D5] to-[#A5D04B] p-0.5",
            inner: "bg-gradient-to-b from-[#A3DF7E] to-[#027940]",
        };
    };

    const renderAvatar = (student: Student) => {
        if (student.avatar) {
            return (
                <div className="relative size-10 shrink-0 rounded-full bg-gradient-to-b from-[#FFF8E1] to-[#FFD180] p-[3px] shadow-lg">
                    <Image
                        alt={student.name}
                        className="h-full w-full shrink-0 rounded-full object-cover"
                        width={32.5}
                        height={32.5}
                        src={student.avatar}
                    />
                </div>
            );
        }
        return (
            <div className="relative size-10 shrink-0 rounded-full bg-gradient-to-b from-[#f3f7fa] to-[#e0e7ef] p-[3px] shadow">
                <div className="t1-flex-center h-full w-full shrink-0 rounded-full bg-gradient-to-b from-[#dadada] to-[#bebebe] text-base font-medium text-white">
                    {student.name.charAt(0).toUpperCase()}
                </div>
            </div>
        );
    };

    return (
        <div
            className={`rounded-xl border border-[#90caf9] bg-gradient-to-br from-[#e3f0ff] via-[#f1f8ff] to-[#e0f7fa] pt-4 shadow-sm ${className}`}
        >
            <h2 className="text-primary mb-2 px-4 text-base font-bold">Top 5 học sinh xuất sắc</h2>
            <div className="mt-2 [&>div]:py-2 [&>div]:pr-2 [&>div]:pl-5">
                {students.map((student) => {
                    const rankStyles = getRankStyles(student.rank);
                    return (
                        <div key={student.rank} className="flex items-center gap-2.5 even:bg-[#f5faff]">
                            <div className="t1-flex-center w-7.5 shrink-0">
                                <div className={`shrink-0 rounded-full ${rankStyles.container}`}>
                                    <div
                                        className={`t1-flex-center h-full w-full rounded-full ${rankStyles.inner} text-base font-medium text-white`}
                                    >
                                        {student.rank}
                                    </div>
                                </div>
                            </div>
                            {renderAvatar(student)}
                            <div className="grow">
                                <div
                                    className={`mb-1 line-clamp-1 font-${student.rank === 1 ? "bold t1-gradient-text" : "medium text-[#26292D]"}`}
                                >
                                    {student.name}
                                </div>
                            </div>
                        </div>
                    );
                })}
                <div className="text-primary-light mt-3 text-center">Bạn chưa có xếp hạng</div>
            </div>
        </div>
    );
};

export default TopStudents;
