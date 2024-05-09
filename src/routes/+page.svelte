<script lang="ts">
	import { onMount } from "svelte";
	import type { PageData } from "./$types";

	export let data: PageData;

	onMount(() => {
		(async () => {})();
	});
</script>

<main>
	<div id="frontpage">
		<section id="title">
			<h1>UMG</h1>
			<h4>ur mom gay 🤪</h4>
		</section>

		<section id="cta">
			{#if !data.accessToken}
				<a href="/signup">
					<button>Sign Up</button>
				</a>
			{:else}
				<a href="/profile">
					<button class="solid"> View Profile</button>
				</a>
			{/if}
		</section>
	</div>
</main>

<style lang="scss">
	@import "$static/stylesheets/guideline";

	main {
		width: 100%;
		height: fit-content;
		display: flex;
		justify-content: center;
		align-items: center;
		flex-direction: column;
		box-sizing: border-box;

		#frontpage {
			width: 100%;
			height: calc(100vh - 2 * $navbar-height);
			display: flex;
			justify-content: center;
			align-items: center;
			flex-direction: column;

			row-gap: 32px;

			#title {
				display: flex;
				flex-direction: column;
				align-items: center;

				h1 {
					font-size: 64px;
					font-weight: 800;
					transform: translate(-10px, 0px);
				}

				h4 {
					margin-top: 12px;
					font-weight: 400;
					color: $tertiary;
				}
			}

			#cta {
				display: flex;
				flex-direction: row;
				box-sizing: border-box;

				button {
					width: 128px;
					height: 46px;

					&.text {
						text-decoration: underline;
					}

					&:first-child {
						margin-right: 12px;
					}
				}

				@media screen and (max-width: $tablet-width) {
					margin: 36px 0 0 0;
				}

				@media screen and (max-width: $mobile-width) {
					flex-direction: column;
					align-items: center;
					margin: 42px 0 0 0;

					width: 100%;

					a {
						width: 100%;
						display: flex;
						justify-content: center;
						align-items: center;

						text-decoration: none;
					}

					button {
						width: calc(100% - 40px);
						margin-bottom: 12px;
						margin-right: 0px;

						&:last-child {
							margin: 0;
						}

						&.text {
							width: fit-content;
						}
					}
				}
			}

			@media screen and (max-width: $tablet-width) {
				flex-direction: column;

				#title {
					h3 {
						font-size: 26px;
					}
				}
			}

			@media screen and (max-width: $mobile-width) {
				width: 100%;
				height: calc(100vh - $urlbar-height - $navbar-height);
				flex-direction: column;
			}
		}

		@media screen and (max-width: $mobile-width) {
			padding-bottom: 16px;
		}
	}
</style>
