<script lang="ts">
	import { goto, invalidate } from "$app/navigation";
	import ProfileBar from "$lib/comp/ui/navbar/bars/ProfileBar.svelte";
	import { onMount } from "svelte";
	import type { PageData } from "./$types";
	import DefaultBar from "./../lib/comp/ui/navbar/bars/DefaultBar.svelte";

	export let data: PageData;
	$: ({ session, supabase, url } = data);

	// scroll animation
	let scrollDist = 0;
	const trackScroll = () => {
		scrollDist = window.scrollY;
		requestAnimationFrame(trackScroll);
	};

	const init = async () => {
		// initialize the UI comps
		trackScroll();

		// supabase auth listeners
		const { data } = supabase.auth.onAuthStateChange((_, newSession) => {
			if (!newSession) {
				/**
				 * Queue this as a task so the navigation won't prevent the
				 * triggering function from completing
				 */
				setTimeout(() => {
					goto("/", { invalidateAll: true });
				});
			}
			if (newSession?.expires_at !== session?.expires_at) {
				invalidate("supabase:auth");
			}
		});

		return () => data.subscription.unsubscribe();
	};

	onMount(() => {
		init();
	});

	$: animResolution = 1000;
	$: navbarAnimDelay = Math.min(0, -1 * (Math.min(100, scrollDist) / 100) * animResolution);
	$: navbarLogoDelay = Math.min(0, -1 * (Math.min(300, scrollDist) / 300) * animResolution);

	enum barTypes {
		default = "default",
		profile = "profile",
		none = "none"
	}
	const urlSpecificBar: Record<string, `${barTypes}`> = {
		"/profile": barTypes.profile,
		"/profile/new/post": barTypes.none
	};
	let navbarBarType: `${barTypes}`;
	$: navbarBarType = urlSpecificBar[url] ?? barTypes.default;
</script>

<main>
	{#if navbarBarType === barTypes.default}
		<DefaultBar
			accessToken={data.payload.accessToken}
			avatarUrl={data.payload.avatarUrl}
			{url}
			{animResolution}
			{navbarAnimDelay}
			{navbarLogoDelay}
		/>
	{:else if navbarBarType === barTypes.profile}
		<ProfileBar {url} {animResolution} {navbarAnimDelay} {navbarLogoDelay} />
	{/if}

	<section id="main-content">
		<slot />
	</section>
</main>

<style lang="scss">
	@import "$static/stylesheets/guideline";

	main {
		width: 100%;
		display: flex;

		box-sizing: border-box;

		flex-direction: column;
		justify-content: flex-start;
		align-items: center;

		#main-content {
			width: 100%;
			height: calc(100vh - $navbar-height);
		}
	}
</style>
