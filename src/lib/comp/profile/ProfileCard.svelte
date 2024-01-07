<script lang="ts">
</script>

<main>
	<div id="banner"></div>
	<div id="pfp"></div>

	<section id="descriptor-container">
		<section id="descriptor-aligner">
			<section id="name-bio-container">
				<h1 id="name">Lemon Foxmere</h1>
				<p id="bio">
					Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatem molestias, similique
					alias quas expedita dicta assumenda, quis reiciendis harum voluptates odit commodi!
				</p>
			</section>
			<section id="follower-container">
				<p><span>0</span> Followers &emsp; <span>0</span> Commissions</p>
			</section>
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
		overflow: hidden;

		#banner {
			width: 100%;
			height: auto;
			aspect-ratio: (1.618 * 2) / 1;

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
			transform: translateY(calc(-50% + 5px)); // vertical middle & shift down 5px

			border-radius: 18px;
		}

		#descriptor-container {
			width: 100%;
			height: auto;
			aspect-ratio: (2.618 * 2) / 1;

			padding: 0px 7%;
			box-sizing: border-box;

			display: flex;
			justify-content: space-between;
			align-items: center;

			border: 1px solid orange;

			#descriptor-aligner {
				width: 100%;
				height: fit-content;
				transform: translateY(5px);

				display: flex;
				align-items: flex-end;

				#name-bio-container {
					// border: 1px solid cadetblue;
					width: 70%;
					height: fit-content;

					#name {
						font-size: min(4vw, 60px);
					}
					#bio {
						margin-top: 10px;
						font-size: 18px;
						line-height: 24px;

						color: $secondary;
					}
				}

				#follower-container {
					width: 30%;
					height: 100%;
					// border: 1px solid hotpink;

					p {
						width: 100%;
						text-align: right;
						font-size: 18px;
						color: $tertiary;

						span {
							font-weight: 700;
							color: black;
						}
					}
				}
			}
		}
	}
</style>
