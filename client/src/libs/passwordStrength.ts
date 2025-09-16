// Check độ mạnh mật khẩu
import zxcvbn from "zxcvbn";
import { PasswordStrengthType } from "~/app/(student)/(common)/auth/auth.schema";
export function getPasswordStrength(password: string): PasswordStrengthType {
    const result = zxcvbn(password);
    const labels = ["Rất yếu", "Yếu", "Trung bình", "Khá", "Mạnh"];

    return {
        score: result.score,
        strengthPercent: result.score * 25,
        label: labels[result.score],
        suggestions: result.feedback.suggestions,
    };
}
