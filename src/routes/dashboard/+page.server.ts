import { redirectLink } from "$route/signin/+page.svelte";
import { fail, redirect } from "@sveltejs/kit";
import type { Actions, PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({ url, locals: { safeGetSession } }) => {
	const { session, user } = await safeGetSession();

	// sign in if the user is not already signed in
	if (!(session && user)) {
		// set a bounce back link in
		redirectLink.set("/dashboard");
		redirect(303, `/signin`);
	}

	return {
		url: url.href,
		session: session
	};
};

export const actions: Actions = {
	updateUser: async ({ url, request, locals: { supabase, user } }) => {
		// Extract the schema and field parameters from the URL search parameters
		const schema = url.searchParams.get("s") as string;
		const field = url.searchParams.get("f") as string;

		// Get the form data from the request
		const reqData = await request.formData();
		let value: FormDataEntryValue | null = reqData.get("value");

		// Simple error handling: return appropriate status codes for missing schema, field, or user
		if (!schema || !field) return fail(400); // Bad request if schema or field is missing
		if (!user) return fail(401); // Unauthorized if user is not authenticated

		// Pre-process the value: trim whitespace and set empty strings to null
		if (value) value = value.toString().trim();
		if (!value) value = null;

		// Update the specified field for the user in the database
		const { data, error } = await supabase
			.from(schema)
			.update({ [field]: value })
			.eq("id", user.id)
			.select();

		// Handle potential errors during the update operation
		if (error) {
			return fail(500, {
				code: error.code, // Error code
				message: error.message, // Error message
				details: error.details, // Additional details about the error
				hint: error.hint // Hint for resolving the error
			});
		}

		// Check if the update was successful by verifying the returned data
		if (!data || data.length === 0) {
			return fail(404); // Not found if no data is returned
		}

		// Return the updated user data
		return data[0];
	}
};
