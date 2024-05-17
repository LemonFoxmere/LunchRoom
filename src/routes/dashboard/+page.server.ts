import { redirectLink } from "$route/signin/+page.svelte";
import { fail, redirect } from "@sveltejs/kit";

export const load = async ({ url, locals: { supabase, safeGetSession } }) => {
	const { session, user } = await safeGetSession();

	// sign in if the user is not already signed in
	if (!(session && user)) {
		// set a bounce back link in
		redirectLink.set("/dashboard");
		redirect(303, `/signin`);
	}

	// get the user's data from here
	const payload: AppUser = {
		account: {},
		profile: {}
	};

	// get the user's account information
	let { data, error } = await supabase.from("users").select().eq("id", user.id).limit(1);
	if (!error) {
		if (data && data.length > 0) {
			payload.account = {
				handle: data[0].handle,
				name: data[0].name
			};
		} else {
			console.error("Did not find the user's account details. Perhaps an RLS error?");
		}
	} else {
		console.error(error);
		fail(500);
	}

	({ data, error } = await supabase.from("profile").select("*, users(id)").eq("users.id", user.id));
	if (!error) {
		if (data && data.length > 0) {
			payload.profile = {
				avatar: data[0].avatar,
				banner: data[0].banner,
				bio: data[0].bio
			};
		} else {
			console.error("Did not find the user's profile. Perhaps an RLS error?");
		}
	} else {
		console.error(error);
		fail(500);
	}

	return {
		url: url.href,
		session: session,
		payload
	};
};
