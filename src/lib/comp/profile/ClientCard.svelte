<script lang="ts">
</script>

<main>
	<img id="thumbnail" class="no-drag" src="/images/card-1.jpg" alt="" />

	<section id="content-container">
		<section id="artist-profile">
			<img id="pfp" class="no-drag" src="/images/pfp.jpg" alt="" />
			<h2 id="name">Lemon Foxmere</h2>
		</section>

		<h1 id="title">Digital Painting</h1>
		<h2 class="exclude-phone warning" id="status">Pending Artist Verification</h2>

		<p id="desc">
			Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ipsum qui accusamus, consequuntur
			saepe blanditiis nisi delectus, corrupti aliquid maxime dolorum est minima hic sint veritatis
			magni? Minima, maxime accusamus. Reprehenderit.
		</p>

		<!-- show the status for the phone right above the cta -->
		<h2 class="only-phone" id="status">Pending Artist Verification</h2>

		<section id="cta">
			<button id="detail" class="small solid">View Details</button>
			<button id="edit" class="small">Edit</button>
		</section>
	</section>
</main>

<style lang="scss">
	@import "$static/stylesheets/guideline";

	main {
		position: relative;

		margin-top: 35px;
		border-radius: 18px;

		width: 100%;
		height: fit-content;
		min-height: 600px;

		padding-left: 50%;
		box-sizing: border-box;

		#content-container {
			padding: 20px 60px;
			box-sizing: border-box;

			height: 100%;
			min-height: inherit;

			border: 1.5px solid $quaternary;
			border-radius: 0px 18px 18px 0px;
			border-left: none;

			display: flex;
			justify-content: center;
			align-items: flex-start;
			flex-direction: column;

			#artist-profile {
				display: flex;
				align-items: center;

				#pfp {
					width: 40px;
					height: auto;
					aspect-ratio: 1/1;
					border-radius: 100%;

					margin-right: 15px;
				}
				#name {
					font-weight: 500;
					font-size: 24px;
					color: $secondary;
				}
			}

			#title {
				font-weight: 700;
				font-size: 48px;
				margin-top: 20px;
			}
			#status {
				font-weight: 400;
				font-size: 22px;
				color: $secondary;
				margin-top: 7px;

				&.error {
					color: $red;
				}
				&.warning {
					color: $gold;
				}
				&.success {
					color: $green;
				}
			}

			#desc {
				display: -webkit-box;

				font-size: 18px;
				line-height: 24px;
				margin-top: 20px;

				-webkit-line-clamp: 5;
				-webkit-box-orient: vertical;
				overflow: hidden;
			}

			#cta {
				margin-top: 30px;
				#detail {
					margin-right: 5px;
				}
			}
		}

		#thumbnail {
			position: absolute;
			top: 0;
			left: 0;

			width: 50%;
			height: 100%;
			object-fit: cover;

			border-radius: 18px 0px 0px 18px;
		}

		@media screen and (max-width: $tablet-width) {
			#content-container {
				padding: 20px 40px;

				#artist-profile {
					#pfp {
						width: 38px;
						margin-right: 14px;
					}
					#name {
						font-size: 22px;
					}
				}

				#title {
					font-size: 38px;
					margin-top: 18px;
				}
				#status {
					font-size: 20px;
				}

				#desc {
					font-size: 16px;
					line-height: 22px;
					margin-top: 18px;
				}
			}
		}

		@media screen and (max-width: $mobile-width) {
			padding-left: 0px;
			padding-top: 75%;

			#content-container {
				width: 100%;
				padding: 25px;

				height: fit-content;
				min-height: 0;

				border-left: 1.5px solid $quaternary;
				border-top: none;
				border-radius: 0px 0px 18px 18px;

				#artist-profile {
					#pfp {
						width: 36px;
						margin-right: 12px;
					}
					#name {
						font-size: 20px;
						color: $tertiary;
						font-weight: 500;
					}
				}

				#desc {
					font-size: 16px;
					line-height: 20px;
					margin-top: 18px;

					-webkit-line-clamp: 3;
				}

				#status {
					width: 100%;
					text-align: center;

					font-size: 16px;
					color: $quaternary;

					font-style: normal;

					margin-top: 35px;
				}

				#cta {
					width: 100%;
					display: flex;
					flex-direction: column;

					margin-top: 15px;

					button {
						width: 100%;
						height: 50px;

						font-size: 16px;

						&:first-child {
							margin-bottom: 10px;
						}
					}
				}
			}

			#thumbnail {
				border-radius: 18px 18px 0px 0px;
				width: 100%;
				height: auto;
				aspect-ratio: 1/0.75;
			}
		}
	}
</style>
