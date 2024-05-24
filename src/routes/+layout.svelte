<script lang="ts">
	import ProfileBar from "$lib/comp/ui/navbar/bars/ProfileBar.svelte";
	import { anonUser, user } from "$lib/objects/user";
	import { onMount } from "svelte";
	import type { LayoutData } from "./$types";
	import DefaultBar from "./../lib/comp/ui/navbar/bars/DefaultBar.svelte";

	export let data: LayoutData;
	$: ({ url, session, payload } = data);

	// scroll animation
	let scrollDist = 0;
	const trackScroll = () => {
		scrollDist = window.scrollY;
		requestAnimationFrame(trackScroll);
	};

	const initUserStore = () => {
		$user = payload ?? anonUser;
	};

	const init = async () => {
		// initialize the UI comps
		trackScroll();
		initUserStore();
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
		"/dashboard": barTypes.profile,
		"/dashboard/new/post": barTypes.none,
		"/auth/confirm/email": barTypes.none,
		"/auth/confirm/oauth": barTypes.none
	};
	let navbarBarType: `${barTypes}`;
	$: navbarBarType = urlSpecificBar[url] ?? barTypes.default;
</script>

<main>
	{#if navbarBarType === barTypes.default}
		<DefaultBar {url} {animResolution} {navbarAnimDelay} {navbarLogoDelay} />
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

			display: flex;
			justify-content: center;
			align-items: flex-start;
		}
	}
</style>
