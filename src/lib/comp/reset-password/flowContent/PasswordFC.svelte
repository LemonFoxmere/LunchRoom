<script lang="ts">
	import type { uniqueSignupProcessStatus } from "$route/signup/+page.svelte";
	import { createEventDispatcher } from "svelte";
	import LoadingDots from "./../../ui/general/LoadingDots.svelte";

	export let input: HTMLInputElement;
	export let value: string;
	export let status: uniqueSignupProcessStatus;
	const disp = createEventDispatcher();

	let passwordRequirements: Record<number, boolean>;
	$: passwordRequirements = {
		0: (value?.length || 0) >= 6 && (value?.length || 0) <= 30,
		1: /\d/.test(value),
		2: /[A-Z]/.test(value),
		3: /[!@#$%^&*()'"=`_+{}\[\]\/:;<>,.?~\\|-]/.test(value)
	};

	let failedLatched: boolean = false;
	$: failedLatched = failedLatched || status.state === "failed";

	$: passwordValid =
		passwordRequirements[0] &&
		passwordRequirements[1] &&
		passwordRequirements[2] &&
		passwordRequirements[3];

	let passwordVisible = false;
	const togglePwdVisibility = () => {
		if (input) {
			input.type = input.type === "password" ? "text" : "password";
			passwordVisible = input.type === "text";
		}
	};

	const onSubmit = () => {
		disp("submit");
	};
</script>

<main>
	<h1>Choose a new password.</h1>
	{#if failedLatched}
		<p id="failure-error">{status.message}</p>
	{:else}
		<p>And remember it this time :3</p>
	{/if}

	<div id="input-container">
		<input
			bind:this={input}
			bind:value
			type="password"
			class="input-field large hide-placeholder"
			placeholder="•••••••••"
		/>

		<button id="toggle-visible" class="text no-drag" on:click={togglePwdVisibility}>
			{#if !passwordVisible}
				<!-- eye norm -->
				<svg
					viewBox="0 0 24 24"
					version="1.1"
					xmlns="http://www.w3.org/2000/svg"
					xmlns:xlink="http://www.w3.org/1999/xlink"
				>
					<g
						id="Icons-/-eyes"
						stroke="none"
						stroke-width="1"
						fill="none"
						fill-rule="evenodd"
						stroke-linecap="round"
						stroke-linejoin="round"
					>
						<g id="Group" transform="translate(2, 5)" stroke="currentColor" stroke-width="2">
							<path
								d="M0.0517584939,7.822 C-0.0172528313,7.61458986 -0.0172528313,7.39041014 0.0517584939,7.183 C1.43875849,3.01 5.37575849,0 10.0157585,0 C14.6537585,0 18.5887585,3.007 19.9787585,7.178 C20.0487585,7.385 20.0487585,7.609 19.9787585,7.817 C18.5927585,11.99 14.6557585,15 10.0157585,15 C5.37775849,15 1.44275849,11.993 0.0527584939,7.822 L0.0517584939,7.822 Z"
								id="Path"
							/>
							<path
								d="M13.0157585,7.5 C13.0157585,9.15685425 11.6726127,10.5 10.0157585,10.5 C8.35890424,10.5 7.01575849,9.15685425 7.01575849,7.5 C7.01575849,5.84314575 8.35890424,4.5 10.0157585,4.5 C11.6726127,4.5 13.0157585,5.84314575 13.0157585,7.5 L13.0157585,7.5 Z"
								id="Path"
							/>
						</g>
					</g>
				</svg>
			{:else}
				<!-- eye slash -->
				<svg
					viewBox="0 0 24 24"
					version="1.1"
					xmlns="http://www.w3.org/2000/svg"
					xmlns:xlink="http://www.w3.org/1999/xlink"
				>
					<path
						stroke="currentColor"
						stroke-width="2"
						fill="none"
						fill-rule="evenodd"
						stroke-linecap="round"
						stroke-linejoin="round"
						d="M4.046,8.223 C3.11045529,9.32717695 2.41381556,10.6132025 2,12 C3.292,16.338 7.31,19.5 12.066,19.5 C13.059,19.5 14.019,19.362 14.929,19.105 M6.294,6.228 C8.00662064,5.09780671 10.014075,4.49682245 12.066,4.49998746 C16.822,4.49998746 20.839,7.662 22.131,11.998 C21.4228818,14.3672982 19.9029801,16.4115359 17.838,17.772 M6.294,6.228 L3.066,3 M6.294,6.228 L9.944,9.878 M17.838,17.772 L21.066,21 M17.838,17.772 L14.188,14.122 M14.188,14.122 C14.945939,13.3640611 15.2419479,12.259341 14.964523,11.2239771 C14.6870981,10.1886132 13.8783868,9.37990194 12.8430229,9.10247703 C11.807659,8.82505213 10.7029389,9.12106101 9.945,9.879 M14.187,14.121 L9.946,9.88"
						id="Shape"
					/>
				</svg>
			{/if}
		</button>
	</div>

	<button
		disabled={!passwordValid || status.state === "processing"}
		class="solid large {!passwordValid ? 'locked' : ''}"
		id="submit"
		type="submit"
		on:click={onSubmit}
	>
		{#if status.state === null || status.state === "failed"}
			Reset Password
		{:else}
			<LoadingDots />
		{/if}
	</button>

	<div id="message-container">
		<div class="pwd-req">
			<div class="pwd-check-status {passwordRequirements[0] ? 'ok' : ''}" />
			<h6>Make it between 6 and 30 characters long</h6>
		</div>
		<div class="pwd-req">
			<div class="pwd-check-status {passwordRequirements[1] ? 'ok' : ''}" />
			<h6>Include at least 1 number</h6>
		</div>
		<div class="pwd-req">
			<div class="pwd-check-status {passwordRequirements[2] ? 'ok' : ''}" />
			<h6>Include at least 1 capitcalized letter</h6>
		</div>
		<div class="pwd-req">
			<div class="pwd-check-status {passwordRequirements[3] ? 'ok' : ''}" />
			<h6>Include at least 1 special character (!@#$%^&*\)</h6>
		</div>
	</div>
</main>

<style lang="scss">
	@import "$static/stylesheets/guideline";

	main {
		width: 100%;
		height: 100%;
		position: relative;
		display: flex;
		justify-content: center;
		align-items: center;
		flex-direction: column;

		h1 {
			margin-bottom: 8px;
			white-space: nowrap;
		}
		p {
			font-size: 16px;
			margin-bottom: 28px;
		}
		#failure-error {
			color: $red;
			font-size: 16px;
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

		#input-container {
			input {
				width: 100%;
				text-align: center;

				padding-right: 44px !important;
				padding-left: 44px !important;
				box-sizing: border-box;

				&::-webkit-contacts-auto-fill-button {
					visibility: hidden;
					display: none !important;
					pointer-events: none;
					width: 0px !important;
					margin: 0px !important;
				}
			}

			#toggle-visible {
				position: absolute;
				right: 14px;
				transform: translateY(1.5px);

				svg {
					width: 24px;
					height: 24px;
				}
			}
		}

		#submit {
			margin-top: 30px;
			width: fit-content;
			min-width: 80px;

			transition: opacity 200ms ease-in-out;

			&:disabled {
				pointer-events: none;
				cursor: default;
			}
			&.locked {
				opacity: 0.3;
			}
		}

		#message-container {
			position: absolute;
			bottom: -170px;
			width: fit-content;
			display: flex;
			justify-content: center;
			align-items: center;
			flex-direction: column;

			.pwd-req {
				display: flex;
				justify-content: flex-start;
				margin-bottom: 8px;

				&:last-child {
					margin: 0;
				}

				.pwd-check-status {
					width: 8px;
					height: 8px;
					border-radius: 100%;
					background-color: $pentinary;
					margin-right: 14px;

					transition: background-color 200ms ease-in-out;

					&.ok {
						background-color: $black;
					}
				}
			}
			h6 {
				font-size: 16px;
				position: relative;
				color: $tertiary;
			}
		}
	}
</style>
