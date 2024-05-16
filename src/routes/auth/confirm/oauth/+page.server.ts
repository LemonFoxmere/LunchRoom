import { redirectLink } from "$route/signin/+page.svelte";
import { redirect } from "@sveltejs/kit";
import { get } from "svelte/store";
import type { PageServerLoad } from "./$types";

const generateRandomString = (length: number) => {
	const array = new Uint32Array(length);
	crypto.getRandomValues(array);
	return Array.from(array, (dec) => {
		const hex = dec.toString(16);
		return hex.length === 1 ? "0" + hex : hex;
	}).join("");
};

export const load: PageServerLoad = async ({ url, cookies, locals: { supabase } }) => {
	const code = url.searchParams.get("code");
	const err = url.searchParams.get("error");

	if (err) {
		switch (err) {
			case "access_denied":
				throw redirect(303, "/signin");
			default:
				throw redirect(303, "/auth/auth-code-error");
		}
	}

	const codeVerifier = generateRandomString(128);
	cookies.set("pkce_code_verifier", codeVerifier, {
		path: "/",
		httpOnly: true,
		secure: true,
		sameSite: "lax"
	});

	const { error } = await supabase.auth.exchangeCodeForSession(`${code}`);

	if (error) {
		console.error("Error exchanging code for session:", error);
		throw redirect(303, "/auth/auth-code-error");
	}

	// return to redirect link if there is one. Otherwise go home
	const dest = get(redirectLink) ?? "/";
	if (!get(redirectLink)) redirectLink.set(null); // reset the redirect link

	throw redirect(303, dest);
};
