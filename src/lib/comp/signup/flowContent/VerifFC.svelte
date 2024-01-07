<script lang="ts">
	import LoadingSpinner from "$lib/comp/ui/general/LoadingSpinner.svelte";
	import VerificationInput from "$lib/comp/ui/inputs/VerificationInput.svelte";
	import type { uniqueSignupProcessStatus } from "$route/signup/+page.svelte";
	import { createEventDispatcher } from "svelte";

	const disp = createEventDispatcher();

	export let status: uniqueSignupProcessStatus;
	export let resendCooldownTime: number;

	export let input: HTMLInputElement;
	export let value: string;
	export let contentHeight: number;

	const onsubmit = () => {
		// send dispatch event for parent component to take care of
		disp("submit");
	};

	const resendEmail = () => {
		disp("resend-code"); // again, another dispatcher event for the parent component to handle
	};
</script>

<main bind:clientHeight={contentHeight}>
	<h1>Verification <span>code, please.</span></h1>
	<p>Check your inbox for a verification code to confirm it's really you.</p>

	<VerificationInput
		bind:input
		bind:value
		disabled={status.state === "success" || status.state === "processing"}
		on:submit={onsubmit}
	/>

	<div id="message-container">
		{#if status.state === null}
			{#if resendCooldownTime > 0}
				<h6 id="resend-cooldown">Resend code in {resendCooldownTime}s</h6>
			{:else if true}
				<button on:click={resendEmail} id="resend-code" class="text">
					<h6>Resend code</h6>
				</button>
			{/if}
		{:else if status.state === "failed"}
			<h6 class="failed">{status.message}&nbsp;</h6>
			{#if resendCooldownTime > 0}
				<h6 id="resend-cooldown" class="failed">Resend code in {resendCooldownTime}s.</h6>
			{:else if true}
				<button on:click={resendEmail} id="resend-code" class="text failed">
					<h6 class="failed">Resend code?</h6>
				</button>
			{/if}
		{:else if status.state === "success"}
			<h6 class="success">{status.message}</h6>
		{:else}
			<LoadingSpinner />
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
            margin-bottom: 10px;

            span {
                white-space: nowrap;
            }
        }

        p {
            margin-bottom: 32px;
            font-size: 16px;
        }

        h6 {
            font-size: 16px;
        }

        div {
            width: 100%;
            height: fit-content;
            position: relative;

            display: flex;
            justify-content: center;
            align-items: center;
        }

        #message-container {
            position: absolute;
            bottom: -130px;
            display: flex;
            justify-content: center;
            align-items: center;

            h6 {
                position: relative;
            }

            .failed {
                color: $red;
            }

            .success {
                color: $green;
            }
        }

        #resend-cooldown {
            color: $quaternary;
        }

        #resend-code {
            font-size: 16px;
            text-decoration: underline;
            cursor: pointer;

            h6 {
                color: $primary;

                #failed {
                    color: $red;
                }

                #success {
                    color: $green;
                }
            }

            &:hover {
                opacity: 0.5;
            }
        }

        @media screen and (max-width: $mobile-width) {
            h1 {
                font-size: 32px;
                text-align: center;
            }
            p {
                font-size: 14px;
                text-align: center;
            }
        }
    }
</style>
