import type { RequestEvent } from "@sveltejs/kit";

export async function load(event: RequestEvent) {
	const accessToken = event.cookies.get("access_token");

	console.log("load");

	return {
		accessTokenExist: accessToken ? true : false,
		url: event.url.pathname
	};
}
