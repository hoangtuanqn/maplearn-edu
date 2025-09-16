"use client";
import Image from "next/image";
import React, { useEffect, useState, useRef } from "react";
import { useNotificationSound } from "~/hooks/useNotificationSound";

const FullScreen = ({ violationCount, onDetected }: { violationCount: number; onDetected: () => void }) => {
    const [isFullScreen, setIsFullScreen] = useState(false);
    const [showWarning, setShowWarning] = useState(false);
    const [tabWarning, setTabWarning] = useState(false);

    const [firstEnter, setFirstEnter] = useState(false);
    const prevFullScreen = useRef(false);
    const leftTabRef = useRef(false); // ✅ để biết có vừa rời tab không
    const { playSound, stopSound } = useNotificationSound("danger.mp3", true);

    const goFullScreen = () => {
        const elem = document.documentElement as any;
        if (elem.requestFullscreen) {
            elem.requestFullscreen();
        } else if (elem.webkitRequestFullscreen) {
            elem.webkitRequestFullscreen();
        } else if (elem.msRequestFullscreen) {
            elem.msRequestFullscreen();
        }
        stopSound();
        setShowWarning(false);
        setTabWarning(false);
    };

    const checkFullScreen = () => {
        const fsElement =
            document.fullscreenElement ||
            (document as any).webkitFullscreenElement ||
            (document as any).msFullscreenElement;

        const isFs = !!fsElement;
        setIsFullScreen(isFs);

        if (!prevFullScreen.current && isFs) {
            setFirstEnter(true);
        }

        if (prevFullScreen.current === true && isFs === false) {
            if (firstEnter) {
                onDetected();
                playSound();
                setShowWarning(true);
            }
        }

        if (isFs) {
            stopSound();
        }

        prevFullScreen.current = isFs;
    };

    const handleVisibilityChange = () => {
        if (document.hidden) {
            // Rời tab
            if (firstEnter) {
                onDetected();

                playSound();
            }
            leftTabRef.current = true;
        } else {
            // Quay lại tab
            stopSound();
            if (leftTabRef.current && firstEnter) {
                setTabWarning(true);
            }
            leftTabRef.current = false;
        }
    };

    useEffect(() => {
        checkFullScreen();

        document.addEventListener("fullscreenchange", checkFullScreen);
        document.addEventListener("webkitfullscreenchange", checkFullScreen);
        document.addEventListener("MSFullscreenChange", checkFullScreen);
        document.addEventListener("visibilitychange", handleVisibilityChange);

        return () => {
            document.removeEventListener("fullscreenchange", checkFullScreen);
            document.removeEventListener("webkitfullscreenchange", checkFullScreen);
            document.removeEventListener("MSFullscreenChange", checkFullScreen);
            document.removeEventListener("visibilitychange", handleVisibilityChange);
            stopSound();
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [firstEnter]);

    // Lúc mới vào → chỉ hiện yêu cầu fullscreen
    if (!firstEnter && !isFullScreen) {
        return (
            <div className="fixed inset-0 z-50 flex h-screen w-screen flex-col items-center justify-center gap-2 bg-[#155e94] text-center text-base font-bold text-white">
                <div>Bạn phải vào chế độ toàn màn hình (Full Screen) mới làm được bài thi.</div>
                <button
                    onClick={goFullScreen}
                    className="text-primary mt-7 cursor-pointer rounded-md bg-white px-6 py-2 hover:bg-slate-200"
                >
                    VÀO CHẾ ĐỘ FULL SCREEN
                </button>
            </div>
        );
    }

    // Cảnh báo thoát fullscreen
    if (showWarning || tabWarning) {
        return (
            <div className="fixed inset-0 z-50 flex h-screen w-screen flex-col items-center justify-center gap-2 bg-yellow-400/95 text-center text-base font-bold text-white">
                <Image src="/assets/icons/warning.webp" alt="Warning" width={200} height={200} className="mb-5" />
                {showWarning ? (
                    <>
                        <div className="text-xl text-red-500">
                            Bạn đã thoát chế độ Full Screen! Hành vi này được cho là gian lận trong kỳ thi! (Tổng vi
                            phạm: {violationCount})
                        </div>
                        <button
                            onClick={goFullScreen}
                            className="text-primary mt-7 cursor-pointer rounded-md bg-white px-6 py-2 hover:bg-slate-200"
                        >
                            VÀO CHẾ ĐỘ FULL SCREEN
                        </button>
                    </>
                ) : (
                    <>
                        <div className="text-xl text-red-500">
                            Bạn vừa di chuyển sang tab khác! Hành vi này được cho là gian lận trong kỳ thi! (Tổng vi
                            phạm: {violationCount})
                        </div>
                        <button
                            onClick={() => setTabWarning(false)}
                            className="mt-7 cursor-pointer rounded-md bg-white px-6 py-2 text-black hover:bg-slate-200"
                        >
                            ĐÓNG CẢNH BÁO
                        </button>
                    </>
                )}
            </div>
        );
    }
};

export default FullScreen;
