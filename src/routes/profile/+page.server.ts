import { API_HOST } from "$lib/@const/dynamic.env";
import type { CommissionPosts } from "$server/src/posts/commissions/commissions.repository";
import type { UserProfile } from "$server/src/user/profile/profile.repository";
import type { RequestEvent } from "@sveltejs/kit";

export async function load(event: RequestEvent) {
	const accessToken = event.cookies.get("access_token");

	// fetch profile data from the server and cache it
	let response: Response;
	response = await fetch(`${API_HOST}/user/profile?access_token=${accessToken}`, {
		method: "GET",
		cache: "default",
		headers: {
			"Content-Type": "application/json"
		}
	});
	const profile: UserProfile = await response.json();

	// get the current artist posts from the server
	response = await fetch(`${API_HOST}/commissions?access_token=${accessToken}`, {
		method: "GET",
		cache: "default",
		headers: {
			"Content-Type": "application/json"
		}
	});
	const posts: CommissionPosts[] = await response.json();

	return {
		accessTokenExist: accessToken ? true : false,
		profile: profile,
		posts: posts,
		url: event.url.pathname
	};
}
