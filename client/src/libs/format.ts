export const formatter = {
    date: (date: Date | string, time: boolean = false) => {
        // time = true: Có hiển thị H:i:s luông không
        const parsedDate = new Date(date);
        if (time) {
            return parsedDate.toLocaleString("vi-VN");
        }
        return parsedDate.toLocaleDateString("vi-VN");
    },
    number: (amount: number) => Intl.NumberFormat("vi-VN").format(amount),
    duration: (seconds: number): string => {
        const d = Math.floor(seconds / (3600 * 24));
        const h = Math.floor((seconds % (3600 * 24)) / 3600);
        const m = Math.floor((seconds % 3600) / 60);
        const s = seconds % 60;

        const parts = [];
        if (d > 0) parts.push(`${d} ngày`);
        if (h > 0) parts.push(`${h}h`);
        if (m > 0) parts.push(`${m}p`);
        if (s > 0 || parts.length === 0) parts.push(`${s}s`);

        return parts.join(":");
    },
    // Chuyển đổi giây sang số giờ
    durationToHours: (seconds: number): string => {
        if (seconds == 0) return "0";
        const hours = Math.floor(seconds / 3600);
        if (hours === 0) return "Dưới 1 giờ";
        if (hours === 1) return "1 giờ";
        return `${hours} giờ`;
    },
    parseDateDMY: (dateStr: string) => {
        const parts = dateStr.split("/");
        const day = parseInt(parts[0], 10);
        const month = parseInt(parts[1], 10) - 1;
        const year = parseInt(parts[2], 10);
        return new Date(year, month, day);
    },
    parseMinutesSeconds: (seconds: number): string => {
        const m = Math.floor(seconds / 60);
        const s = seconds % 60;
        return `${m}:${s.toString().padStart(2, "0")}`;
    },
};

export const formatPhoneNumber = (phone: string | number): string => {
    // Chuyển thành chuỗi và loại bỏ các ký tự không phải số
    const digits = phone.toString().replace(/\D/g, "");

    // Kiểm tra nếu không đủ 10 chữ số thì trả về nguyên bản
    if (digits.length !== 10) return phone.toString();

    // Tách các phần và format
    return `${digits.slice(0, 4)}.${digits.slice(4, 7)}.${digits.slice(7)}`;
};
// Chuyển đổi giây sang phút, giờ, ngày, tháng hợp lý. VD: 30 => 30 giây, 90 => 1 phút 30 giây, 3600 => 1 giờ, 86400 => 1 ngày, 2592000 => 1 tháng
