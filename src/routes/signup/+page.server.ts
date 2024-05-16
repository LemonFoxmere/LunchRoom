import { BASE_URL } from "$lib/supabaseClient";
import { type Provider } from "@supabase/supabase-js";
import { fail, redirect } from "@sveltejs/kit";
import type { Actions, PageServerLoad } from "./$types";

const OAUTH_PROVIDERS = ["google", "discord", "twitter"];

export const load: PageServerLoad = async ({ locals: { safeGetSession } }) => {
	const { session } = await safeGetSession();
	if (session) redirect(303, `${BASE_URL}/`); // dont need to sign up if the user is already signed in
};

export const actions: Actions = {
	signup: async ({ url, locals: { supabase } }) => {
		const provider = url.searchParams.get("provider") as Provider;

		if (provider) {
			if (!OAUTH_PROVIDERS.includes(provider)) {
				return fail(400, {
					error: "Provider not supported."
				});
			}

			const { data, error } = await supabase.auth.signInWithOAuth({
				provider: provider,
				options: {
					redirectTo: `${BASE_URL}/auth/confirm/oauth/`
				}
			});

			if (error) {
				console.error(error);
				return fail(400, {
					message: "Something went wrong."
				});
			}

			throw redirect(303, data.url);
		}

		throw fail(400, {
			message: "No provider specified."
		});
	}
};
