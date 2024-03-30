<script lang="ts">
	export let name: string;
</script>

<main>
	<img id="thumbnail" class="no-drag" src="/images/card-1.jpg" alt="" />

	<section id="content-container">
		<section id="title-container">
			<section id="artist-profile">
				<img id="pfp" class="no-drag" src="/images/pfp.jpg" alt="" />
				<h2 id="name">Lemon Foxmere</h2>
			</section>

			<h1 id="title">{name}</h1>
		</section>

		<section id="cta">
			<button id="detail" class="small">View</button>
			<button id="edit" class="small">Share</button>
		</section>
	</section>
</main>

<style lang="scss">
	@import "$static/stylesheets/guideline";

	main {
		position: relative;

		margin-top: 35px;

		display: flex;
		flex-direction: column;

		width: calc(50% - 12px);
		height: fit-content;
		box-sizing: border-box;

		overflow: hidden;

		#content-container {
			padding: 25px;
			box-sizing: border-box;

			border: 1.5px solid $quaternary;
			border-radius: 0px 0px 18px 18px;
			border-top: none;

			display: flex;
			justify-content: space-between;
			align-items: center;

			#title-container {
				display: flex;
				flex-direction: column;

				min-width: 0px;
				margin-right: 35px;

				#artist-profile {
					display: flex;
					align-items: center;

					#pfp {
						width: 36px;
						height: auto;
						aspect-ratio: 1/1;
						border-radius: 100%;

						margin-right: 15px;
					}
					#name {
						font-weight: 400;
						font-size: 22px;
						color: $secondary;

						white-space: nowrap;
						overflow: hidden;
						text-overflow: ellipsis;
					}
				}

				#title {
					font-weight: 700;
					font-size: 36px;
					margin-top: 10px;

					width: 100%;
					height: 48px;

					white-space: nowrap;
					overflow-x: hidden;
					text-overflow: ellipsis;
				}
			}

			#cta {
				display: flex;
				column-gap: 5px;
			}
		}

		#thumbnail {
			display: block;

			width: 100%;
			height: auto;
			aspect-ratio: 2.25/1;
			object-fit: cover;

			border-radius: 18px 18px 0px 0px;
		}

		@media screen and (max-width: $tablet-width) {
			width: calc(50% - 10px);
			margin-top: 30px;

			#content-container {
				padding: 20px;
				flex-direction: column;

				#title-container {
					margin-right: 0px;
					width: 100%;

					align-items: center;

					#artist-profile {
						#pfp {
							width: 32px;
							margin-right: 14px;
						}
						#name {
							font-size: 20px;
						}
					}

					#title {
						width: 100%;
						text-align: center;
						margin-top: 10px;
					}
				}

				#cta {
					width: 100%;
					margin-top: 15px;

					button {
						width: 100%;
					}
				}
			}

			#thumbnail {
				min-height: 220px;
			}
		}

		@media screen and (max-width: $mobile-width) {
			padding-left: 0px;
			width: 100%;

			#content-container {
				width: 100%;
				padding: 20px;

				height: fit-content;
				min-height: 0;

				border-left: 1.5px solid $quaternary;
				border-top: none;
				border-radius: 0px 0px 18px 18px;

				#title-container {
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

					#title {
						font-size: 32px;
						margin-top: 12px;
					}
				}

				#cta {
					width: 100%;
					display: flex;
					margin-top: 30px;

					button {
						width: 100%;

						font-size: 16px;
					}

					#detail {
						margin-right: 10px;
					}
				}
			}

			#thumbnail {
				border-radius: 18px 18px 0px 0px;
				width: 100%;
				min-height: 0px;
				height: auto;
				aspect-ratio: 1.382/1;
			}
		}
	}
</style>
