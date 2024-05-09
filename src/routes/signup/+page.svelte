<script lang="ts">
	import LoadingDots from "$lib/comp/ui/general/LoadingDots.svelte";
	import { BASE_URL, supabase } from "$lib/supabaseClient";
	import { onMount } from "svelte";
	import { cubicOut, quadInOut } from "svelte/easing";
	import { fly } from "svelte/transition";

	let authorized = false;
	let authorizing = false;

	let errorMsg = "";

	let name: string = "";
	let nameField: HTMLInputElement;

	let email: string = "";
	let emailField: HTMLInputElement;

	let password: string = "";
	let passwordField: HTMLInputElement;

	// email validation
	$: emailIsValid = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/.test(email);

	// password requirements
	$: pwLengthReq = (password.length || 0) >= 6 && (password.length || 0) <= 30;
	$: pwHasNumber = /\d/.test(password);
	$: pwHasCapLetter = /[A-Z]/.test(password);
	$: pwHasSpecialChar = /[!@#$%^&*()'"=`_+{}[\]/:;<>,.?~\\|-]/.test(password);
	$: pwIsValid = pwLengthReq && pwHasNumber && pwHasCapLetter && pwHasSpecialChar;

	let passwordFocused = false;
	const focusPasswordField = () => (passwordFocused = true);
	const blurPasswordField = () => (passwordFocused = false);

	// animate the error shake for a certain text box
	const animateInputFailure = (field: HTMLInputElement) => {
		field.classList.remove("no-anim");
		field.onanimationend = () => {
			field.classList.add("no-anim");
			field.onanimationend = null;
		};
	};

	// check if the fields are filled out correctly.
	const fieldsValid = (): boolean => {
		if (name && email && password && pwIsValid) return true;

		if (!pwIsValid) {
			errorMsg = "Please enter a valid password";
			animateInputFailure(passwordField);
		}
		if (!password) {
			errorMsg = "Please enter a password";
			animateInputFailure(passwordField);
		}
		if (!emailIsValid) {
			errorMsg = "Please a valid email address";
			animateInputFailure(emailField);
		}
		if (!email) {
			errorMsg = "Please enter your email";
			animateInputFailure(emailField);
		}
		if (!name) {
			errorMsg = "Please enter your name";
			animateInputFailure(nameField);
		}

		return false;
	};

	const createEmailAccount = async () => {
		errorMsg = "";
		if (!fieldsValid()) return; // check if the fields are filled out correctly.

		authorizing = true;

		const { error } = await supabase.auth.signUp({
			email: email,
			password: password,
			options: {
				data: {
					full_name: name
				},
				emailRedirectTo: `${BASE_URL}`
			}
		});

		if (error) {
			// session is null if the email is already in use.
			let msg = error.message;

			if (msg === "User already registered") msg = "This email is already in use";

			errorMsg = msg;
		} else {
			authorized = true;
		}

		authorizing = false;
	};

	const signupWithOauth = async (provider: "google" | "discord" | "twitter") => {
		const { error } = await supabase.auth.signInWithOAuth({
			provider: provider,
			options: {
				redirectTo: `${BASE_URL}/`
			}
		});
		if (error) {
			errorMsg = error.message;
		}
	};

	const init = () => {};

	onMount(init);
</script>

<main>
	<!-- We need another layer of container around the sign up box to account for overflow padding -->
	{#if !authorized}
		<section
			id="signup-box-container"
			transition:fly={{ y: -40, opacity: 0, duration: 300, easing: quadInOut }}
		>
			<div id="signup-box">
				<section id="title-container">
					<h1 class="exclude-phone">Welcome to LunchRoom!</h1>
					<h1 class="only-phone">Create an account</h1>
					<p>We'll make this quick</p>
				</section>

				<section id="form-container">
					<!-- Email sign up -->
					<form id="email-form">
						<section id="input-container">
							<!-- name -->
							<section class="input-section" id="name">
								<h6>Name</h6>
								<input
									bind:this={nameField}
									bind:value={name}
									class="no-anim"
									type="text"
									placeholder="Aaron Kim"
								/>
							</section>

							<!-- email -->
							<section class="input-section" id="email">
								<h6>Email</h6>
								<input
									bind:this={emailField}
									bind:value={email}
									class="no-anim"
									type="text"
									placeholder="example@lunchroom.ink"
								/>
							</section>

							<!-- password -->
							<section class="input-section" id="password">
								<h6>Password</h6>
								<input
									bind:this={passwordField}
									bind:value={password}
									on:focus={focusPasswordField}
									on:blur={blurPasswordField}
									class="no-anim"
									type="password"
									placeholder="••••••••••"
								/>

								<!-- password requirement box (for tablet and desktop only) -->
								<div id="requirement-box" class="{passwordFocused ? '' : 'hidden'} exclude-phone">
									<section class="requirement">
										<div id="light" class={pwLengthReq ? "fulfilled" : ""} />
										<p>Make it between 6 and 30 characters long</p>
									</section>

									<section class="requirement">
										<div id="light" class={pwHasNumber ? "fulfilled" : ""} />
										<p>Include at least 1 number</p>
									</section>

									<section class="requirement">
										<div id="light" class={pwHasCapLetter ? "fulfilled" : ""} />
										<p>Include at least 1 capitcalized letter</p>
									</section>

									<section class="requirement">
										<div id="light" class={pwHasSpecialChar ? "fulfilled" : ""} />
										<p>Include at least 1 special character</p>
									</section>
								</div>

								<!-- password requirement box (for mobile only) -->
								{#if password || passwordFocused}
									<div id="requirement-box" class="only-phone">
										<section class="requirement">
											<div id="light" class={pwLengthReq ? "fulfilled" : ""} />
											<p>Make it between 6 and 30 characters long</p>
										</section>

										<section class="requirement">
											<div id="light" class={pwHasNumber ? "fulfilled" : ""} />
											<p>Include at least 1 number</p>
										</section>

										<section class="requirement">
											<div id="light" class={pwHasCapLetter ? "fulfilled" : ""} />
											<p>Include at least 1 capitcalized letter</p>
										</section>

										<section class="requirement">
											<div id="light" class={pwHasSpecialChar ? "fulfilled" : ""} />
											<p>Include at least 1 special character</p>
										</section>
									</div>
								{/if}
							</section>
						</section>

						<section id="cta">
							<!-- submit -->
							<button
								id="submit"
								class="solid"
								type="submit"
								disabled={authorizing}
								on:click={createEmailAccount}
							>
								{#if !authorizing}
									Continue
								{:else}
									<LoadingDots />
								{/if}
							</button>

							<!-- error message -->
							{#if errorMsg}
								<p class="error">{errorMsg}</p>
							{/if}
						</section>
					</form>

					<!-- Oauth sign up -->
					<section id="oauth-form">
						<h6>Alternatively, continue with one of these platforms.</h6>

						<section id="logos">
							<button id="google" on:click={() => signupWithOauth("google")}>
								<img src="/logos/google.svg" alt="" />
							</button>
							<button id="discord" on:click={() => signupWithOauth("discord")}>
								<img src="/logos/discord.svg" alt="" />
							</button>
							<button id="twitter" on:click={() => signupWithOauth("twitter")}>
								<img src="/logos/twitter.svg" alt="" />
							</button>
						</section>
					</section>
				</section>

				<section id="redirect">
					<a href="/signin" id="signin">Nevermind, I already have an account</a>
				</section>
			</div>
		</section>
	{:else}
		<section
			id="success-container"
			transition:fly={{ y: 20, opacity: 0, duration: 1000, easing: cubicOut, delay: 250 }}
		>
			<svg id="checkmark" fill="none" viewBox="0 0 24 24" stroke-width="1" stroke="currentColor">
				<path
					stroke-linecap="round"
					stroke-linejoin="round"
					d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
				/>
			</svg>

			<p id="label">
				We've sent a one time verification link to your email. Click on it and you're all good to
				go!
			</p>
		</section>
	{/if}
</main>

<style lang="scss">
	@import "$static/stylesheets/guideline";

	main {
		width: 100%;
		height: 100%;

		display: flex;
		justify-content: center;
		align-items: flex-start;

		#signup-box-container {
			width: 100%;
			height: 100%;
			min-height: fit-content;

			padding: 40px 15px;

			display: flex;
			justify-content: center;
			align-items: center;
		}
		#signup-box {
			width: fit-content;
			height: fit-content;
			padding: 40px 40px 65px 40px;

			position: relative;
			border: 1px solid $quaternary;
			border-radius: 18px;

			display: flex;
			flex-direction: column;
			row-gap: 40px;

			#title-container {
				display: flex;
				flex-direction: column;
				row-gap: 10px;

				h1 {
					width: 100%;
					white-space: nowrap;

					font-size: 36px;
					line-height: 36px;
				}

				p {
					width: 100%;
					font-size: 16px;
					font-weight: 350;
				}
			}

			#form-container {
				display: flex;
				flex-direction: column;

				width: 100%;

				row-gap: 40px;

				#email-form {
					display: flex;
					flex-direction: column;

					row-gap: 30px;

					#input-container {
						display: flex;
						flex-direction: column;

						row-gap: 15px;

						.input-section {
							width: 100%;

							h6 {
								color: $primary;
								margin-bottom: 5px;
								font-weight: 600;
							}

							input {
								width: 100%;
								border: 1px solid $red;
								height: 46px;
								font-size: 16px;
								padding: 0px 15px;

								animation: 400ms 1 shake;

								&.no-anim {
									// the normal state of the input fields
									animation: none;

									border-color: $quaternary;
									transition: border-color 500ms $in-cubic;
								}
							}

							&#password {
								position: relative;
								display: flex;
								flex-direction: column;
								justify-content: center;

								#requirement-box {
									@extend .glass-heavy;

									position: absolute;
									right: -15px;
									bottom: 0px;

									padding: 20px 25px;
									border-radius: 12px;
									box-shadow: 6px 6px 24px hsla(0, 0%, 0%, 20%);

									display: flex;
									flex-direction: column;
									row-gap: 7px;

									transform: translate(100%, 25%);
									transform-origin: left;

									transition:
										transform 500ms $out-generic-expo,
										opacity 500ms $out-generic-expo,
										filter 500ms $out-generic-expo;

									&.hidden {
										opacity: 0;
										transform: translate(100%, 25%) scale(90%);
										filter: blur(5px);

										pointer-events: none;
									}

									.requirement {
										display: flex;
										align-items: center;

										column-gap: 15px;

										#light {
											width: 8px;
											height: 8px;
											border-radius: 100px;
											background-color: $pentinary;

											transition: background-color 100ms linear;

											&.fulfilled {
												background-color: $green;
											}
										}
									}
								}
							}
						}
					}

					#cta {
						display: flex;
						flex-direction: column;
						row-gap: 15px;
						align-items: center;

						#submit {
							width: 100%;
							height: 48px;
						}
					}
				}
				#oauth-form {
					display: flex;
					flex-direction: column;

					row-gap: 10px;

					h6 {
						color: $primary;
						margin-bottom: 5px;
						font-weight: 600;
					}

					#logos {
						display: flex;
						height: 55px;

						column-gap: 10px;

						button {
							flex: 1;
							min-width: 55px;
							border: 1px solid $quaternary;
							border-radius: 8px;

							display: flex;
							justify-content: center;
							align-items: center;

							img {
								height: 20px;
							}

							&#google {
								background-color: #fff;
								img {
									height: 24px;
								}
							}
							&#discord {
								background-color: #5865f2;
							}

							&#twitter {
								background-color: black;
							}

							&:hover {
								opacity: 0.8;
							}
						}
					}
				}
			}

			#redirect {
				position: absolute;
				bottom: 15px;
				align-self: center;

				#signin {
					color: $quaternary;
					text-decoration: underline;
				}
			}
		}

		#success-container {
			position: absolute;
			align-self: center;

			display: flex;
			justify-content: center;
			align-items: center;
			flex-direction: column;

			width: 100%;
			max-width: 500px;
			padding-bottom: $navbar-height;

			row-gap: 15px;

			#checkmark {
				height: 64px;
				color: $green;
			}

			#label {
				font-size: 18px;
				line-height: 24px;
				color: $primary;
				text-align: center;
			}
		}

		@media screen and (max-width: 1320px) {
			// all this bullshit just to move the password thing
			#signup-box {
				#form-container {
					#email-form {
						#input-container {
							.input-section {
								&#password {
									#requirement-box {
										width: 100%;
										height: fit-content;

										left: 0px;
										top: 0px;

										row-gap: 5px;

										transform: translate(0px, calc(-100% - 10px));
										transform-origin: bottom;

										&.hidden {
											opacity: 0;
											transform: translate(0px, calc(-100% - 10px)) scale(90%);
											filter: blur(5px);
										}
									}
								}
							}
						}
					}
				}
			}
		}

		@media screen and (max-width: $mobile-width) {
			height: fit-content;

			#signup-box-container {
				padding: 0px 15px 50px 15px;
			}

			#signup-box {
				border: none;
				padding: 0px;

				width: 100%;
				height: 100%;

				display: flex;
				flex-direction: column;
				align-items: center;
				justify-content: flex-start;
				row-gap: 35px;

				#title-container {
					row-gap: 5px;

					h1 {
						text-align: center;
						line-height: 42px;
						white-space: wrap;
					}

					p {
						text-align: center;
						font-size: 16px;
						font-weight: 400;
					}
				}

				#form-container {
					#email-form {
						row-gap: 25px;

						#input-container {
							row-gap: 15px;

							.input-section {
								&#password {
									#requirement-box {
										position: relative;
										transform: none;
										transition: none;

										background-color: transparent;
										backdrop-filter: none;
										-webkit-backdrop-filter: none;
										box-shadow: none;

										padding: 30px 10px 20px 10px;
									}
								}
							}
						}
					}

					#oauth-form {
						h6 {
							align-self: center;
							text-align: center;
						}
					}
				}

				#redirect {
					position: relative;
					bottom: unset;
					align-self: center;
				}
			}

			#success-container {
				top: 50%;
				transform: translateY(-50%);
				padding: 0px 30px;
			}
		}

		// animation definitions
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
</style>
