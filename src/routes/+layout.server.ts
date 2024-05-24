import type { Session } from "@supabase/supabase-js";
import { fail } from "@sveltejs/kit";
import type { LayoutServerLoad } from "./$types";

export const load: LayoutServerLoad = async ({
	url,
	locals: { supabase, user, safeGetSession }
}) => {
	let session: Session | null = null;
	({ session } = await safeGetSession());

	// get the user's data from here
	let payload: AppUser | null = null;

	// get the user's account information (if session exists)
	if (session) {
		// initialize payload
		payload = {
			account: {
				uid: "",
				email: "",
				name: ""
			},
			profile: {}
		};

		let { data, error } = await supabase.from("users").select().eq("id", user.id).limit(1);
		if (!error) {
			if (data && data.length > 0) {
				payload.account = {
					uid: session.user.id,
					email: session.user.email ?? "",
					provider: session.user.app_metadata.provider ?? null,
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
		// get the user's profile information
		({ data, error } = await supabase
			.from("profile")
			.select("*, users(id)")
			.eq("users.id", user.id));
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
	}

	return {
		url: url.pathname,
		session: session as Session,
		payload
	};
};
