declare global {
	interface UserAccount {
		handle?: string | null;
		name?: string;
	}
	interface UserProfile {
		handle?: string | null | undefined;
		avatar?: string | null;
		banner?: string | null;
		bio?: string | null;
	}

	interface AppUser {
		account: UserAccount;
		profile: UserProfile;
	}
}

export {};
