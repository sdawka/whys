import { defineMiddleware } from "astro:middleware";
import { supabase } from "./lib/supabase";
import { escapeHTML } from "astro/runtime/server/escape.js";

// `context` and `next` are automatically typed
export const onRequest = defineMiddleware(async (context, next) => {
    const accessToken = context.cookies.get("sb-access-token");
    const refreshToken = context.cookies.get("sb-refresh-token");
    const isAccessingAuth = context.url.pathname.startsWith("/api/auth");

    try {
        if (!refreshToken || !accessToken) {
            context.locals.isLoggedIn = false;
            if (!isAccessingAuth) {
                return next("/signin");
            } else {
                return next();
            }
        }
        const { data, error } = await supabase.auth.setSession({
            refresh_token: refreshToken.value,
            access_token: accessToken.value,
        });
        if (error || !data.session) {
            context.cookies.delete("sb-access-token", {
                path: "/",
            });
            context.cookies.delete("sb-refresh-token", {
                path: "/",
            });
        } else {
            context.cookies.set("sb-access-token", data.session.access_token);
            context.cookies.set("sb-refresh-token", data.session.refresh_token);
            context.locals.currentUser = data.user;
            context.locals.isLoggedIn = true;
        }
    } catch (error) {
        console.error("Error setting session:", error);
        return next("/signin");
    }
    return next();
});
