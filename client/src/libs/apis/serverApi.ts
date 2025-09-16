import axios from "axios";
import { APP } from "~/config/env";

const serverApi = axios.create({
    baseURL: APP.APP_URL,
    withCredentials: true,
});

export default serverApi;
