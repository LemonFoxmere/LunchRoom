<script lang="ts">
	import { getHighResURL } from "$lib/util/profile/avatar";
	import type { Session } from "@supabase/supabase-js";
	import { Md5 } from "ts-md5";

	export let s: number = 48;
	export let user: AppUser;
	export let session: Session | null = null;

	export let shadow: boolean = false;

	const ceilToTwiceNearestPowerOfTwo = (dim: number) => {
		if (dim < 1) return 1; // Handle dimensions less than 1
		if (dim > 512) return 512; // Cap the maximum value at 512

		let power = 1;
		while (power < dim) {
			power *= 2;
		}

		return power * 2;
	};
</script>

<img
	id="avatar"
	style="--s: {s}px"
	src={user.profile.avatar
		? getHighResURL(
				user.profile.avatar,
				ceilToTwiceNearestPowerOfTwo(s),
				session?.user.app_metadata.provider ?? null
			)
		: `https://gravatar.com/avatar/${Md5.hashStr(session?.user.email ?? "")}?f=y&d=identicon&s=512`}
	class="no-drag {shadow ? 'shadow' : ''}"
	alt=""
/>

<style lang="scss">
	@import "$static/stylesheets/guideline";

	$s: var(--s);

	img {
		width: $s;
		height: $s;
	}
</style>
