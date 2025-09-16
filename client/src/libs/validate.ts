export const isValidPhone = (phone: string): boolean => {
    // Loại bỏ ký tự không phải số (nếu muốn chấp nhận khoảng trắng, dấu -,...)
    const digits = phone.replace(/\D/g, "");

    // Kiểm tra: bắt đầu bằng 0, tổng cộng 10 chữ số
    return /^0\d{9}$/.test(digits);
};
export const isValidEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
    return emailRegex.test(email);
};
