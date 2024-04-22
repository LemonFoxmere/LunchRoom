<script lang="ts">
	import ProfileBar from "$lib/comp/ui/navbar/bars/ProfileBar.svelte";
	import { onMount } from "svelte";
	import type { PageData } from "./$types";
	import DefaultBar from "./../lib/comp/ui/navbar/bars/DefaultBar.svelte";

	export let data: PageData;

	// scroll animation
	let scrollDist = 0;
	const trackScroll = () => {
		scrollDist = window.scrollY;
		requestAnimationFrame(trackScroll);
	};
	onMount(trackScroll);

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
	$: navbarBarType = urlSpecificBar[data.url] ?? barTypes.default;
</script>

<main>
	{#if navbarBarType === barTypes.default}
		<DefaultBar
			accessToken={data.accessToken}
			url={data.url}
			{animResolution}
			{navbarAnimDelay}
			{navbarLogoDelay}
		/>
	{:else if navbarBarType === barTypes.profile}
		<ProfileBar url={data.url} {animResolution} {navbarAnimDelay} {navbarLogoDelay} />
	{/if}

	<slot />
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
	}
</style>
