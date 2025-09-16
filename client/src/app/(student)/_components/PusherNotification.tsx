"use client";
import { useEffect } from "react";
import Pusher from "pusher-js";
import { useRouter } from "next/navigation";
import { useAuth } from "~/hooks/useAuth";
const PusherNotification = () => {
    const { user } = useAuth();
    const router = useRouter();
    useEffect(() => {
        const sound = new Howl({
            src: [`/assets/musics/ting.mp3`],
            volume: 1.0,
        });
        // Kết nối đến Pusher
        const pusher = new Pusher(process.env["NEXT_PUBLIC_PUSHER_APP_KEY"] ?? "", {
            cluster: process.env["NEXT_PUBLIC_PUSHER_APP_CLUSTER"] ?? "",
        });

        // Đăng ký kênh và sự kiện
        const channel = pusher.subscribe(user?.email ?? "null");
        // data: { message: string }
        channel.bind("my-event", () => {
            sound.play();
            router.refresh();
        });

        return () => {
            channel.unbind_all();
            channel.unsubscribe();
        };
    }, [router, user?.email]);
    return null;
};
export default PusherNotification;
