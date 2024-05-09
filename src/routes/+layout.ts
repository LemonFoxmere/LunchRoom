/*
	Cannot be true unless we want to deal with server side
	fuckery and get a session from there instead. Someone
	else can take care of this issue, not me.
*/
export const ssr = false;

import { supabase } from "$lib/supabaseClient";
import type { LayoutLoad } from "./$types";

export const load: LayoutLoad = async ({ data, depends }) => {
	/**
	 * Declare a dependency so the layout can be invalidated, for example, on
	 * session refresh.
	 */
	depends("supabase:auth");

	// const supabase = isBrowser()
	// 	? createBrowserClient(PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_ANON_KEY, {
	// 			global: {
	// 				fetch
	// 			},
	// 			cookies: {
	// 				get(key) {
	// 					const cookie = parse(document.cookie);
	// 					return cookie[key];
	// 				}
	// 			}
	// 		})
	// 	: createServerClient(PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_ANON_KEY, {
	// 			global: {
	// 				fetch
	// 			},
	// 			cookies: {
	// 				get() {
	// 					return JSON.stringify(data.session);
	// 				}
	// 			}
	// 		});

	let payload = {
		accessToken: null as string | null,
		fullName: "",
		email: "",
		avatarUrl: "",
		userId: ""
	};

	/**
	 * It's fine to use `getSession` here, because on the client, `getSession` is
	 * safe, and on the server, it reads `session` from the `LayoutData`, which
	 * safely checked the session using `safeGetSession`.
	 */
	const {
		data: { session }
	} = await supabase.auth.getSession();

	const {
		data: { user }
	} = await supabase.auth.getUser();

	// fill the payload
	if (session) {
		payload = {
			accessToken: session.access_token,
			fullName: session.user.user_metadata.full_name ?? "",
			email: session.user.email ?? "",
			avatarUrl: session.user.user_metadata.avatar_url ?? "",
			userId: session.user.id
		};
	}

	// Get the URL from the server data
	const { url } = data;

	return { session, supabase, user, url, payload };
};
