export const getLocalStorage = (key: string): string | null => {
    try {
        return localStorage.getItem(key) ?? "";
    } catch (error) {
        console.log(error);
        return null;
    }
};
export const setLocalStorage = (key: string, value: string) => {
    try {
        localStorage.setItem(key, value);
    } catch (error) {
        console.log(error);
    }
};
export const removeLocalStorage = (key: string) => {
    try {
        localStorage.removeItem(key);
    } catch (error) {
        console.log(error);
    }
};
