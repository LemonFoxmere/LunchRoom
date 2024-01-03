<script lang="ts">
	import { API_HOST } from "$lib/@const/dynamic.env";
	import Cookies from "js-cookie";
	import SignInLock from "./../../lib/comp/ui/account/SignInLock.svelte";
	import LoadingDots from "./../../lib/comp/ui/general/LoadingDots.svelte";

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

	let passwordVisible: boolean = false;
	const togglePwdVisibility = () => (passwordVisible = !passwordVisible);
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
					type="username"
					placeholder="example@lunchroom.ink"
				/>

				<div id="password-container">
					<input
						bind:this={passwordInput}
						id="password-input"
						class={`${authStatus === "pending" || authStatus === "success" ? "disabled" : ""}`}
						type={`${passwordVisible ? "text" : "password"}`}
						placeholder="••••••••••"
					/>

					<a id="toggle-visible" class="text no-drag" on:click={togglePwdVisibility}>
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
					</a>
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

			<section
				id="keep-signin-container"
				on:click={(e) => {
					keepSigninInput.click();
				}}
				role="checkbox"
				tabindex="4"
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
			</section>

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
		padding: 0px 20px;
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
					input {
						padding-right: 50px;
						box-sizing: border-box;
					}

					#toggle-visible {
						position: absolute;
						right: 14px;
						transform: translateY(8.5px);

						svg {
							color: $black;
							width: 24px;
							height: 24px;
						}
					}
				}

				input {
					width: 100%;
					height: 46px;
					padding: 0px 14px;
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
						border-radius: 10px 10px 0px 0px;
					}
					&#password-input {
						border-radius: 0px 0px 10px 10px;
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
						margin: 0px;
						padding: 0px;

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
			bottom: 24px;

			font-size: 16px;
			font-weight: 400;
			color: $quaternary;
		}

		@media screen and (max-width: $mobile-width) {
			height: calc(100vh - $urlbar-height - 2 * $navbar-height);

			h1 {
				text-align: center;
				font-size: 32px;
			}

			form {
				margin-top: 32px;
				$icon-size: 32px;

				input {
					height: 46px;
					padding: 0px 16px;
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
