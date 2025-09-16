export enum ActionActivity {
    START_EXAM = "start_exam",
    SUBMIT_EXAM = "submit_exam",
    CREATE_INVOICE = "create_invoice",
    LOGIN = "login",
    CHANGE_PASSWORD = "change_password",
    IMPORT = "import",
}

export const ActionActivityLabel: Record<ActionActivity, string> = {
    [ActionActivity.START_EXAM]: "Bắt đầu bài kiểm tra",
    [ActionActivity.SUBMIT_EXAM]: "Nộp bài kiểm tra",
    [ActionActivity.CREATE_INVOICE]: "Tạo hóa đơn",
    [ActionActivity.LOGIN]: "Đăng nhập",
    [ActionActivity.CHANGE_PASSWORD]: "Đặt lại mật khẩu",
    [ActionActivity.IMPORT]: "Nhập dữ liệu",
};
