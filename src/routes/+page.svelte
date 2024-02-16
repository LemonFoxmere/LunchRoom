<script lang="ts">
	import type { PageData } from "./$types";

	export let data: PageData;
</script>

<main>
	<div id="frontpage">
		<section id="title">
			<h1>YCH</h1>
			<h3><em>Noun:</em> Your Commission Here</h3>
		</section>

		<section id="cta">
			{#if !data.accessToken}
				<a href="/signup">
					<button>Sign Up</button>
				</a>
				<button class="text">What?</button>
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
			flex-direction: row;

			#title {
				display: flex;
				flex-direction: column;

				h1 {
					font-size: 64px;
					font-weight: 800;
					transform: translate(-10px, 0px);
				}

				h3 {
					margin-top: 12px;
					font-weight: 400;
					color: $primary;
				}
			}

			#cta {
				display: flex;
				flex-direction: row;
				margin: 0 0 0 82px;
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

		p {
			width: min(600px, calc(100% - 50px));
			margin-bottom: 200px;
		}

		@media screen and (max-width: $mobile-width) {
			padding-bottom: 16px;
		}
	}
</style>
