<script lang="ts" context="module">
	export enum TopBarLayout {
		Normal = "normal",
		Alternate = "alternate",
		Minimal = "minimal"
	}
</script>

<script lang="ts">
	import Logo from "./Logo.svelte";

	export let animResolution: number;
	export let navbarAnimDelay: number;
	export let navbarLogoDelay: number;

	export let mobileMenuOpened: boolean;
	export let closeMobileMenu: () => void;
	export let topBarLayout: `${TopBarLayout}`;
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
				<slot />
			</div>
		</div>
	</div>
</main>

<style lang="scss">
	@import "$static/stylesheets/guideline";

	main {
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
				}

				@media screen and (max-width: $tablet-width) {
					width: calc(100% - 50px);
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
	}
</style>
