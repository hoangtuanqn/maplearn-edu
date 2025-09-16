import axios from "axios";
import { APP } from "~/config/env";

const publicApi = axios.create({
    baseURL: APP.API_URL,
    withCredentials: true,
});

export default publicApi;
