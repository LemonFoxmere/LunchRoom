<script lang="ts">
	import MenuButton from "../MenuButton.svelte";
	import Logo from "./../Logo.svelte";

	export let accessToken: string | undefined;
	export let url: string;

	export let animResolution: number;
	export let navbarAnimDelay: number;
	export let navbarLogoDelay: number;

	enum TopBarLayout {
		Normal = "normal",
		Alternate = "alternate",
		Minimal = "minimal"
	}
	const UrlLayouts: Record<string, `${TopBarLayout}`> = {
		"/signin": TopBarLayout.Minimal,
		"/signup": TopBarLayout.Minimal
	};

	// change the navbar layout based on page url
	let topBarLayout: `${TopBarLayout}`;
	$: topBarLayout = !UrlLayouts[url] ? "normal" : UrlLayouts[url];

	// mobile menu control
	let mobileMenuOpened = false;
	const toggleMobileMenu = () => {
		mobileMenuOpened = !mobileMenuOpened;
	};
	const closeMobileMenu = () => {
		mobileMenuOpened = false;
	};
</script>

<main>
	<div
		id="navbar"
		class={mobileMenuOpened ? "active" : ""}
		on:touchmove={(e) => {
			e.preventDefault();
			e.stopPropagation();
		}}
	>
		<div
			id="content"
			class={topBarLayout}
			style="animation-duration: {animResolution}ms; animation-delay: {navbarAnimDelay}ms"
		>
			<a id="logo" href="/" on:click={closeMobileMenu}>
				<Logo {animResolution} {navbarLogoDelay} />
			</a>

			<div id="cta-container">
				<section class="only-phone cta">
					<MenuButton opened={mobileMenuOpened} on:click={toggleMobileMenu} />
				</section>

				<section
					class="exclude-phone cta"
					style="animation-duration: {animResolution}ms; animation-delay: {navbarLogoDelay}ms"
				>
					{#if !accessToken}
						<a href="/signin">
							<button class="text">Sign In</button>
						</a>
					{/if}

					<a target="_blank">
						<button class="text">Community</button>
					</a>

					<a href="https://github.com/LemonFoxmere/LunchRoom" target="_blank">
						<button class="text">GitHub</button>
					</a>
				</section>
			</div>
		</div>
	</div>

	<div
		id="mobile-menu"
		class="{mobileMenuOpened ? '' : 'disabled'} only-phone"
		on:touchmove={(e) => {
			e.preventDefault();
			e.stopPropagation();
		}}
		on:click={closeMobileMenu}
	>
		<div id="menu-bg" on:click={(e) => e.stopPropagation()}>
			{#if !accessToken}
				<a class="menu-items" href="/signin" on:click={closeMobileMenu}>
					<button class="text">Sign in</button>
				</a>

				<hr class="menu-items" />
			{/if}

			<a class="menu-items" target="_blank" on:click={closeMobileMenu}>
				<button class="text">Community</button>
			</a>

			<hr class="menu-items" />

			<a
				class="menu-items"
				href="https://github.com/LemonFoxmere/LunchRoom"
				target="_blank"
				on:click={closeMobileMenu}
			>
				<button class="text">GitHub</button>
			</a>
		</div>
	</div>
</main>

<style lang="scss">
	@import "$static/stylesheets/guideline";

	$stagger: 40ms; // Delay between animations

	main {
		width: 100%;
		height: 100%;

		position: sticky;
		top: 0;

		z-index: 10;

		#navbar {
			@extend .navbar-container;

			#content {
				@extend .navbar-content;

				animation: move-up forwards;
				animation-play-state: paused;

				@keyframes move-up {
					from {
						transform: translateY(0px);
					}
					to {
						transform: translateY(-11px);
					}
				}

				#logo {
					position: absolute;
					left: 0;
					height: 36px;
					display: flex;
					justify-content: center;
					align-items: center;

					cursor: pointer;
				}

				#cta-container {
					position: absolute;
					right: 0;

					height: 36px;
					width: fit-content;
					display: flex;
					justify-content: center;
					align-items: center;
					overflow: visible;

					.cta {
						display: flex;
						flex-direction: row-reverse;

						animation: cta-shrink forwards;
						animation-play-state: paused;
						animation-timing-function: $out-expo;

						@keyframes cta-shrink {
							from {
								transform: scale(100%);
							}
							to {
								transform: scale(90%);
							}
						}

						a {
							text-decoration: none;
							margin-right: 48px;

							&:first-child {
								margin: 0;
							}

							button {
								display: flex;
								align-items: center;

								svg {
									margin-left: 8px;
									height: 14px;
								}
							}
						}
					}
				}

				@media screen and (max-width: $tablet-width) {
					width: calc(100vw - 50px);
				}

				@media screen and (max-width: $mobile-width) {
					animation: none;
				}

				&.minimal {
					#logo {
						left: 50%;
						transform: translateX(-50%);
					}

					#cta-container {
						pointer-events: none;
						opacity: 0;
					}
				}
			}

			@media screen and (max-width: $mobile-width) {
				align-items: center;
				min-height: $mobile-navbar-height;
				height: $mobile-navbar-height;
				transition: background-color 300ms $out-cubic;

				&.active {
					background-color: $white;
				}
			}
		}

		#mobile-menu {
			@extend .mobile-menu;

			overflow: hidden;
			pointer-events: all;

			transition: 500ms $out-cubic;
			transition-property:
				backdrop-filter,
				-webkit-backdrop-filter,
				opacity;

			#menu-bg {
				@extend .mobile-menu-background;

				transform: translateY(0px);
				transform-origin: top;
				transition: 400ms $out-cubic;
				transition-property: transform;

				.menu-items {
					width: 100%;

					@for $i from 1 through 5 {
						// Change the number based on the number of buttons
						&:nth-child(#{$i}) {
							animation: fly-in 500ms $out-cubic #{($i - 1) * $stagger} forwards;
							animation-fill-mode: both;
						}
					}

					@keyframes fly-in {
						0% {
							opacity: 0;
							transform: translateY(-15px);
						}
						100% {
							opacity: 1;
							transform: translateY(0);
						}
					}
				}

				a {
					display: flex;

					padding: 22px 8px;
					box-sizing: border-box;
					text-decoration: none;

					&:active {
						button {
							color: $tertiary;
						}
					}

					button {
						font-size: 18px;
					}
				}

				hr {
					margin: 0;
					height: 2px;
					width: calc(100% + 40px);

					border: none;
					background-color: $pentinary;
				}
			}

			&.disabled {
				opacity: 0;
				pointer-events: none;

				transition: 400ms $in-quart;
				transition-property:
					backdrop-filter,
					-webkit-backdrop-filter,
					opacity;

				#menu-bg {
					transform: translateY(-15px);
					transition: 400ms $in-quint;

					.menu-items {
						@for $i from 1 through 5 {
							// Change the number based on the number of buttons
							&:nth-child(#{$i}) {
								animation: fly-out 250ms $in-cubic #{($i - 1) * $stagger} forwards;
							}
						}
					}

					@keyframes fly-out {
						0% {
							opacity: 1;
							transform: translateY(0);
						}
						100% {
							opacity: 0;
							transform: translateY(-15px);
						}
					}
				}
			}

			@media screen and (max-width: $mobile-width) {
				top: $mobile-navbar-height;
			}
		}
	}
</style>
