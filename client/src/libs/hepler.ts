export const getGender = (gender: "male" | "female" | "other") => {
    switch (gender) {
        case "male":
            return "Nam";
        case "female":
            return "Nữ";
        case "other":
            return "Chưa xác định";
    }
};
export const getCharacterName = (name: string | null | undefined) => {
    if (!name) return null;
    const arrName = name.split(" ");
    return arrName[arrName.length - 1].substring(0, 1);
};

// Decode base64 url safe
export function base64UrlDecode(data: string): string {
    // Bổ sung dấu '=' nếu thiếu
    const padLength = data.length % 4;
    if (padLength) {
        data += "=".repeat(4 - padLength);
    }
    // Chuyển ký tự URL-safe về chuẩn base64
    data = data.replace(/-/g, "+").replace(/_/g, "/");
    // Giải mã base64 về chuỗi
    const decoded = atob(data);

    return decoded;
}
export function getFormattedVietnameseDate(): string {
    const now: Date = new Date();

    const options: Intl.DateTimeFormatOptions = {
        weekday: "long",
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
    };

    // Lấy chuỗi ngày theo định dạng tiếng Việt
    let formatted: string = now.toLocaleDateString("vi-VN", options);

    // Viết hoa chữ cái đầu (đề phòng trình duyệt trả về chữ thường)
    formatted = formatted.charAt(0).toUpperCase() + formatted.slice(1);

    // Thay dấu phẩy bằng dấu gạch ngang
    formatted = formatted.replace(",", " -");

    return formatted;
}
// Hàm biến đổi đối tượng thành chuỗi query string . VD: filter[key]=value&filter[key2]=value2
export const buildLaravelFilterQuery = (filters: Record<string, string | number | boolean | null | undefined>) => {
    const queryParams = Object.entries(filters)
        .filter(([_, value]) => value !== null && value !== undefined && value !== "")
        .map(([key, value]) => `filter[${encodeURIComponent(key)}]=${encodeURIComponent(String(value))}`)
        .join("&");

    return queryParams;
};

export const getFullName = (gender: string, fullName: string) => {
    if (gender === "male") {
        return `Thầy ${fullName}`;
    } else {
        return `Cô ${fullName}`;
    }
};
export const exitFullscreen = () => {
    if (typeof document === "undefined") {
        return;
    }
    if (document.fullscreenElement) {
        if (document.exitFullscreen) {
            document.exitFullscreen();
        } else if ((document as any).webkitExitFullscreen) {
            (document as any).webkitExitFullscreen(); // Safari
        } else if ((document as any).mozCancelFullScreen) {
            (document as any).mozCancelFullScreen(); // Firefox cũ
        } else if ((document as any).msExitFullscreen) {
            (document as any).msExitFullscreen(); // IE/Edge cũ
        }
    }
};
export const generateStrongPassword = (length = 12) => {
    const chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+[]{}<>?";
    let password = "";
    for (let i = 0; i < length; i++) {
        password += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return password;
};
