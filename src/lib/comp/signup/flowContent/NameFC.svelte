<script lang="ts">
	export let input: HTMLInputElement;
	export let value: string;
	export let enabled = false;

	export let contentHeight: number;
</script>

<main bind:clientHeight={contentHeight} style="pointer-events: {enabled ? 'all' : 'none'};">
	<h1>First, what's your name?</h1>
	<input
		disabled={!enabled}
		bind:this={input}
		bind:value
		type="text"
		class="large hide-placeholder"
		placeholder="Triple Paw"
	/>
</main>

<style lang="scss">
	@import "$static/stylesheets/guideline";

	main {
		width: 100%;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;

		h1 {
			margin-bottom: 28px;
			text-align: center;
		}

		input {
			width: 100%;
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

		@media screen and (max-width: $mobile-width) {
			h1 {
				font-size: 32px;
			}
		}
	}
</style>
