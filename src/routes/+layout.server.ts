import type { LayoutServerLoad } from "./$types";

export const load: LayoutServerLoad = async ({
	url,
	locals: { supabase, user, safeGetSession }
}) => {
	const { session } = await safeGetSession();

	let payload = {
		accessToken: null as string | null,
		fullName: "",
		email: "",
		avatarUrl: "" as string | null,
		userId: ""
	};

	// fill the payload
	if (session && user) {
		// get the user's avatar url from the db
		const { data, error } = await supabase
			.from("profile")
			.select("avatar, users(id)")
			.eq("users.id", user.id);

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
			accessToken: session.access_token,
			fullName: user.user_metadata.full_name ?? "",
			email: user.email ?? "",
			avatarUrl: avatarUrl,
			userId: user.id
		};
	}

	return {
		url: url.pathname,
		session: session,
		payload
	};
};
