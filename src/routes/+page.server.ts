import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({ locals: { safeGetSession } }) => {
	let session: { session: any; user: any } | null = await safeGetSession();
	if (!session.session) session = null;

	let payload = {
		accessToken: null as string | null,
		fullName: "",
		email: "",
		avatarUrl: "",
		userId: ""
	};

	// could not get session, therefore return an empty payload
	if (!session) return payload;

	// assign values to payload
	payload = {
		accessToken: session.session.access_token,
		fullName: session.user.user_metadata.full_name ?? "",
		email: session.user.email ?? "",
		avatarUrl: session.user.user_metadata.avatar_url ?? "",
		userId: session.user.id
	};

	return payload;
};
