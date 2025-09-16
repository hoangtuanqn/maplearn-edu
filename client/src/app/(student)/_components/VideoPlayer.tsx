"use client";
import { useEffect, useMemo, useRef } from "react";
import "plyr/dist/plyr.css";

type Props = {
    src: string;
    type?: "video/mp4" | "youtube";
    poster?: string;
    ratio?: string;
    /** Thời gian lấy từ DB (giây) */
    defaultTime?: number;
    /** Callback lưu DB */
    onTimeUpdate?: (time: number) => void;
    /** Callback khi hoàn thành video */
    onCompleted?: () => void;
    /** Khoảng thời gian (giây) để throttle timeupdate, mặc định 5s */
    timeUpdateIntervalSec?: number;
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
}: Props) => {
    const elementRef = useRef<HTMLVideoElement | HTMLDivElement | null>(null);
    const playerRef = useRef<any>(null);
    const callbacksRef = useRef<{ onTimeUpdate?: Props["onTimeUpdate"]; onCompleted?: Props["onCompleted"] }>({});
    const lastPersistedRef = useRef(0); // lần cuối đã gửi timeupdate
    const appliedDefaultTimeRef = useRef<number | null>(null);

    // luôn giữ bản cập nhật mới nhất của callback mà không làm đổi deps
    callbacksRef.current.onTimeUpdate = onTimeUpdate;
    callbacksRef.current.onCompleted = onCompleted;

    // options của Plyr — ổn định để không gây re-init
    const plyrOptions = useMemo(
        () => ({
            ratio,
            keyboard: { focused: true, global: true },
        }),
        [ratio],
    );

    // helper: tạo cấu trúc source cho Plyr
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

    // Khởi tạo Plyr 1 lần
    useEffect(() => {
        let isMounted = true;

        (async () => {
            const { default: Plyr } = await import("plyr");
            if (!isMounted || !elementRef.current) return;

            // Lưu ý: với YouTube, Plyr hoạt động trên <div data-plyr-provider="youtube">…
            playerRef.current = new Plyr(elementRef.current as any, plyrOptions);

            const player = playerRef.current;

            // ready: set defaultTime lần đầu
            player.once("ready", () => {
                if (defaultTime > 0) {
                    try {
                        player.currentTime = defaultTime;
                        appliedDefaultTimeRef.current = defaultTime;
                    } catch {
                        // ignore seek errors
                    }
                }
            });

            // timeupdate: throttle theo timeUpdateIntervalSec
            const onTimeUpdateHandler = () => {
                const now = player.currentTime as number;
                const last = lastPersistedRef.current;
                if (now - last >= timeUpdateIntervalSec) {
                    lastPersistedRef.current = Math.floor(now);
                    callbacksRef.current.onTimeUpdate?.(Math.floor(now));
                }
            };
            player.on("timeupdate", onTimeUpdateHandler);

            // ended
            const onEndedHandler = () => {
                // đảm bảo lưu 100% tiến độ
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
        // chỉ init 1 lần; đừng để callbacks hay defaultTime vào deps
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [plyrOptions]);

    // Cập nhật nguồn khi src/type/poster đổi — không destroy/init lại
    useEffect(() => {
        const player = playerRef.current;
        if (!player) return;

        const newSource = buildSource();

        try {
            // reset mốc throttle khi đổi nguồn
            lastPersistedRef.current = 0;
            appliedDefaultTimeRef.current = null;

            player.source = newSource;
        } catch {
            // fallback: nếu source set lỗi, destroy & bỏ qua (rất hiếm)
            player.destroy?.();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [src, type, poster]);

    // Áp dụng defaultTime khi prop thay đổi (vd: user resume ở nơi khác)
    useEffect(() => {
        const player = playerRef.current;
        if (!player) return;

        // chỉ seek nếu khác với lần đã áp dụng
        if (typeof defaultTime === "number" && defaultTime > 0 && defaultTime !== appliedDefaultTimeRef.current) {
            try {
                // nếu video chưa ready hoàn toàn, Plyr vẫn xếp lịch seek được
                player.currentTime = defaultTime;
                appliedDefaultTimeRef.current = defaultTime;
            } catch {
                // ignore
            }
        }
    }, [defaultTime]);

    return (
        <div className="h-full w-full">
            {type === "youtube" ? (
                // Plyr cho YouTube hoạt động trên <div data-plyr-provider="youtube" ... />
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
