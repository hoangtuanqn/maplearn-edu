import { useEffect } from "react";

/**
 * Hiển thị cảnh báo khi tắt tab nếu dữ liệu chưa lưu
 * @param shouldWarn true nếu muốn cảnh báo
 */
export function useUnsavedChangesWarning(shouldWarn: boolean) {
    useEffect(() => {
        const handleBeforeUnload = (event: BeforeUnloadEvent) => {
            if (shouldWarn) {
                event.preventDefault();
                event.returnValue = ""; // Chrome yêu cầu returnValue
            }
        };

        window.addEventListener("beforeunload", handleBeforeUnload);
        return () => {
            window.removeEventListener("beforeunload", handleBeforeUnload);
        };
    }, [shouldWarn]);
}
