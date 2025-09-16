export interface ChatHistoriesType {
    role: "user" | "model";
    parts: [
        {
            text: string;
        },
    ];
}
