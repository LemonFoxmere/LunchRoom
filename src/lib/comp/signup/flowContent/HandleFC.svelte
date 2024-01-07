<script lang="ts">
	import LoadingSpinner from "$lib/comp/ui/general/LoadingSpinner.svelte";
	import type { uniqueSignupProcessStatus } from "$route/signup/+page.svelte";
	import { createEventDispatcher } from "svelte";

	const disp = createEventDispatcher();
	export let contentHeight;

	export let nameValue: string;
	export let status: uniqueSignupProcessStatus;

	export let input: HTMLInputElement;
	export let value: string;

	const oninput = () => {
		disp("input");
	};
</script>

<main bind:clientHeight={contentHeight}>
	<h1>Hey {nameValue?.split(" ")[0] ?? ""}! Let's get you a handle.</h1>

	<div>
		<input
			bind:this={input}
			bind:value
			on:input={oninput}
			type="text"
			class="large hide-placeholder"
			placeholder="triplepaw"
		/>

		<p id="input-decorator" class="no-drag">@</p>
	</div>

	<div id="message-container" style="transform: translateY({contentHeight / 2 + 110}px)">
		{#if status.state !== null}
			{#if status.state === "processing"}
				<LoadingSpinner />
			{:else}
				<h6 class={status.state}>{status.message}</h6>
			{/if}
		{/if}
	</div>
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
			text-align: center;
			transition: opacity 700ms ease-in-out, transform 700ms $out-generic;

			&::-webkit-contacts-auto-fill-button {
				visibility: hidden;
				display: none !important;
				pointer-events: none;
				width: 0 !important;
				margin: 0 !important;
			}
		}

		#input-decorator {
			position: absolute;
			left: 13.5px;
			font-size: 22px;
			font-weight: 400;

			transform: translateY(-1.65px);
		}

		#message-container {
			position: absolute;
			display: flex;
			justify-content: center;
			align-items: center;

			h6 {
				font-size: 16px;
				position: relative;
				text-align: center;
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
