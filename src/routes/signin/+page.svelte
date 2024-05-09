<script lang="ts">
	import LoadingDots from "$lib/comp/ui/general/LoadingDots.svelte";
	import { BASE_URL, supabase } from "$lib/supabaseClient";
	import { onMount } from "svelte";

	let authorized = false;
	let authorizing = false;

	let errorMsg: string;

	let email: string = "";
	let emailField: HTMLInputElement;

	let password: string = "";
	let passwordField: HTMLInputElement;

	// email validation
	$: emailIsValid = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/.test(email);

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
		if (email && emailIsValid && password) return true;

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

		return false;
	};

	const signinWithEmail = async () => {
		errorMsg = "";
		if (!fieldsValid()) return; // check if the fields are filled out correctly.

		authorizing = true;

		const { error } = await supabase.auth.signInWithPassword({
			email: email,
			password: password
		});

		if (error) {
			// delay 1 second before denying access

			setTimeout(() => {
				animateInputFailure(passwordField);
				animateInputFailure(emailField);

				errorMsg = error.message;

				if (errorMsg == "Invalid login credentials") errorMsg = "Incorrect email or password.";

				authorizing = false;
			}, 1000);
		} else {
			authorized = true;
			authorizing = false;

			// redirect to the home page. TODO: redirect to the profile page later.
			location.href = "/";
		}
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
	<section id="signup-box-container">
		<div id="signup-box">
			<section id="title-container">
				<h1>Sign in to LunchRoom</h1>
				<p>Welcome back!</p>
			</section>

			<section id="form-container">
				<!-- Email sign up -->
				<form id="email-form">
					<section id="input-container">
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
								class="no-anim"
								type="password"
								placeholder="••••••••••"
							/>
						</section>
					</section>

					<section id="cta">
						<!-- submit -->
						<button
							id="submit"
							class="solid"
							type="submit"
							disabled={authorizing}
							on:click={signinWithEmail}
						>
							{#if !authorizing}
								Continue
							{:else}
								<LoadingDots />
							{/if}
						</button>

						<!-- error message -->
						{#if errorMsg}
							<p class="error">
								{errorMsg}
								{#if errorMsg == "Incorrect email or password."}
									<a class="error" href="/reset-password">Did you forgor?</a>
								{/if}
							</p>
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
				<a href="/signup" id="signin">I don't have an account</a>
			</section>
		</div>
	</section>
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

					padding-right: 50px;

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
				display: flex;
				column-gap: 30px;

				position: absolute;
				bottom: 15px;
				align-self: center;

				#signin {
					color: $quaternary;
					text-decoration: underline;
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

						padding-right: 0px;
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
