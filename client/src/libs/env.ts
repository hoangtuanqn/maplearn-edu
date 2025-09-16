export const getEnv = (key: string, defaultValue?: string) => {
    return process.env[`NEXT_PUBLIC_${key}`] ?? defaultValue ?? "";
};
export const getEnvServer = (key: string, defaultValue?: string) => {
    return process.env[`${key}`] ?? defaultValue ?? "";
};
