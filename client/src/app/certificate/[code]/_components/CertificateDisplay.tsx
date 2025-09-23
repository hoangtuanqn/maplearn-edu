"use client";
import React, { useRef } from "react";
import { Download } from "lucide-react";
import { ShareButton } from "~/app/(student)/_components/Shared/ShareButton";
import { Button } from "~/components/ui/button";
import Certificate from "./Certificate";
import { saveAs } from "file-saver";
import * as htmlToImage from "html-to-image";
import { APP } from "~/config/env";

const CertificateDisplay = ({
    fullName,
    dateCompleted,
    courseTitle,
    code,
}: {
    fullName: string;
    dateCompleted: string;
    courseTitle: string;
    code: string;
}) => {
    const certRef = useRef<HTMLDivElement | null>(null);
    const downloadPNG = async () => {
        if (!certRef.current) return;
        const dataUrl = await htmlToImage.toPng(certRef.current, {
            cacheBust: true,
            pixelRatio: 2,
        });
        saveAs(dataUrl, "certificate.png");
    };
    return (
        <div className="lg:col-span-2">
            <div className="mb-6 flex items-center justify-end">
                <div className="flex gap-3">
                    <Button variant={"outline"} onClick={downloadPNG}>
                        <Download className="h-4 w-4" />
                        Tải xuống
                    </Button>
                    <ShareButton />
                </div>
            </div>
            {/* Certificate Component */}
            <div className="flex">
                <div className="h-fit w-full transform">
                    <Certificate
                        fullName={fullName}
                        eventName={courseTitle}
                        eventDate={dateCompleted}
                        verifyUrl={`${APP.APP_URL}/certificate/${code}`}
                        ref={certRef}
                    />
                </div>
            </div>
        </div>
    );
};

export default CertificateDisplay;
