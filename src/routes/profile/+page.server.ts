import type { RequestEvent } from "@sveltejs/kit";

export async function load(event: RequestEvent) {
	const accessToken = event.cookies.get("access_token");

	return {
		accessTokenExist: accessToken ? true : false,
		url: event.url.pathname
	};
}
