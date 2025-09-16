import React from "react";
import { Metadata } from "next";
import teacherApi from "~/apiRequest/teachers";
import Link from "next/link";
import Image from "next/image";
import { getFullName } from "~/libs/hepler";

export const metadata: Metadata = {
    title: "Tất cả các giáo viên",
};

const ProfilePage = async () => {
    const res = await teacherApi.getTeachers();

    return (
        <div className="min-h-screen rounded-xl bg-white p-8">
            <h1 className="text-primary text-base font-bold uppercase">Tất cả giáo viên</h1>
            <div className="mt-6 grid grid-cols-7 gap-5 gap-y-8">
                {res?.map((teacher) => (
                    <Link
                        key={teacher.id}
                        href={`/teachers/${teacher.id}`}
                        className="text-secondary-typo block h-full w-full rounded-xl"
                    >
                        <Image
                            width={184}
                            height={184}
                            src={teacher.avatar ?? ""}
                            alt={teacher.full_name}
                            className="aspect-square w-full rounded-xl object-cover"
                        />

                        <span className="mt-2 line-clamp-2 block text-center font-bold">
                            {getFullName(teacher.gender, teacher.full_name)}
                        </span>

                        {/* <div className="mt-1 flex items-center gap-1 text-xs font-medium">
                            <GraduationCap style={{ fill: "currentColor" }} />
                            <span className="line-clamp-2">Giáo viên môn vật lý THPT</span>
                        </div> */}
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default ProfilePage;
