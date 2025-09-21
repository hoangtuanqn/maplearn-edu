"use client";

import React from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "~/components/ui/dialog";

import { Play } from "lucide-react";
import VideoPlayer from "~/app/(student)/_components/VideoPlayer";
import { Button } from "~/components/ui/button";

const TryLearning = ({ title, video }: { title: string; video: string }) => {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="outline" size="sm" className="h-8 px-3 text-xs">
                    <Play className="mr-1 h-3 w-3" />
                    Học thử
                </Button>
            </DialogTrigger>
            <DialogContent className="bg-white sm:max-w-[1000px]">
                <DialogHeader>
                    <DialogTitle>{title}</DialogTitle>
                </DialogHeader>
                <VideoPlayer src={video} />
            </DialogContent>
        </Dialog>
    );
};

export default TryLearning;
