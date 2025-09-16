import { getEnvServer } from "~/libs/env";
import { SYSTEM_PROMPT } from "./systemPrompt";

// Tạo nhanh token: https://aistudio.google.com/apikey
const token = getEnvServer("API_GEMINI");
const model = getEnvServer("MODEL_AI", "gemini-2.0-flash"); // Các model: https://ai.google.dev/gemini-api/docs/models?hl=vi
export const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${token}`;

// Training kiến thức cho AI
export const trainingAI = {
    systemInstruction: {
        role: "system",
        parts: [
            {
                text: SYSTEM_PROMPT,
            },
        ],
    },
};
