import type { RequestEvent } from "@sveltejs/kit";

export async function load(event: RequestEvent) {    
    return { // return user cookies
        accessToken: event.cookies.get("access_token"),
        signInText: event.url.pathname.split("/")[event.url.pathname.split("/").length -1] === "signin" ? "Sign Up" : "Sign In",
        url: event.url.pathname
    }
}