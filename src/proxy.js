import { NextResponse } from "next/server";

export function proxy(request) {
    const sessionToken = request.cookies.get("better-auth.session_token") ||
        request.cookies.get("__Secure-better-auth.session_token");

    if (!sessionToken) {
        const loginUrl = new URL("/login", request.url);
        loginUrl.searchParams.set("callbackURL", request.nextUrl.pathname);
        return NextResponse.redirect(loginUrl);
    }

    return NextResponse.next();
}

export const config = {
    matcher: ["/add-products", "/manage-products", "/items/:id"],
};
