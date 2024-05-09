import type { RequestEvent } from "./$types";

export const load = async (event: RequestEvent) => {
	return {
		url: event.request.url,
		session: event.locals.session
	};
};
