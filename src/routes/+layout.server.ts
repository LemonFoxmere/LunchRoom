import type { RequestEvent } from "@sveltejs/kit";

export async function load(event: RequestEvent) {    
    return { // return user cookies
        // signInText: event.url.pathname.split("/")[event.url.pathname.split("/").length -1] === "signin" ? "Sign Up" : "Sign In",
        accessToken: event.cookies.get("access_token"),
        url: event.url.pathname
    }
}