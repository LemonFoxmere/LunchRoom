import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({ locals: { user, safeGetSession } }) => {
	let session: { session: any } | null = await safeGetSession();
	if (!session.session) session = null;

	let payload = {
		accessToken: null as string | null,
		fullName: "",
		email: "",
		avatarUrl: "",
		userId: ""
	};

	// could not get session, therefore return an empty payload
	if (!session || !user) return payload;

	// assign values to payload
	payload = {
		accessToken: session.session.access_token,
		fullName: user.user_metadata.full_name ?? "",
		email: user.email ?? "",
		avatarUrl: user.user_metadata.avatar_url ?? "",
		userId: user.id
	};

	return payload;
};
