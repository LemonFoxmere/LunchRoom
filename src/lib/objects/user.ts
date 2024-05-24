import { writable } from "svelte/store";

export const anonUser: AppUser = {
	account: {
		uid: "",
		email: "",
		name: "",
		provider: null
	},
	profile: {}
};

export const user = writable<AppUser>(anonUser);
