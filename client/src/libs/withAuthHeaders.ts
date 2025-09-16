import { cookies } from "next/headers";
import serverApi from "./apis/serverApi";

export default async function withAuthHeaders<T>(url: string) {
    const cookie = await cookies();
    return serverApi.get<T>(url, {
        headers: { cookie: cookie.toString() },
    });
}
