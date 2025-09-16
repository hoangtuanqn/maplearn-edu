import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
    baseDirectory: __dirname,
});

const eslintConfig = [
    // Import config từ next
    ...compat.extends("next/core-web-vitals", "next/typescript"),

    // Cấu hình bổ sung
    {
        files: ["**/*.ts", "**/*.tsx"], // Hoặc thêm *.js nếu cần
        rules: {
            "@typescript-eslint/no-unused-vars": [
                "warn",
                {
                    argsIgnorePattern: "^_", // Bỏ qua biến bắt đầu bằng _
                    varsIgnorePattern: "^_", // Bỏ qua biến khai báo bắt đầu bằng _
                },
            ],
            // Off cảnh báo Any
            "@typescript-eslint/no-explicit-any": "off",
            // "@typescript-eslint/no-explicit-any": "off",
        },
    },
];

export default eslintConfig;
