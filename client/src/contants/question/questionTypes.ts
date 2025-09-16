export enum QuestionType {
    SINGLE_CHOICE = "SINGLE_CHOICE",
    MULTIPLE_CHOICE = "MULTIPLE_CHOICE",
    DRAG_DROP = "DRAG_DROP",
    TRUE_FALSE = "TRUE_FALSE",
    NUMERIC_INPUT = "NUMERIC_INPUT",
}

export const QuestionTypeLabel: Record<QuestionType, string> = {
    [QuestionType.SINGLE_CHOICE]: "Chọn đáp án đúng",
    [QuestionType.MULTIPLE_CHOICE]: "Chọn nhiều đáp án đúng",
    [QuestionType.DRAG_DROP]: "Kéo thả",
    [QuestionType.TRUE_FALSE]: "Đúng / Sai",
    [QuestionType.NUMERIC_INPUT]: "Nhập số",
};
