<script lang="ts">
	import { onMount } from "svelte";
	import type { PageData } from "./$types";

	export let data: PageData;

	const init = async () => {
		// first, we check if the use is logged in with a valid accessToken. If not, redirect to the signin page
		if (!data.accessToken) window.location.href = "/signin";
	};
	onMount(init);
</script>

<main>
	<section id="editor">
		<section id="thumbnail-container">
			<img id="thumbnail" src="/images/card-2.jpg" alt="" />

			<div id="logo-container">
				<img id="logo" src="/logo_text.svg" alt="" />
			</div>
		</section>

		<section id="editor-container">
			<h1>Yeah cool</h1>
		</section>
	</section>
</main>

<style lang="scss">
	@import "$static/stylesheets/guideline";

	main {
		width: 100%;
		height: 100vh;

		overflow: hidden;

		box-sizing: border-box;

		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: flex-start;

		#editor {
			width: 100%;
			height: 100%;

			display: flex;

			#editor-container {
				width: 40%;

				padding: 30px 32px;
			}

			#thumbnail-container {
				width: 55%;
				height: 100%;
				position: relative;

				#logo-container {
					position: absolute;
					left: 0px;
					top: 0px;

					width: 100%;
					height: 200px;

					background-image: linear-gradient(
						180deg,
						hsla(0, 0%, 0%, 30%) 0%,
						hsla(0, 0%, 100%, 0) 100%
					);

					#logo {
						width: 170px;
						margin-top: 40px;
						margin-left: 60px;

						filter: invert(1);
					}
				}

				#thumbnail {
					width: 100%;
					height: 100%;
					object-fit: cover;
				}
			}
		}
	}
</style>
