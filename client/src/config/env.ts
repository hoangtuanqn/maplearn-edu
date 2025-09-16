import { getEnv, getEnvServer } from "~/libs/env";

const API_VERSION_PATH = "/api/v1";
const URL_API = getEnv("API_URL", "http://localhost:8000");

export const APP = {
    API_VERSION_PATH,
    API_ROOT: URL_API,
    API_URL: URL_API + API_VERSION_PATH,
    APP_URL: getEnvServer("APP_URL", "http://localhost:3000"), // url front end
};
export const ENVIRONMENT = {
    isDEV: getEnv("APP_ENV", "production") === "development",
    isProd: getEnv("APP_ENV", "production") === "production",
};
