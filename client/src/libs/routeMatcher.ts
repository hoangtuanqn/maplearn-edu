import { match } from "path-to-regexp";
export const isActiveRoute = (pathname: string, listRoutePath: string[]) => {
    const cleanPath = pathname.split("?")[0]; // Loại bỏ query string

    return listRoutePath.some((route) => {
        const matcher = match(route, { decode: decodeURIComponent });
        return matcher(cleanPath) !== false;
    });
};

