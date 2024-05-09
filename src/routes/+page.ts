export const ssr = false;

import { supabase } from "$lib/supabaseClient";
import type { PageLoad } from "./$types";

export const load: PageLoad = async () => {
	const { data, error } = await supabase.auth.getSession();

	let payload = {
		accessToken: null as string | null,
		fullName: "",
		email: "",
		avatarUrl: "",
		userId: ""
	};

	if (error) {
		// error handling
		console.error(error);
		return payload;
	}
	// could not get session, therefore return an empty payload
	if (!data.session) return payload;

	// assign values to payload
	payload = {
		accessToken: data.session.access_token,
		fullName: data.session.user.user_metadata.full_name ?? "",
		email: data.session.user.email ?? "",
		avatarUrl: data.session.user.user_metadata.avatar_url ?? "",
		userId: data.session.user.id
	};

	return payload;
};
