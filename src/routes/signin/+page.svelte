<script lang="ts">
	import { API_HOST } from "$lib/@const/dynamic.env";
	import Cookies from "js-cookie";
	import SignInLock from "./../../lib/comp/ui/account/SignInLock.svelte";
	import LoadingDots from "./../../lib/comp/ui/general/LoadingDots.svelte";
	import PasswordVisibleToggle from "./../../lib/comp/ui/general/PasswordVisibleToggle.svelte";

	import type { PageData } from "./$types";

	let inputField: HTMLElement;
	let emailInput: HTMLInputElement;
	let passwordInput: HTMLInputElement;
	let keepSigninInput: HTMLInputElement;

	let authStatus: "norm" | "pending" | "fail" | "success" = "norm";

	export let data: PageData;

	const animateInputFailure = () => {
		inputField.classList.remove("no-anim");
		inputField.onanimationend = () => {
			inputField.classList.add("no-anim");
			inputField.onanimationend = null;
		};
	};

	const signin = async () => {
		// do not perform the request if the auth status is pending
		if (authStatus === "pending") return;
		authStatus = "pending";

		const email = emailInput.value;
		const password = passwordInput.value;

		// check if email and password are empty
		if (!email || !password || !/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/.test(email)) {
			animateInputFailure();
			authStatus = "norm";
			return;
		}

		const resp = await fetch(`${API_HOST}/auth/signin/`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify({
				email: email,
				password: password
			})
		});

		// in the case of login failure, set a cooldown of 3 seconds and set status to failed
		if (!resp.ok) {
			setTimeout(() => {
				authStatus = "fail";
				animateInputFailure();
			}, 1000);
			return;
		}

		const body = await resp.json();

		const accessToken = body.access_token;

		// store access token in cookies
		if (keepSigninInput.checked) {
			Cookies.set("access_token", accessToken, { expires: 7 });
		} else {
			Cookies.set("access_token", accessToken);
		}

		authStatus = "success";

		// TODO: redirect to profile page
		window.location.href = "/";
	};

	let passwordVisible = false;
</script>

<SignInLock accessTokenExist={data.accessTokenExist}>
	<main>
		<h1>Sign in to <span>LunchRoom</span></h1>

		<form>
			<section bind:this={inputField} id="input-container" class="no-anim">
				<input
					bind:this={emailInput}
					id="email-input"
					class={`${authStatus === "pending" || authStatus === "success" ? "disabled" : ""}`}
					type="email"
					placeholder="triplepaw@lunchroom.ink"
				/>

				<div id="password-container">
					<input
						bind:this={passwordInput}
						id="password-input"
						class={`${authStatus === "pending" || authStatus === "success" ? "disabled" : ""}`}
						type={`${passwordVisible ? "text" : "password"}`}
						placeholder="••••••••••"
					/>

					<div id="toggle-visible">
						<PasswordVisibleToggle bind:passwordVisible />
					</div>
				</div>
			</section>

			<button
				id="submit"
				type="submit"
				class={`solid ${authStatus === "pending" || authStatus === "success" ? "disabled" : ""}`}
				on:click={signin}
			>
				{#if authStatus === "pending" || authStatus === "success"}
					<LoadingDots />
				{:else}
					Sign in
				{/if}
			</button>

			<a
				id="keep-signin-container"
				on:click={() => {
					keepSigninInput.click();
				}}
			>
				<div id="checkbox-container">
					<input bind:this={keepSigninInput} id="checkbox" type="checkbox" checked />

					<svg x="0px" y="0px" viewBox="0 0 24 24" style="enable-background:new 0 0 24 24;">
						<style type="text/css">
							.st0 {
								stroke: currentColor;
								fill: currentColor;
								stroke-miterlimit: 10;
							}
						</style>
						<path
							class="st0"
							d="M9.9,18c-0.3,0-0.5-0.1-0.7-0.3l-4.9-5.2c-0.4-0.4-0.4-1,0-1.4s1-0.4,1.4,0l4.1,4.4l8.4-9.2
							c0.3-0.4,1-0.5,1.4-0.2c0.4,0.3,0.5,1,0.2,1.4c0,0-0.1,0.1-0.1,0.1l-9.1,10C10.4,17.9,10.1,18,9.9,18L9.9,18z"
						/>
					</svg>
				</div>

				<p id="label" class="no-drag">Keep me signed in</p>
			</a>

			{#if authStatus === "fail"}
				<p id="password-reset">
					Incorrect email or password. Try again or <a href="/reset-password">reset password</a>.
				</p>
			{/if}
		</form>

		<a id="signup" href="/signup">I don't have an account</a>
	</main>
</SignInLock>

<style lang="scss">
	@import "$static/stylesheets/guideline";

	main {
		width: 100%;
		height: calc(100vh - 2 * $navbar-height);
		padding: 0 20px;
		box-sizing: border-box;
		display: flex;
		justify-content: center;
		align-items: center;
		flex-direction: column;

		h1 {
			font-size: 36px;
		}

		form {
			position: relative;

			width: 100%;
			max-width: 600px;
			margin-top: 28px;

			display: flex;
			justify-content: center;
			align-items: center;
			flex-direction: column;

			#input-container {
				animation: 400ms 1 forwards shake;
				width: 100%;

				&.no-anim {
					// the normal state of the input fields
					animation: none;

					input {
						border-color: $black;
						transition: border-color 500ms $in-cubic;
						transition-delay: 300ms;
					}
				}

				#password-container {
					position: relative;
					display: flex;
					justify-content: center;
					align-content: center;

					input {
						padding-right: 50px;
						box-sizing: border-box;
					}

					#toggle-visible {
						position: absolute;
						width: fit-content;
						height: fit-content;

						right: 0px;
					}
				}

				input {
					width: 100%;
					height: 46px;
					padding: 0 14px;
					box-sizing: border-box;
					transition: none;

					border: 2px solid $red;
					border-radius: 10px;
					background: none;

					font-size: 16px;

					&::placeholder {
						color: $quaternary;
					}

					&#email-input {
						border-radius: 10px 10px 0 0;
					}

					&#password-input {
						border-radius: 0 0 10px 10px;
						transform: translateY(-2px);
					}
				}
			}

			#keep-signin-container {
				position: relative;
				display: flex;
				align-items: center;
				margin-top: 48px;
				cursor: pointer;

				#checkbox-container {
					display: flex;
					align-items: center;
					justify-content: center;
					width: 20px;
					height: 20px;

					#checkbox {
						appearance: none;
						width: 100%;
						height: 100%;
						margin: 0;
						padding: 0;

						background-color: $white;
						border: 1.5px solid $black;
						border-radius: 4px;

						cursor: pointer;
						pointer-events: none;

						&:checked {
							background-color: $black;
						}
					}

					svg {
						position: absolute;
						pointer-events: none;
						transform: translate(0px, 0.5px);
						width: 15px;
						height: 15px;
						color: $white;
					}
				}

				#label {
					margin-left: 14px;
					font-size: 16px;
					transform: translateY(-0.6px);
				}
			}

			#submit {
				min-width: 100px;
				padding: 10px 24px;
				margin-top: 24px;
			}

			#password-reset {
				position: absolute;
				bottom: -70px;

				font-size: 16px;
				font-weight: 400;
				color: $red;

				a {
					color: $red;
					font-size: 16px;
					font-weight: 400;
					text-decoration: underline;
				}
			}
		}

		#signup {
			position: absolute;
			bottom: 14px;

			font-size: 16px;
			font-weight: 400;
			color: $quaternary;
		}

		@media screen and (max-width: $mobile-width) {
			height: calc(100vh - $urlbar-height - $navbar-height);

			h1 {
				text-align: center;
				font-size: 32px;
			}

			form {
				margin-top: 32px;
				$icon-size: 32px;

				input {
					height: 46px;
					padding: 0 16px;
					font-size: 16px;
				}

				#submit {
					height: 46px;
					width: 100%;
				}

				#keep-signin-container {
					#checkbox-container {
						width: 22px;
						height: 22px;
					}

					#label {
						font-size: 14px;
					}
				}
			}
		}

		@keyframes shake {
			0% {
				transform: translateX(0px);
			}
			20% {
				transform: translateX(10px);
			}
			40% {
				transform: translateX(-10px);
			}
			60% {
				transform: translateX(5px);
			}
			80% {
				transform: translateX(-5px);
			}
			100% {
				transform: translateX(0px);
			}
		}
	}

	.disabled {
		pointer-events: none !important;
		cursor: default;
	}
</style>
