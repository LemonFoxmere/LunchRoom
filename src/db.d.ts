declare global {
	interface UserAccount {
		uid: string;
		email: string;
		name: string;
		provider: string | null;
		handle?: string | null;
	}
	interface UserProfile {
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
