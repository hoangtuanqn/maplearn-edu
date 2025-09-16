// @ts-expect-error: no types for @mycv/f8-notification
import { notify } from "@mycv/f8-notification";
import { APP_CONFIG } from "~/config/app.config";
export const notificate = (content: string) => {
    // Thông báo dạng push notification
    notify(APP_CONFIG.APP_NAME, { body: content });
};
