import { BASE_URL } from "$lib/supabaseClient";
import { type Provider } from "@supabase/supabase-js";
import { fail, redirect } from "@sveltejs/kit";
import type { Actions, PageServerLoad } from "./$types";

const OAUTH_PROVIDERS = ["google", "discord", "twitter"];

/**
 * Load function for the page. Checks if the user is already signed in.
 * If the user is signed in, redirects to the base URL.
 */
export const load: PageServerLoad = async ({ locals: { safeGetSession } }) => {
	const { session } = await safeGetSession();
	if (session) redirect(303, `${BASE_URL}/`); // If the user is already signed in, redirect to the home page
};

export const actions: Actions = {
	signin: async ({ request, url, locals: { supabase } }) => {
		const provider = url.searchParams.get("provider") as Provider;

		// If a provider is specified, attempt to sign in with OAuth
		if (provider) {
			// Check if the provider is supported
			if (!OAUTH_PROVIDERS.includes(provider)) {
				return fail(400, {
					error: "Provider not supported."
				});
			}

			// Sign in with OAuth using the specified provider
			const { data, error } = await supabase.auth.signInWithOAuth({
				provider: provider,
				options: {
					redirectTo: `${BASE_URL}/auth/confirm/oauth/` // Redirect URL after OAuth sign-in
				}
			});

			// Handle any errors during the OAuth sign-in process
			if (error) {
				console.error(error);
				return fail(400, {
					message: "Something went wrong."
				});
			}

			// Redirect to the OAuth confirmation page
			throw redirect(303, data.url);
		}

		// If no provider is specified, attempt to sign in with email and password
		const formData = await request.formData();
		const email: string | null = formData.get("email") as string | null;
		const password: string | null = formData.get("password") as string | null;

		// Check if email and password are provided
		if (!email || !password) {
			return fail(400, {
				message: "No email or password specified."
			});
		}

		// Sign in with email and password
		const { error } = await supabase.auth.signInWithPassword({ email, password });

		// Handle any errors during the email/password sign-in process
		if (error) {
			console.error(error);
			return fail(401, { ...error });
		} else {
			// Redirect to the home page after successful sign-in
			return redirect(303, "/");
		}
	}
};
