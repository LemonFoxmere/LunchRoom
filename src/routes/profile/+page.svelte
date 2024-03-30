<script lang="ts" context="module">
	import ArtistCardSummary from "./../../lib/comp/profile/ArtistCardSummary.svelte";
	export interface ProfilePageState {
		type: "client" | "artist";
		client: {
			activeCommSorting: "latest" | "name";
			allCommSorting: "latest" | "name";
		};
		artist: {
			activeCommSorting: "latest" | "name";
			allCommSorting: "latest" | "name";
		};
	}

	export const profilePageState = writable<ProfilePageState>({
		type: "artist",
		client: {
			activeCommSorting: "latest",
			allCommSorting: "latest"
		},
		artist: {
			activeCommSorting: "latest",
			allCommSorting: "latest"
		}
	});
</script>

<script lang="ts">
	import ArtistCard from "$lib/comp/profile/ArtistCard.svelte";
	import ClientCard from "$lib/comp/profile/ClientCard.svelte";
	import ClientCardSummary from "$lib/comp/profile/ClientCardSummary.svelte";
	import NewCommission from "$lib/comp/profile/NewCommission.svelte";
	import ProfileCard from "$lib/comp/profile/ProfileCard.svelte";
	import { writable } from "svelte/store";
	import type { PageData } from "./$types";

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

	<section id="active-comms" class="comm-sections">
		<!-- Section Title -->
		<section id="title">
			<!-- Change title name dynamically based on the state of the page -->
			<h1>
				{#if $profilePageState.type === "client"}
					Current Commissions
				{:else}
					Active Commission Posts
				{/if}
			</h1>

			<div id="filter-container">
				<p>Sort By</p>

				<!-- sort button organized by current profile type -->
				{#if $profilePageState.type === "client"}
					<section id="cta">
						<button
							id="latest"
							class="small {$profilePageState.client.activeCommSorting === 'latest' ? 'solid' : ''}"
							disabled={$profilePageState.client.activeCommSorting === "latest"}
							on:click={() => ($profilePageState.client.activeCommSorting = "latest")}
						>
							Latest
						</button>
						<button
							id="name"
							class="small {$profilePageState.client.activeCommSorting === 'name' ? 'solid' : ''}"
							disabled={$profilePageState.client.activeCommSorting === "name"}
							on:click={() => ($profilePageState.client.activeCommSorting = "name")}
						>
							Name
						</button>
					</section>
				{:else if $profilePageState.type === "artist"}
					<section id="cta">
						<button
							id="latest"
							class="small {$profilePageState.artist.activeCommSorting === 'latest' ? 'solid' : ''}"
							disabled={$profilePageState.artist.activeCommSorting === "latest"}
							on:click={() => ($profilePageState.artist.activeCommSorting = "latest")}
						>
							Latest
						</button>
						<button
							id="name"
							class="small {$profilePageState.artist.activeCommSorting === 'name' ? 'solid' : ''}"
							disabled={$profilePageState.artist.activeCommSorting === "name"}
							on:click={() => ($profilePageState.artist.activeCommSorting = "name")}
						>
							Name
						</button>
					</section>
				{/if}
			</div>
		</section>

		{#if $profilePageState.type === "client"}
			<!-- Client side cards -->

			<!-- <p id="card-place-holder">No Commissions Yet...</p> -->

			<ClientCard />
		{:else}
			<!-- Artist side cards -->

			<!-- <p id="card-place-holder">No Activities Yet...</p> -->
			<ArtistCard
				title="My Commission"
				status="active"
				views={0}
				earning={0}
				slots={5}
				slotsFilled={0}
			/>
		{/if}
	</section>

	<section id="all-comms" class="comm-sections">
		<!-- Section Title -->
		<section id="title">
			<!-- Change title name dynamically based on the state of the page -->
			<section id="text-container">
				<h1>
					{#if $profilePageState.type === "client"}
						Past Commissions
					{:else}
						All Commission Posts
					{/if}
				</h1>
				<button id="new-comm" class="solid small exclude-phone">New Commission</button>
			</section>

			<div id="filter-container">
				<p>Sort By</p>

				<!-- sort button organized by current profile type -->
				{#if $profilePageState.type === "client"}
					<section id="cta">
						<button
							id="latest"
							class="small {$profilePageState.client.allCommSorting === 'latest' ? 'solid' : ''}"
							disabled={$profilePageState.client.allCommSorting === "latest"}
							on:click={() => ($profilePageState.client.allCommSorting = "latest")}
						>
							Latest
						</button>
						<button
							id="name"
							class="small {$profilePageState.client.allCommSorting === 'name' ? 'solid' : ''}"
							disabled={$profilePageState.client.allCommSorting === "name"}
							on:click={() => ($profilePageState.client.allCommSorting = "name")}
						>
							Name
						</button>
					</section>
				{:else if $profilePageState.type === "artist"}
					<section id="cta">
						<button
							id="latest"
							class="small {$profilePageState.artist.allCommSorting === 'latest' ? 'solid' : ''}"
							disabled={$profilePageState.artist.allCommSorting === "latest"}
							on:click={() => ($profilePageState.artist.allCommSorting = "latest")}
						>
							Latest
						</button>
						<button
							id="name"
							class="small {$profilePageState.artist.allCommSorting === 'name' ? 'solid' : ''}"
							disabled={$profilePageState.artist.allCommSorting === "name"}
							on:click={() => ($profilePageState.artist.allCommSorting = "name")}
						>
							Name
						</button>
					</section>
				{/if}
			</div>
		</section>

		<section id="cards">
			{#if $profilePageState.type === "client"}
				<!-- Client side cards -->

				<NewCommission />

				<ClientCardSummary name="Digital Art" />

				<!-- <p class="exclude-phone" id="card-place-holder">No Commissions Yet...</p> -->
			{:else}
				<!-- Artist side cards -->

				<NewCommission />

				<ArtistCardSummary name="Digital Art" />

				<!-- <p class="exclude-phone" id="card-place-holder">No Commissions Yet...</p> -->

				<!-- <ArtistCard /> -->
			{/if}
		</section>
	</section>
</main>

<style lang="scss">
	@import "$static/stylesheets/guideline";

	main {
		width: calc(100% - 260px); // full navbar width minus the 20 pixels margin on each side
		max-width: 1400px;

		padding: 0 20px 200px 20px;
		box-sizing: border-box;

		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: flex-start;

		#all-comms {
			#cards {
				width: 100%;
				display: flex;
				flex-wrap: wrap;
				justify-content: space-between;
			}

			#latest {
				border-radius: 10px 0px 0px 10px;
				border-right: none;
			}
			#name {
				border-radius: 0px 10px 10px 0px;
				border-left: none;
			}
		}

		#active-comms {
			#latest {
				border-radius: 10px 0px 0px 10px;
				border-right: none;
			}
			#name {
				border-radius: 0px 10px 10px 0px;
				border-left: none;
			}
		}

		.comm-sections {
			width: 100%;
			margin-top: 100px;

			#title {
				display: flex;
				justify-content: space-between;
				align-items: center;

				flex-wrap: wrap;
				row-gap: 20px;

				#text-container {
					display: flex;
					align-items: center;

					h1 {
						margin-right: 25px;
					}

					#new-comm {
						margin-right: 30px;
					}
				}

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
						display: flex;
						margin: 0px 0px 0px 30px;
					}
				}
			}

			#card-place-holder {
				width: 100%;
				text-align: center;
				margin-top: 100px;
				box-sizing: border-box;
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

		#watermark {
			align-self: center;
			margin-top: 120px;
			height: 28px;
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
			.comm-sections {
				margin-top: 60px;

				#title {
					flex-direction: column;
					justify-content: center;
					align-items: flex-start;

					row-gap: 0px;

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
