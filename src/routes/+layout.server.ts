import { type ServerLoadEvent } from "@sveltejs/kit";
import type { LayoutServerLoad } from "./$types";

export const load: LayoutServerLoad = async (event: ServerLoadEvent) => {
	const { supabase } = event.locals;

	let session: { session: any; user: any } | null = await event.locals.safeGetSession();
	if (!session.session) session = null;

	let payload = {
		accessToken: null as string | null,
		fullName: "",
		email: "",
		avatarUrl: "" as string | null,
		userId: ""
	};

	// fill the payload
	if (session) {
		// get the user's avatar url from the db
		const { data, error } = await supabase
			.from("profile")
			.select("avatar, users(id)")
			.eq("users.id", session.user.id);

		// assign the avatar url if nothing went wrong
		let avatarUrl: string | null = null;
		if (!error) {
			if (data.length > 0) {
				avatarUrl = data[0].avatar;
			} else {
				console.error("Did not find the user's avatar. Perhaps an RLS error?");
			}
		} else {
			console.error(error);
		}

		payload = {
			accessToken: session.session.access_token,
			fullName: session.user.user_metadata.full_name ?? "",
			email: session.user.email ?? "",
			avatarUrl: avatarUrl,
			userId: session.user.id
		};
	}

	return {
		url: event.url.pathname,
		session: session,
		payload
	};
};
