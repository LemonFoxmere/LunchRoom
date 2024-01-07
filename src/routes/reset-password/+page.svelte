<script lang="ts">
	import { API_HOST } from "$lib/@const/dynamic.env";
	import NavArrows from "$lib/comp/ui/general/NavArrows.svelte";
	import {
		codeValid,
		sendVerificationEmail,
		type uniqueSignupProcessStatus
	} from "$route/signup/+page.svelte";
	import Cookies from "js-cookie";
	import EmailFC from "./../../lib/comp/reset-password/flowContent/EmailFC.svelte";
	import PasswordFC from "./../../lib/comp/reset-password/flowContent/PasswordFC.svelte";
	import RedirectFC from "./../../lib/comp/reset-password/flowContent/RedirectFC.svelte";
	import VerifFC from "./../../lib/comp/signup/flowContent/VerifFC.svelte";

	let navStep = 3;

	let emailContentHeight = 120;

	let verifContentHeight = 120;
	// nav position : height
	let navButtonHeight: Record<number, number>;
	$: navButtonHeight = {
		0: emailContentHeight / 2 + 12 + 35, // email
		1: verifContentHeight / 2 + 12 + 35 // verification
	};
	// UI variables
	$: navHeight =
		navButtonHeight[navStep] ?? navButtonHeight[Object.keys(navButtonHeight).length - 1];

	// nav position : action
	const navButtonActions: Record<number, (() => void) | null> = {
		0: null, // no action for the intro
		1: () => {
			if (lastEmail !== "" && emailValue !== lastEmail) {
				// if the last email is not the same as the current one, resent the verification code
				verifCodeStatus.state = null; // reset verification status to null
				verifCode = ""; // reset verification code
				sendVerificationEmail(emailValue);
				cooldownResend();
			}
			// update the last working email
			lastEmail = emailValue;
		}
	};

	// nav position : (left disabled condition, right disabled condition)
	let navButtonDisabledCondition: Record<number, [boolean, boolean]>;
	$: navButtonDisabledCondition = {
		0: [false, /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/.test(emailValue)], // disabled (not clickable), normal (clickable)
		1: [verifCodeStatus.state !== "success", verifCodeStatus.state === "success"] // verification
	};
	// UI variables
	$: leftClickable = !navButtonDisabledCondition[navStep]
		? true
		: navButtonDisabledCondition[navStep][0];
	$: rightClickable = !navButtonDisabledCondition[navStep]
		? true
		: navButtonDisabledCondition[navStep][1];

	const navRight = () => {
		navStep++;

		// run navButtonActions
		const navAction = navButtonActions[navStep];
		if (navAction) navAction();
	};
	const navLeft = () => {
		navStep--;
		navStep = Math.max(navStep, 0); // clip to 0

		// run navButtonActions
		const navAction = navButtonActions[navStep];
		if (navAction) navAction();
	};

	let emailField: HTMLInputElement;
	let emailValue: string;
	let lastEmail: string;

	const verifCodeStatus: uniqueSignupProcessStatus = { state: null, message: "" };
	let verifField: HTMLInputElement;
	let verifCode: string;

	let resendCooldownInterval: ReturnType<typeof setInterval>;
	let resendCooldownTime = 0;
	let checkTimeout: ReturnType<typeof setTimeout>;

	const cooldownResend = () => {
		clearInterval(resendCooldownInterval);
		resendCooldownTime = 30; // reset back to 30 seconds

		resendCooldownInterval = setInterval(() => {
			resendCooldownTime--;
			if (resendCooldownTime === 0) clearInterval(resendCooldownInterval);
		}, 1000);
	};
	const resendVerificationCode = () => {
		sendVerificationEmail(emailField.value);
		cooldownResend();
	};

	const checkVerificationCode = () => {
		verifCodeStatus.state = "processing";
		clearTimeout(checkTimeout); // clear the previous timeout

		checkTimeout = setTimeout(async () => {
			// check if handle is available after 1000ms of delay
			const [valid, message] = await codeValid(verifField.value, emailField.value);

			if (valid) {
				verifCodeStatus.state = "success";
			} else {
				verifCode = ""; // reset verification code
				verifCodeStatus.state = "failed";
			}

			verifCodeStatus.message = message;
		}, 1000);
	};

	let resetStatus: uniqueSignupProcessStatus = { state: null, message: "" };
	let passwordField: HTMLInputElement;
	let passwordValue: string;

	const resetPassword = async () => {
		resetStatus = {
			// set the signup status to processing
			state: "processing",
			message: resetStatus.message // persist the error message
		};

		const options = {
			method: "PATCH",
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${Cookies.get("validation_token")}`
			},
			body: JSON.stringify({
				email: lastEmail,
				password: passwordValue
			})
		};

		const resp: Response = await fetch(`${API_HOST}/auth/resetpassword`, options);
		if (!resp.ok) {
			let errorMsg = `Something went wrong, please try again later. Status code: ${resp.status}`;
			if (resp.status === 400) {
				errorMsg = "Your new password cannot be the same as your old one.";
			}

			// set the signup status to failed after 2 seconds of cooldown
			setTimeout(() => {
				resetStatus = {
					state: "failed",
					message: errorMsg
				};

				// clear the input field
				passwordValue = "";
			}, 1000);

			return;
		}

		// clear the signup token and any old access token
		Cookies.remove("validation_token");
		Cookies.remove("access_token");

		// if response is ok, move the navStep to 3, showing a redirect screen
		navStep = 3;
	};
</script>

<main>
	<section id="flow-content-container">
		<!-- email -->
		<section
			id="email"
			class="flow-content {navStep === 0 ? 'visible' : ''} {navStep > 0 ? 'left' : 'right'}"
		>
			<EmailFC
				enabled={navStep === 0}
				bind:input={emailField}
				bind:value={emailValue}
				bind:contentHeight={emailContentHeight}
			/>
		</section>

		<section
			id="verfication"
			class="flow-content {navStep === 1 ? 'visible' : ''} {navStep > 1 ? 'left' : 'right'}"
		>
			<VerifFC
				status={verifCodeStatus}
				enabled={navStep === 1}
				{resendCooldownTime}
				bind:input={verifField}
				bind:value={verifCode}
				bind:contentHeight={verifContentHeight}
				on:submit={checkVerificationCode}
				on:resend-code={resendVerificationCode}
			/>
		</section>

		<section
			id="password"
			class="flow-content {navStep === 2 ? 'visible' : ''} {navStep > 2 ? 'left' : 'right'}"
		>
			<PasswordFC
				status={resetStatus}
				bind:input={passwordField}
				bind:value={passwordValue}
				on:submit={resetPassword}
			/>
		</section>

		<section
			id="redirect"
			class="flow-content {navStep === 3 ? 'visible' : ''} {navStep > 3 ? 'left' : 'right'}"
		>
			<RedirectFC />
		</section>

		<!-- Normal nav buttons -->
		<section
			id="nav-button-container"
			style="transform: translateY({navHeight}px); opacity: {navStep >= 2
				? '0'
				: '1'}; pointer-events: {navStep >= 2 ? 'none' : 'all'};"
		>
			<NavArrows {leftClickable} {rightClickable} leftCallback={navLeft} rightCallback={navRight} />
		</section>
	</section>
</main>

<style lang="scss">
	@import "$static/stylesheets/guideline";

	main {
		width: 100%;
		height: calc(100vh - 2 * $navbar-height);
		display: flex;
		justify-content: center;
		align-items: center;

		#flow-content-container {
			width: 100%;
			height: 100%;

			display: flex;
			justify-content: center;
			align-items: center;

			.flow-content {
				position: fixed;
				display: flex;
				justify-content: center;
				align-items: center;
				flex-direction: column;
				width: calc(100% - 40px);

				opacity: 0;
				pointer-events: none;

				transition:
					opacity 300ms ease-in-out,
					transform 700ms $out-generic;
				transform: translateX(0px);

				&.left {
					transform: translateX(-700px);
				}
				&.right {
					transform: translateX(700px);
				}
				&.visible {
					opacity: 1;
					pointer-events: all;
					transform: translateX(0px);
				}
			}
		}

		#nav-button-container {
			position: fixed;
			opacity: 1;

			transition:
				opacity 350ms $out-generic,
				transform 700ms $out-generic;
		}

		@media screen and (max-width: $mobile-width) {
			height: calc(100vh - $urlbar-height - 2 * $navbar-height);
		}
	}
</style>
