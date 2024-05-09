<script lang="ts">
	import MenuButton from "../MenuButton.svelte";
	import BlankBar, { TopBarLayout } from "../TopBar.svelte";
	import MobileMenu from "./../MobileMenu.svelte";

	export let accessToken: string | null;
	export let avatarUrl: string;
	export let url: string;

	export let animResolution: number;
	export let navbarAnimDelay: number;
	export let navbarLogoDelay: number;

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
	<!-- The bar on the top -->
	<BlankBar
		{animResolution}
		{navbarAnimDelay}
		{navbarLogoDelay}
		{mobileMenuOpened}
		{topBarLayout}
		{closeMobileMenu}
	>
		<section id="mobile-cta-container" class="only-phone cta">
			{#if !accessToken}
				<MenuButton opened={mobileMenuOpened} on:click={toggleMobileMenu} />
			{:else}
				<button id="avatar" class="cta-buttons text" on:click={toggleMobileMenu}>
					<img src={avatarUrl} alt="Profile Picture" />
				</button>
			{/if}
		</section>

		<section
			id="desktop-cta-container"
			class="exclude-phone cta"
			style="animation-duration: {animResolution}ms; animation-delay: {navbarLogoDelay}ms"
		>
			{#if !accessToken}
				<a id="sign-in" class="cta-links" href="/signin">
					<button class="text">Sign In</button>
				</a>
			{:else}
				<a id="avatar" class="cta-links" href="/profile">
					<button class="text">
						<img src={avatarUrl} alt="Profile Picture" />
					</button>
				</a>
			{/if}

			<a id="community" class="cta-links" target="_blank">
				<button class="text">Community</button>
			</a>

			<a
				id="github"
				class="cta-links"
				href="https://github.com/LemonFoxmere/LunchRoom"
				target="_blank"
			>
				<button class="text">GitHub</button>
			</a>
		</section>
	</BlankBar>

	<!-- The menu that opens up on mobile -->

	<MobileMenu {mobileMenuOpened} {closeMobileMenu}>
		<section class={mobileMenuOpened ? "" : "disabled"} id="mobile-cta">
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
		</section>
	</MobileMenu>
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

		.cta {
			display: flex;
			flex-direction: row-reverse;

			animation: cta-shrink forwards;
			animation-play-state: paused;
			animation-timing-function: $out-expo;

			&#mobile-cta-container {
				#avatar {
					$avatar-size: 48px;

					width: $avatar-size;
					height: $avatar-size;

					border-radius: 100%;

					img {
						width: 100%;
						height: 100%;
					}
				}
			}

			&#desktop-cta-container {
				display: flex;
				align-items: center;

				.cta-links {
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

				#avatar {
					$avatar-size: 42px;
					width: $avatar-size;
					height: $avatar-size;
					border-radius: 100%;

					button {
						padding: 0px;
						width: 100%;
						height: 100%;

						img {
							display: block;
							margin: 0;

							width: 100%;
							height: 100%;
							object-fit: cover;
						}
					}
				}
			}

			@keyframes cta-shrink {
				from {
					transform: scale(100%);
				}
				to {
					transform: scale(90%);
				}
			}
		}

		#mobile-cta {
			width: 100%;

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

			&.disabled {
				.menu-items {
					@for $i from 1 through 5 {
						// Change the number based on the number of buttons
						&:nth-child(#{$i}) {
							animation: fly-out 250ms $in-cubic #{($i - 1) * $stagger} forwards;
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
		}
	}
</style>
