"use client";
import Image from "next/image";
import React from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "~/components/ui/dialog";

import VideoPlayer from "../../../_components/VideoPlayer";
import { Play } from "lucide-react";

const IntroCourse = ({ thumbnail, video }: { thumbnail: string; video: string }) => {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <div className="relative cursor-pointer overflow-hidden rounded-lg">
                    <Image
                        // src="https://mapstudy.sgp1.digitaloceanspaces.com/course/3sddw0g008b0/2k9-xuat-phat-som-mon-tieng-anh---lop-11-1751535827405.png"
                        src={thumbnail}
                        alt="Course Intro"
                        width={400}
                        height={120}
                        quality={100}
                        className="object-cover"
                    />

                    {/* Lớp mờ luôn hiển thị */}
                    <div className="absolute inset-0 z-10 bg-black/40" />

                    {/* Nút play luôn hiển thị */}
                    <div className="absolute inset-0 z-20 flex aspect-square items-center justify-center">
                        <div className="rounded-full bg-[#F6F7F9] p-3 shadow-md">
                            <Play className="size-7 text-gray-600" />
                        </div>
                    </div>
                </div>
            </DialogTrigger>
            <DialogContent className="bg-white sm:max-w-[1000px]">
                <DialogHeader>
                    <DialogTitle>Giới thiệu khóa học</DialogTitle>
                </DialogHeader>
                <VideoPlayer src={video} />
            </DialogContent>
        </Dialog>
    );
};

export default IntroCourse;
