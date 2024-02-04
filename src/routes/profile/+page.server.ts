import { API_HOST } from "$lib/@const/dynamic.env";
import type { UserProfile } from "$server/src/user/profile/profile.repository";
import type { RequestEvent } from "@sveltejs/kit";

export async function load(event: RequestEvent) {
	const accessToken = event.cookies.get("access_token");

	// fetch profile data from the server and cache it for 10 minutes
	const response = await fetch(`${API_HOST}/user/profile`, {
		method: "POST",
		cache: "default",
		headers: {
			"Content-Type": "application/json"
		},
		body: JSON.stringify({
			access_token: accessToken
		})
	});
	const profile: UserProfile = await response.json();

	return {
		accessTokenExist: accessToken ? true : false,
		profile: profile,
		url: event.url.pathname
	};
}
