import { defineMiddleware } from "astro:middleware";

// `context` and `next` are automatically typed
export const onRequest = defineMiddleware((context, next) => {
    const accessToken = context.cookies.get("sb-access-token");
    const refreshToken = context.cookies.get("sb-refresh-token");
    const isAccessingApp = context.url.pathname.startsWith("/api/app");
    const isNotLoggedIn = !accessToken || !refreshToken;
    if (isAccessingApp && isNotLoggedIn) {
        return next("/signin")
    }
    return next();
});