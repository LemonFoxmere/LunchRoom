<script lang="ts" context="module">
	import { API_HOST } from "$lib/@const/dynamic.env";
	import EmailFC from "./../../lib/comp/signup/flowContent/EmailFC.svelte";
	import HandleFC from "./../../lib/comp/signup/flowContent/HandleFC.svelte";
	import IntroFC from "./../../lib/comp/signup/flowContent/IntroFC.svelte";
	import NameFC from "./../../lib/comp/signup/flowContent/NameFC.svelte";
	import PasswordFC from "./../../lib/comp/signup/flowContent/PasswordFC.svelte";
	import RedirectFC from "./../../lib/comp/signup/flowContent/RedirectFC.svelte";
	import VerifFC from "./../../lib/comp/signup/flowContent/VerifFC.svelte";
	import NavArrows from "./../../lib/comp/ui/general/NavArrows.svelte";

	import Cookies from "js-cookie";

	export interface uniqueSignupProcessStatus {
		state: null | "processing" | "success" | "failed";
		message: string;
	}

	export const handleValid = async (handle: string): Promise<[boolean, string]> => {
		// returns an error message or null for success
		// check handle validity first
		if (handle.length < 1 || handle.length > 15) {
			return [false, "Your handle's length must be between 1 and 15 characters."];
		}
		if (/^[0-9]$/.test(handle[0])) {
			return [false, "Your handle cannot begin with a number."];
		}
		if (!/^[a-zA-Z0-9_]+$/.test(handle)) {
			return [false, "Your handle must only contain letters, numbers, and underscores."];
		}

		// check if handle exists on the server
		const response = await fetch(`${API_HOST}/user/check-exists`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify({
				handle: handle
			})
		});

		const handleExists = await response.json();

		if (handleExists) {
			return [false, "This handle has already been taken. Try another one."];
		}

		return [true, "Looks Good!"];
	};

	export const emailValid = async (email: string): Promise<[boolean, string]> => {
		// returns an error message or null for success
		// check email validity first
		if (!/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/.test(email)) {
			return [false, "Please enter a valid email address."];
		}

		// check if handle exists on the server
		const response = await fetch(`${API_HOST}/user/check-exists`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify({
				email: email
			})
		});

		const emailExists = await response.json();

		if (emailExists) {
			return [false, "This email is already in use. Try another one."];
		}

		return [true, "Looks Good!"];
	};

	export const sendVerificationEmail = async (email: string, name?: string): Promise<void> => {
		// returns verification code
		// send a simple get request to the server with the name and the email
		await fetch(`${API_HOST}/auth/get-email-code`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify({
				email: email,
				name: name || ""
			})
		});
	};

	export const codeValid = async (code: string, email: string): Promise<[boolean, string]> => {
		// returns an error message or null for success
		// send code along with email to verify the email
		const response = await fetch(`${API_HOST}/auth/verify-email-code`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify({
				email: email,
				code: code
			})
		});

		// if the response is not ok, it's most likely a 403 and means the code was wrong
		if (!response.ok) {
			return [false, "Incorrect verification code."];
		}

		// assuming the code was correct, store the returned JWT in the cookie as a temporary signup token
		const body: SignUpDto = await response.json();
		const accessToken = body.access_token;

		// store access token as a session cookie
		Cookies.set("validation_token", accessToken);

		return [true, "Looks Good!"];
	};
</script>

<script lang="ts">
	let navStep = 0;

	let nameValue: string;
	let nameField: HTMLInputElement;

	let handleValue: string;
	let handleField: HTMLInputElement;

	let emailValue: string;
	let lastEmail: string;
	let emailField: HTMLInputElement;

	let verifCode: string;
	let verifField: HTMLInputElement;

	let passwordValue: string;
	let passwordField: HTMLInputElement;

	let leftClickable: boolean;
	let rightClickable: boolean;

	// the individual content height for tuning the button heights
	let introContentHeight = 65;
	let nameContentHeight = 120;
	let handleContentHeight = 120;
	let emailContentHeight = 120;
	let verifContentHeight = 120;

	// nav position : height
	let navButtonHeight: Record<number, number>;
	$: navButtonHeight = {
		0: introContentHeight / 2 + 12 + 35, // intro
		1: nameContentHeight / 2 + 12 + 35, // name
		2: handleContentHeight / 2 + 12 + 35, // handle
		3: emailContentHeight / 2 + 12 + 35, // email
		4: verifContentHeight / 2 + 12 + 35, // verification
		5: 300 // password
	};
	// UI variables
	$: navHeight =
		navButtonHeight[navStep] ?? navButtonHeight[Object.keys(navButtonHeight).length - 1];

	// nav position : action
	const navButtonActions: Record<number, (() => void) | null> = {
		0: null, // no action for the intro
		1: null,
		2: null,
		3: null,
		4: () => {
			// if the valid email is now different from the original one, send a verification email
			if (lastEmail !== emailValue) {
				lastEmail = emailValue; // update last email
				verifCodeStatus.state = null; // reset verification status to null
				verifCode = ""; // reset verification code

				sendVerificationEmail(lastEmail, nameValue);
				cooldownResend(); // start a cooldown for the verification code
			}
			// focus the field
			if (verifField) verifField.focus();
		},
		5: null
	};

	// nav position : (left disabled condition, right disabled condition)
	let navButtonDisabledCondition: Record<number, [boolean, boolean]>;
	$: navButtonDisabledCondition = {
		0: [false, true], // disabled (not clickable), normal (clickable)
		1: [true, !!nameValue], // name
		2: [true, handleStatus.state === "success"], // handle
		3: [true, emailStatus.state === "success"], // email
		4: [verifCodeStatus.state !== "success", verifCodeStatus.state === "success"], // verification
		// 4: [false, true], // verification
		5: [false, true] // verification
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

	const handleStatus: uniqueSignupProcessStatus = { state: null, message: "" };
	const emailStatus: uniqueSignupProcessStatus = { state: null, message: "" };
	const verifCodeStatus: uniqueSignupProcessStatus = { state: null, message: "" };

	let checkTimeout: ReturnType<typeof setTimeout>;
	const checkHandleAvailablility = () => {
		handleStatus.state = "processing";
		clearTimeout(checkTimeout); // clear the previous timeout

		checkTimeout = setTimeout(async () => {
			// check if handle is available after 1000ms of delay
			const [valid, message] = await handleValid(handleField.value);

			if (valid) handleStatus.state = "success";
			else handleStatus.state = "failed";

			handleStatus.message = message;
		}, 1000);
	};

	const checkEmailAvailablility = () => {
		emailStatus.state = "processing";
		clearTimeout(checkTimeout); // clear the previous timeout

		checkTimeout = setTimeout(async () => {
			// check if handle is available after 1000ms of delay
			const email = emailField.value;
			const [valid, message] = await emailValid(email);

			// set email status to success and store the valid email
			if (valid) {
				emailStatus.state = "success";
			} else emailStatus.state = "failed";

			emailStatus.message = message;
		}, 1000);
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

	let resendCooldownInterval: ReturnType<typeof setInterval>;
	let resendCooldownTime = 0;
	const cooldownResend = () => {
		clearInterval(resendCooldownInterval);
		resendCooldownTime = 30; // reset back to 30 seconds

		resendCooldownInterval = setInterval(() => {
			resendCooldownTime--;
			if (resendCooldownTime === 0) clearInterval(resendCooldownInterval);
		}, 1000);
	};
	const resendVerificationCode = () => {
		sendVerificationEmail(emailField.value, nameValue);
		cooldownResend();
	};

	let signupStatus: uniqueSignupProcessStatus = { state: null, message: "" };
	const requestNewUser = async () => {
		signupStatus = {
			// set the signup status to processing
			state: "processing",
			message: ""
		};

		const options = {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${Cookies.get("validation_token")}`
			},
			body: JSON.stringify({
				email: lastEmail,
				name: nameValue,
				handle: handleValue,
				role: "NORMAL",
				password: passwordValue
			})
		};

		// clear the signup token to prevent abuse of the token
		Cookies.remove("validation_token");

		const resp: Response = await fetch(`${API_HOST}/auth/signup`, options);
		if (!resp.ok) {
			// handle error here
			signupStatus = {
				// set the signup status to failed
				state: "failed",
				message: `Something went wrong, please try again later. Status code: ${resp.status}`
			};
			return;
		}

		// if response ok, store the returned JWT in the cookie as a temporary session token.
		const body: SignUpDto = await resp.json();
		const accessToken = body.access_token;

		// store access token in cookies
		Cookies.set("access_token", accessToken);

		signupStatus = {
			// set the signup status to failed
			state: "success",
			message: ""
		};

		// move to the next flow content
		navRight();
	};
</script>

<main>
	<section id="flow-content-container">
		<section
			id="intro"
			class="flow-content {navStep === 0 ? 'visible' : ''} {navStep > 0 ? 'left' : 'right'}"
		>
			<IntroFC bind:contentHeight={introContentHeight} />
		</section>

		<section
			id="name"
			class="flow-content {navStep === 1 ? 'visible' : ''} {navStep > 1 ? 'left' : 'right'}"
		>
			<NameFC
				enabled={navStep === 1}
				bind:input={nameField}
				bind:value={nameValue}
				bind:contentHeight={nameContentHeight}
			/>
		</section>

		<!-- Form fields -->
		<section
			id="handle"
			class="flow-content {navStep === 2 ? 'visible' : ''} {navStep > 2 ? 'left' : 'right'}"
		>
			<HandleFC
				{nameValue}
				status={handleStatus}
				enabled={navStep === 2}
				bind:input={handleField}
				bind:contentHeight={handleContentHeight}
				bind:value={handleValue}
				on:input={checkHandleAvailablility}
			/>
		</section>

		<section
			id="email"
			class="flow-content {navStep === 3 ? 'visible' : ''} {navStep > 3 ? 'left' : 'right'}"
		>
			<EmailFC
				status={emailStatus}
				enabled={navStep === 3}
				bind:input={emailField}
				bind:value={emailValue}
				bind:contentHeight={emailContentHeight}
				on:input={checkEmailAvailablility}
			/>
		</section>

		<section
			id="verfication"
			class="flow-content {navStep === 4 ? 'visible' : ''} {navStep > 4 ? 'left' : 'right'}"
		>
			<VerifFC
				status={verifCodeStatus}
				enabled={navStep === 4}
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
			class="flow-content {navStep === 5 ? 'visible' : ''} {navStep > 5 ? 'left' : 'right'}"
		>
			<PasswordFC
				status={signupStatus}
				enabled={navStep === 5}
				bind:input={passwordField}
				bind:value={passwordValue}
				on:submit={requestNewUser}
			/>
		</section>

		<section
			id="password"
			class="flow-content {navStep === 6 ? 'visible' : ''} {navStep > 6 ? 'left' : 'right'}"
		>
			<RedirectFC bind:name={nameValue} />
		</section>
	</section>

	<!-- Normal nav buttons -->
	<section
		id="nav-button-container"
		style="transform: translateY({navHeight - 10}px); opacity: {navStep >= 5
			? '0'
			: '1'}; pointer-events: {navStep === 5 ? 'none' : 'all'};"
	>
		<NavArrows {leftClickable} {rightClickable} leftCallback={navLeft} rightCallback={navRight} />
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

		$content-y-offset: -10px;

		#flow-content-container {
			width: 100%;
			max-width: 100vw;
			height: 100%;
			overflow-x: hidden;

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
				height: 100%;
				max-width: 600px;

				transform: translate(0px, $content-y-offset); // y offset for appearance sake

				opacity: 0;
				pointer-events: none;

				transition:
					opacity 300ms ease-in-out,
					transform 700ms $out-generic;

				&.left {
					transform: translate(-700px, $content-y-offset);
				}
				&.right {
					transform: translate(700px, $content-y-offset);
				}
				&.visible {
					opacity: 1;
					pointer-events: all;
					transform: translate(0px, $content-y-offset);
				}
			}
		}

		#nav-button-container {
			position: fixed;
			overflow: hidden;

			transition:
				opacity 350ms $out-generic,
				transform 700ms $out-generic;
		}

		@media screen and (max-width: $mobile-width) {
			height: calc(100vh - $urlbar-height - $navbar-height);
		}
	}
</style>
