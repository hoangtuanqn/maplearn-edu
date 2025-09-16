import { useEffect, useState } from "react";

const useCountDown = (initialTime: number) => {
    const [timeLeft, setTimeLeft] = useState(initialTime);

    // Đếm ngược thời gian
    useEffect(() => {
        if (!timeLeft) return;
        const timer = setInterval(() => {
            setTimeLeft((prev) => Math.max(prev - 1, 0));
        }, 1000);
        return () => clearInterval(timer);
    }, [timeLeft]);

    return { timeLeft, setTimeLeft };
};
export default useCountDown;
