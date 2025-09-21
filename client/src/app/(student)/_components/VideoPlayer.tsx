"use client";
import { useEffect, useMemo, useRef } from "react";
import "plyr/dist/plyr.css";

type Props = {
    src: string;
    type?: "video/mp4" | "youtube";
    poster?: string;
    ratio?: string;
    defaultTime?: number;
    onTimeUpdate?: (time: number) => void;
    onCompleted?: () => void;
    timeUpdateIntervalSec?: number;
    /** Bật/tắt pause khi rời tab/cửa sổ */
    pauseOnTabLeave?: boolean; // NEW
};

const VideoPlayer = ({
    src,
    type = "video/mp4",
    poster,
    ratio,
    defaultTime = 0,
    onTimeUpdate,
    onCompleted,
    timeUpdateIntervalSec = 10,
    pauseOnTabLeave = true, // default bật
}: Props) => {
    const elementRef = useRef<HTMLVideoElement | HTMLDivElement | null>(null);
    const playerRef = useRef<any>(null);
    const callbacksRef = useRef<{
        onTimeUpdate?: Props["onTimeUpdate"];
        onCompleted?: Props["onCompleted"];
    }>({});
    const lastPersistedRef = useRef(0);
    const appliedDefaultTimeRef = useRef<number | null>(null);

    callbacksRef.current.onTimeUpdate = onTimeUpdate;
    callbacksRef.current.onCompleted = onCompleted;

    const plyrOptions = useMemo(
        () => ({
            ratio,
            keyboard: { focused: true, global: true },
        }),
        [ratio],
    );

    const buildSource = () => {
        if (type === "youtube") {
            return {
                type: "video",
                sources: [{ src, provider: "youtube" as const }],
                poster,
            };
        }
        return {
            type: "video",
            sources: [{ src, type: "video/mp4" }],
            poster,
        };
    };

    // init Plyr
    useEffect(() => {
        let isMounted = true;
        (async () => {
            const { default: Plyr } = await import("plyr");
            if (!isMounted || !elementRef.current) return;

            playerRef.current = new Plyr(elementRef.current as any, plyrOptions);
            const player = playerRef.current;

            player.once("ready", () => {
                if (defaultTime > 0) {
                    try {
                        player.currentTime = defaultTime;
                        appliedDefaultTimeRef.current = defaultTime;
                    } catch {}
                }
            });

            const onTimeUpdateHandler = () => {
                const now = player.currentTime as number;
                const last = lastPersistedRef.current;
                if (now - last >= timeUpdateIntervalSec) {
                    lastPersistedRef.current = Math.floor(now);
                    callbacksRef.current.onTimeUpdate?.(Math.floor(now));
                }
            };
            player.on("timeupdate", onTimeUpdateHandler);

            const onEndedHandler = () => {
                callbacksRef.current.onTimeUpdate?.(Math.floor(player.duration || 0));
                callbacksRef.current.onCompleted?.();
            };
            player.on("ended", onEndedHandler);
        })();

        return () => {
            isMounted = false;
            if (playerRef.current) {
                playerRef.current.destroy();
                playerRef.current = null;
            }
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [plyrOptions]);

    // update source when props change
    useEffect(() => {
        const player = playerRef.current;
        if (!player) return;
        try {
            lastPersistedRef.current = 0;
            appliedDefaultTimeRef.current = null;
            player.source = buildSource();
        } catch {
            player.destroy?.();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [src, type, poster]);

    // apply defaultTime when prop changes
    useEffect(() => {
        const player = playerRef.current;
        if (!player) return;
        if (typeof defaultTime === "number" && defaultTime > 0 && defaultTime !== appliedDefaultTimeRef.current) {
            try {
                player.currentTime = defaultTime;
                appliedDefaultTimeRef.current = defaultTime;
            } catch {}
        }
    }, [defaultTime]);

    // 🔒 Chỉ dừng khi rời tab/cửa sổ (mất focus)
    useEffect(() => {
        if (!pauseOnTabLeave) return;

        const pauseIfPlaying = () => {
            const p = playerRef.current;
            if (!p) return;
            try {
                if (!p.paused) p.pause();
            } catch {}
        };

        const onVisibility = () => {
            if (document.hidden) pauseIfPlaying();
        };
        const onWindowBlur = () => {
            // rời cửa sổ hiện tại (chuyển app/OS, chuyển tab)
            pauseIfPlaying();
        };
        // một số browser phát event khi đóng/đổi page
        const onPageHide = () => pauseIfPlaying();

        document.addEventListener("visibilitychange", onVisibility);
        window.addEventListener("blur", onWindowBlur);
        window.addEventListener("pagehide", onPageHide);

        return () => {
            document.removeEventListener("visibilitychange", onVisibility);
            window.removeEventListener("blur", onWindowBlur);
            window.removeEventListener("pagehide", onPageHide);
        };
    }, [pauseOnTabLeave]);

    return (
        <div className="h-full w-full">
            {type === "youtube" ? (
                <div
                    ref={elementRef as any}
                    className="plyr-react plyr"
                    data-plyr-provider="youtube"
                    data-plyr-embed-id={src}
                />
            ) : (
                <video ref={elementRef as any} className="plyr-react plyr" playsInline controls poster={poster}>
                    <source src={src} type="video/mp4" />
                </video>
            )}
        </div>
    );
};

export default VideoPlayer;
