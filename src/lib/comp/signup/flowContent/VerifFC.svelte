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

	const onsubmit = () => {
		// send dispatch event for parent component to take care of
		disp("submit");
	};

	const resendEmail = () => {
		disp("resend-code"); // again, another dispatcher event for the parent component to handle
	};
</script>

<h1>Verification code, please.</h1>
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

<style lang="scss">
	@import "$static/stylesheets/guideline";

	h1 {
		margin-bottom: 10px;
		white-space: nowrap;
	}
	p {
		margin-bottom: 32px;
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
	#input-decorator {
		position: absolute;
		left: 13.5px;
		font-size: 22px;
		font-weight: 400;

		transform: translateY(-1.65px);
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

	#resend-cooldown {
		color: $quaternary;
		font-size: 16px;
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
</style>
