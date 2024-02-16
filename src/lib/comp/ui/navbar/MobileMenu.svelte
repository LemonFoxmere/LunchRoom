<script lang="ts">
	export let mobileMenuOpened: boolean;
	export let closeMobileMenu: () => void;
</script>

<main>
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
			<slot />
		</div>
	</div>
</main>

<style lang="scss">
	@import "$static/stylesheets/guideline";

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

			min-height: 50px;
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
			}
		}

		@media screen and (max-width: $mobile-width) {
			top: $mobile-navbar-height;
		}
	}
</style>
