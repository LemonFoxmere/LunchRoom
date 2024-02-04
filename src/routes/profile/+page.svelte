<script lang="ts">
	import type { PageData } from "./$types";
	import ArtistCard from "./../../lib/comp/profile/ArtistCard.svelte";
	import ProfileCard from "./../../lib/comp/profile/ProfileCard.svelte";

	export let data: PageData;
</script>

<main>
	<section id="profile">
		<!-- Profile Card -->
		<ProfileCard profileData={data.profile} />

		<!-- CTA -->
		<section id="account-setting-container">
			<!-- desktop -->
			<button class="text underlined only-desktop" id="edit">Edit Profile</button>
			<button class="text underlined only-desktop" id="copy-link">Copy Link to Profile</button>
			<!-- tablet and mobile -->
			<button class="underlined small exclude-desktop" id="edit">Edit Profile</button>
			<button class="underlined small exclude-desktop" id="copy-link">Copy Link to Profile</button>
		</section>
	</section>

	<section id="active-comms">
		<!-- Section Title -->
		<section id="title">
			<h1>Active Commissions</h1>

			<div id="filter-container">
				<p>Sort By</p>

				<section id="cta">
					<button id="latest" class="small solid">Latest</button>
					<button id="name" class="small">Name</button>
				</section>
			</div>
		</section>

		<!-- Cards -->
		<ArtistCard />
	</section>
</main>

<style lang="scss">
	@import "$static/stylesheets/guideline";

	main {
		width: calc(100% - 260px); // full navbar width minus the 20 pixels margin on each side
		max-width: 1400px;

		padding: 0 20px 100px 20px;
		box-sizing: border-box;

		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: flex-start;

		#active-comms {
			width: 100%;
			margin-top: 100px;

			#title {
				display: flex;
				justify-content: space-between;
				align-items: center;

				#filter-container {
					display: flex;
					align-items: center;
					justify-content: flex-start;

					p {
						font-weight: 300;
						color: $primary;
						text-align: right;
					}

					#cta {
						margin: 0px 0px 0px 30px;
						#latest {
							margin-right: 5px;
						}
					}
				}
			}
		}

		#profile {
			width: 100%;
			height: fit-content;
			box-sizing: border-box;

			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: flex-start;

			#account-setting-container {
				margin-top: 25px;

				button {
					border-radius: 10px;

					&#edit {
						margin-right: 25px;

						&.exclude-desktop {
							margin-right: 10px;
						}
					}
				}
			}
		}

		@media screen and (max-width: $tablet-width) {
			width: 100%; // adjust to full size

			#active-comms {
				#title {
					h1 {
						font-size: 32px;
					}
				}
			}

			#profile {
				#account-setting-container {
					margin-top: 14px;
				}
			}
		}

		@media screen and (max-width: $mobile-width) {
			#active-comms {
				margin-top: 60px;

				#title {
					flex-direction: column;
					justify-content: center;
					align-items: flex-start;

					h1 {
						font-size: 32px;
					}

					#filter-container {
						margin-top: 15px;
						flex-direction: column;
						align-items: flex-start;
						justify-content: center;

						p {
							text-align: left;
						}

						#cta {
							margin: 10px 0px 0px 0px;
						}
					}
				}
			}

			#profile {
				#account-setting-container {
					display: flex;
					justify-content: center;
					width: 100%;
				}
			}
		}
	}
</style>
