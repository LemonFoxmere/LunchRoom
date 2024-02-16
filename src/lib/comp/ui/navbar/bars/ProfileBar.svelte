<script lang="ts">
	import { profilePageState } from "$route/profile/+page.svelte";
	import MenuButton from "../MenuButton.svelte";
	import MobileMenu from "../MobileMenu.svelte";
	import BlankBar, { TopBarLayout } from "../TopBar.svelte";

	// use access token as needed
	// export let accessToken: string | undefined;
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

	const toggleToClient = () => {
		$profilePageState.type = "client";
		closeMobileMenu();
	};
	const toggleToArtist = () => {
		$profilePageState.type = "artist";
		closeMobileMenu();
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
		<section
			class="exclude-phone cta"
			style="animation-duration: {animResolution}ms; animation-delay: {navbarLogoDelay}ms"
		>
			<!-- Desktop / Tablet Content Here -->
			<section id="client-artist-sel">
				<button
					id="client"
					disabled={$profilePageState.type === "client"}
					class="{$profilePageState.type === 'client' ? 'solid' : ''} small"
					on:click={toggleToClient}>Client</button
				>
				<button
					id="artist"
					disabled={$profilePageState.type === "artist"}
					class="{$profilePageState.type === 'artist' ? 'solid' : ''} small"
					on:click={toggleToArtist}>Artist</button
				>
			</section>
			<a href="/account"> <button class="text">Account Settings</button></a>
		</section>

		<!-- Mobile menu opening and closing button -->
		<section class="only-phone cta">
			<MenuButton opened={mobileMenuOpened} on:click={toggleMobileMenu} />
		</section>
	</BlankBar>

	<!-- The menu that opens up on mobile -->

	<MobileMenu {mobileMenuOpened} {closeMobileMenu}>
		<section class={mobileMenuOpened ? "" : "disabled"} id="mobile-cta">
			<!-- Mobile Menu Here -->
			<section class="mobile menu-items" id="client-artist-sel">
				<h1>Profile Type</h1>

				<section id="cta">
					<button
						id="client"
						disabled={$profilePageState.type === "client"}
						class="{$profilePageState.type === 'client' ? 'solid' : ''} small"
						on:click={toggleToClient}>Client</button
					>
					<button
						id="artist"
						disabled={$profilePageState.type === "artist"}
						class="{$profilePageState.type === 'artist' ? 'solid' : ''} small"
						on:click={toggleToArtist}>Artist</button
					>
				</section>
			</section>

			<a class="menu-items" target="_blank" on:click={closeMobileMenu}>
				<button class="text">Account Settings</button>
			</a>

			<hr class="menu-items" />

			<a class="menu-items" target="_blank" on:click={closeMobileMenu}>
				<button class="text">Log Out</button>
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

		#client-artist-sel {
			// margin-right: 42px;
			display: flex;

			button {
				&#client {
					border-radius: 10px 0px 0px 10px;
					border-right: none;
				}
				&#artist {
					border-radius: 0px 10px 10px 0px;
					border-left: none;
				}
			}

			&.mobile {
				margin: 5px 0px 20px 0px;
				width: 100%;
				display: flex;
				flex-direction: column;

				#cta {
					margin-top: 14px;
					display: flex;

					button {
						width: 100%;
						height: 50px;
						font-size: 16px;
					}
				}

				h1 {
					font-size: 32px;
					width: 100%;
				}
			}
		}

		.cta {
			display: flex;
			flex-direction: row-reverse;

			animation: cta-shrink forwards;
			animation-play-state: paused;
			animation-timing-function: $out-expo;

			display: flex;
			align-items: center;

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
				margin-right: 42px;

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
</style>
