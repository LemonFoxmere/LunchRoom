<script lang="ts">
	import { createEventDispatcher } from "svelte";

	const disp = createEventDispatcher();

	export let input: HTMLInputElement;
	export let value: string;
	export let contentHeight: number;

	export let enabled = false;

	const oninput = () => {
		disp("input");
	};
</script>

<main bind:clientHeight={contentHeight} style="pointer-events: {enabled ? 'all' : 'none'};">
	<h1>Let's reset your password. What's <span>your email?</span></h1>

	<input
		disabled={!enabled}
		bind:this={input}
		bind:value
		on:input={oninput}
		type="email"
		class="large hide-placeholder"
		placeholder="triplepaw@lunchroom.ink"
	/>
</main>

<style lang="scss">
	@import "$static/stylesheets/guideline";

	main {
		width: fit-content;
		height: fit-content;

		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;

		h1 {
			margin-bottom: 28px;
			text-align: center;

			span {
				white-space: nowrap;
			}
		}

		div {
			width: 100%;
			height: fit-content;
			position: relative;

			display: flex;
			justify-content: center;
			align-items: center;
		}

		input {
			width: 100%;
			max-width: 600px;
			text-align: center;
			transition:
				opacity 700ms ease-in-out,
				transform 700ms $out-generic;

			&::-webkit-contacts-auto-fill-button {
				visibility: hidden;
				display: none !important;
				pointer-events: none;
				width: 0 !important;
				margin: 0 !important;
			}
		}

		#message-container {
			position: absolute;
			bottom: -130px;
			display: flex;
			justify-content: center;
			align-items: center;

			h6 {
				font-size: 16px;
				position: relative;
			}

			.failed {
				color: $red;
			}

			.success {
				color: $green;
			}
		}

		@media screen and (max-width: $mobile-width) {
			h1 {
				font-size: 32px;
			}
		}
	}
</style>
