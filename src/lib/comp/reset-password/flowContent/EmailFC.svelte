<script lang="ts">
	import LoadingSpinner from "$lib/comp/ui/general/LoadingSpinner.svelte";
	import type { uniqueSignupProcessStatus } from "$route/signup/+page.svelte";
	import { createEventDispatcher } from "svelte";

	const disp = createEventDispatcher();

	export let status: uniqueSignupProcessStatus;

	export let input: HTMLInputElement;
	export let value: string;
	export let contentHeight: number;

	const oninput = () => {
		disp("input");
	};
</script>

<main bind:clientHeight={contentHeight}>
	<h1>Let's reset your password. What's your email?</h1>

	<input
		bind:this={input}
		bind:value
		on:input={oninput}
		type="email"
		class="large hide-placeholder"
		placeholder="triplepaw@lunchroom.ink"
	/>

	<div id="message-container">
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

        h1 {
            margin-bottom: 28px;
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
    }
</style>
