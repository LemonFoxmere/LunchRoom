<script lang="ts">
</script>

<main>
	<div id="banner"></div>
	<div id="pfp"></div>

	<section id="descriptor-container">
		<section id="name-bio-container">
			<h1 id="name">Lemon Foxmere</h1>
		</section>
	</section>
</main>

<style lang="scss">
	@import "$static/stylesheets/guideline";

	main {
		position: relative;

		width: 100%;
		height: auto;
		aspect-ratio: 2/1;

		border: 1px solid red;
		margin-top: 42px;

		border-radius: 18px;
		// overflow: hidden;

		#banner {
			width: 100%;
			height: auto;
			aspect-ratio: 1 / (1 / (1.618 * 2));

			border: 1px solid blue;
		}

		#pfp {
			position: absolute;
			width: 17%;
			height: auto;
			aspect-ratio: 1/1;
			border: 1px solid green;

			top: 50%;
			left: 7%;
			transform: translateY(calc(-50% + 10px)); // vertical middle & shift down 10px

			border-radius: 18px;
		}

		#descriptor-container {
			width: 100%;
			height: auto;
			aspect-ratio: 1 / ((1.618 / 1 - 1 / 1.618) * (1/2));

			padding: 0px 7%;
			box-sizing: border-box;

			display: flex;
			justify-content: center;

			border: 1px solid orange;

			#name-bio-container {
				border: 1px solid cadetblue;
				width: fit-content;
				height: fit-content;
			}
		}
	}
</style>
