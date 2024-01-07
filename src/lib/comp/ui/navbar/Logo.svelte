<script lang="ts">
	export let animResolution: number;
	export let navbarLogoDelay: number;
</script>

<img
	src="/logo_text.svg"
	style="animation-duration: {animResolution}ms; animation-delay: {navbarLogoDelay}ms"
	height="28px"
	alt=""
	class="no-drag only-desktop"
/>
<img
	src="/logo.svg"
	style="animation-duration: {animResolution}ms; animation-delay: {navbarLogoDelay}ms"
	height="26px"
	alt=""
	class="no-drag exclude-desktop"
/>

<style lang="scss">
	@import "$static/stylesheets/guideline";

	img {
		animation: logo-shrink forwards;
		animation-play-state: paused;
		animation-timing-function: $out-expo;

		@keyframes logo-shrink {
			from {
				transform: scale(100%);
			}
			to {
				transform: scale(80%);
			}
		}

		@media screen and (max-width: $tablet-width) {
			animation: none;
		}
	}
</style>
