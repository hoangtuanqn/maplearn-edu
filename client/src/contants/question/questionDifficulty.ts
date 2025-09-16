export enum QuestionDifficulty {
    EASY = "easy",
    NORMAL = "normal",
    HARD = "hard",
    VERY_HARD = "very_hard",
}

export const QuestionDifficultyLabel: Record<QuestionDifficulty, string> = {
    [QuestionDifficulty.EASY]: "Dễ",
    [QuestionDifficulty.NORMAL]: "Trung bình",
    [QuestionDifficulty.HARD]: "Khó",
    [QuestionDifficulty.VERY_HARD]: "Rất khó",
};
