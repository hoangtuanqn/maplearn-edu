// libs/useNotificationSound.ts
"use client";
import { Howl } from "howler";

export const useNotificationSound = (file = "notification.mp3", loop = false) => {
    const sound = new Howl({
        src: [`/assets/musics/${file}`],
        volume: 1.0,
        loop,
    });

    const playSound = () => {
        sound.play();
    };
    const stopSound = () => {
        sound.stop(); // 🛑 Dừng phát
    };

    return { playSound, stopSound };
};
