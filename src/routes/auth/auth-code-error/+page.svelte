<script lang="ts">
</script>

<main>
	<section id="text">
		<h1>Uh oh! Something went wrong.</h1>
		<p>The authentication process was not successful, and here we are.</p>
	</section>

	<a href="/">
		<button class="solid"> Go Back Home </button>
	</a>
</main>

<style lang="scss">
	@import "$static/stylesheets/guideline";

	main {
		width: 100%;
		height: 100%;

		display: flex;
		justify-content: center;
		align-items: center;
		flex-direction: column;

		row-gap: 32px;

		#text {
			display: flex;
			justify-content: center;
			align-items: center;
			flex-direction: column;

			row-gap: 15px;

			p {
				font-size: 18px;
			}
		}

		a {
			button {
				padding: 10px 20px;
			}
		}
	}
</style>
