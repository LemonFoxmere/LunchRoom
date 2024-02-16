<script lang="ts">
	import type { UserProfile } from "$server/src/user/profile/profile.repository";

	export let profileData: UserProfile = {
		name: "",
		appeared_handle: "",
		bio: null
	};
</script>

<main>
	<div id="banner">
		<img src="/images/banner.jpg" class="no-drag" alt="" />
		<div id="gradient" class="no-drag" />
	</div>
	<div id="pfp">
		<img src="/images/pfp.jpg" class="no-drag" alt="" />
	</div>

	<section id="descriptor-container">
		<section id="descriptor-aligner">
			<section id="name-bio-container">
				<section id="name-container">
					<h1 id="name">{profileData.name}</h1>
					<p class="exclude-phone" id="handle">@{profileData.appeared_handle}</p>
				</section>

				<div id="seperator"></div>

				{#if profileData.bio}
					<p id="bio">
						{profileData.bio}
					</p>
				{:else}
					<!-- if there is no bio, show the follower count where the bio would be -->
					<section id="follower-container">
						<p><span>1,017</span> Followers &emsp; <span>21</span> Commissions</p>
					</section>
				{/if}
			</section>

			<!-- if there is a bio, show the follower count to the right -->
			{#if profileData.bio}
				<section id="follower-container">
					<!-- Add the follower feature later -->
					<!-- <p><span>1,017</span> Followers &emsp; <span>21</span> Commissions</p> -->
					<p><span>21</span> Commissions</p>
				</section>
			{/if}
		</section>
	</section>
</main>

<style lang="scss">
	@import "$static/stylesheets/guideline";

	main {
		position: relative;

		width: 100%;
		height: auto;
		min-height: 600px;
		aspect-ratio: 2/1;

		margin-top: 42px;

		overflow: hidden;

		#banner {
			position: relative;

			width: 100%;
			height: auto;
			min-height: calc(1200px / (1.618 * 2));
			aspect-ratio: calc((1.618 * 2) / 1);

			img {
				width: 100%;
				height: 100%;

				border-radius: 18px 18px 0px 0px;
				object-fit: cover;
			}

			#gradient {
				position: absolute;
				width: 100%;
				height: 200px;
				bottom: 0;

				background-image: linear-gradient(
					180deg,
					rgba(25, 26, 27, 0) 0%,
					rgba(25, 26, 27, 0.6) 100%
				);
			}
		}

		#pfp {
			position: absolute;
			width: 20%;
			min-width: calc(1000px * 0.2);
			height: auto;
			aspect-ratio: 1/1;
			// border: 1px solid green;

			top: 50%;
			left: 7%;
			transform: translateY(calc(-50% - 10px)); // vertical middle & shift down 5px

			box-shadow: 0 5px 33px 0 hsla(0, 0%, 0%, 0.38);

			display: flex;
			justify-content: center;
			align-items: center;
			border-radius: 18px;

			overflow: visible;

			img {
				width: 100%;
				height: 100%;

				object-fit: cover;

				border-radius: 18px;
			}
		}

		#descriptor-container {
			width: 100%;
			height: auto;
			min-height: calc(1200px / (2.618 * 2));
			aspect-ratio: calc((2.618 * 2) / 1);

			padding: 0px 7%;
			box-sizing: border-box;

			display: flex;
			justify-content: space-between;
			align-items: center;

			border: 1.5px solid $quaternary;
			border-radius: 0px 0px 18px 18px;
			border-top: none;

			#descriptor-aligner {
				width: 100%;
				height: fit-content;
				transform: translateY(5px);

				display: flex;
				align-items: flex-end;
				justify-content: space-between;

				#name-bio-container {
					$title-font-size: clamp(48px, 3vw, 60px);
					$handle-font-size: clamp(19px, 1.2vw, 24px);

					position: relative;

					width: 100%;
					height: fit-content;

					padding-top: $title-font-size;
					padding-right: 80px;
					box-sizing: border-box;

					#name-container {
						position: absolute;
						font-size: $title-font-size;
						width: 100%;
						transform: translateY(-1em);

						display: flex;
						justify-content: flex-start;
						align-items: flex-end;

						#name {
							font-size: $title-font-size;
							white-space: nowrap;
						}
						#handle {
							font-size: $handle-font-size;
							letter-spacing: -0.2px;
							font-weight: 300;

							color: $tertiary;
							transform: translateY(-0.5rem);
							margin-left: 16px;
						}
					}

					#seperator {
						height: 15px;
					}

					#bio {
						display: -webkit-box;

						// padding-top: 29px;
						font-size: 18px;
						line-height: 24px;

						-webkit-line-clamp: 3;
						-webkit-box-orient: vertical;
						overflow: hidden;

						color: $secondary;
					}
				}

				#follower-container {
					min-width: max-content;
					width: max-content;
					height: 100%;

					p {
						width: 100%;
						text-align: right;
						font-size: clamp(16px, 1vw, 18px);
						color: $tertiary;

						span {
							font-weight: 700;
							color: black;
						}
					}
				}
			}
		}

		@media screen and (max-width: $tablet-width) {
			#banner {
				#gradient {
					height: 150px;
				}
			}

			#descriptor-container {
				#descriptor-aligner {
					align-items: flex-start;
					flex-direction: column;

					#name-bio-container {
						width: 100%;
						margin-right: 0px;
						padding: 0px;
						box-sizing: border-box;

						#name-container {
							position: relative;
							transform: none;

							flex-direction: column;
							align-items: flex-start;
							justify-content: flex-start;

							#handle {
								margin: 8px 0px 0px 0px;
							}
						}

						#bio {
							-webkit-line-clamp: 2;

							font-size: 16px;
							line-height: 22px;
						}
					}

					#follower-container {
						margin-top: 20px;
					}
				}
			}
		}

		@media screen and (max-width: $mobile-width) {
			width: 100%;
			height: 490px;
			min-height: unset;
			margin-top: 20px;

			#banner {
				height: 220px;
				min-height: unset;

				#gradient {
					height: 100px;
				}
			}

			#pfp {
				width: 130px;
				min-width: unset;
				height: 130px;

				border-radius: 100%;

				top: 220px;
				left: 50%;
				transform: translate(-50%, -50%); // vertical middle & shift down 5px

				box-shadow: none;

				img {
					width: 130px;
					height: 130px;
					border-radius: 100%;
				}
			}

			#descriptor-container {
				width: 100%;
				height: calc(100% - 220px);
				min-height: unset;

				padding: 65px 15px 15px 15px;
				box-sizing: border-box;

				#descriptor-aligner {
					transform: translate(0px);

					align-items: center;
					justify-content: center;

					#name-bio-container {
						margin: 0px;

						#name-container {
							#name {
								width: 100%;
								font-size: 36px;

								white-space: pre-wrap;
								text-align: center;

								display: inline-block;
							}
						}

						#bio {
							-webkit-line-clamp: 3;

							width: 100%;

							font-size: 16px;
							line-height: 22px;
							text-align: center;
						}
					}

					#follower-container {
						width: 100%;

						p {
							text-align: center;
							font-size: 16px;
						}
					}
				}
			}
		}
	}
</style>
