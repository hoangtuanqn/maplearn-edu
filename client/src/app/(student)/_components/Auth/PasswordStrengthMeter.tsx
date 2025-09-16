"use client";

import { Progress } from "~/components/ui/progress";
import { getPasswordStrength } from "~/libs/passwordStrength";

type PasswordStrengthMeterProps = {
    password: string;
};

export default function PasswordStrengthMeter({ password }: PasswordStrengthMeterProps) {
    if (!password) return null;

    const { strengthPercent, label, suggestions, score } = getPasswordStrength(password);

    // Chọn màu theo độ mạnh mật khẩu
    const progressClass =
        score === 0
            ? "bg-red-100 [&>div]:bg-red-500"
            : score === 1
              ? "bg-orange-100 [&>div]:bg-orange-500"
              : score === 2
                ? "bg-yellow-100 [&>div]:bg-yellow-500"
                : score === 3
                  ? "bg-green-100 [&>div]:bg-green-500"
                  : "bg-emerald-100 [&>div]:bg-emerald-600";

    return (
        <div className="space-y-1 pt-2">
            <Progress value={strengthPercent} className={progressClass} />
            <p className="text-muted-foreground text-sm">Độ mạnh: {label}</p>
            {suggestions.length > 0 && <p className="text-xs text-yellow-600">Gợi ý: {suggestions.join(" ")}</p>}
        </div>
    );
}
