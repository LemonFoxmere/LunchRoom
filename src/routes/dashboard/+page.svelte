<script lang="ts" context="module">
	import Modal from "./../../lib/comp/ui/modals/Modal.svelte";
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
	import ProfileCard from "$lib/comp/profile/ProfileCard.svelte";
	import { onMount } from "svelte";
	import { writable } from "svelte/store";

	import { TABLET_VIEWPORT_WIDTH } from "$lib/@const/dynamic.env";
	import CardMasonry from "$lib/comp/profile/sections/CardMasonry.svelte";
	import ArtistCardList from "$lib/comp/profile/sections/artist/ArtistCardList.svelte";
	import AccountSettings from "$lib/comp/ui/modals/modalContent/AccountSettings.svelte";
	import MobileAccountSettings from "$lib/comp/ui/modals/modalContent/MobileAccountSettings.svelte";
	import type { Session } from "@supabase/supabase-js";
	import type { PageData } from "./$types";
	import LoadScreen from "./../../lib/comp/ui/general/LoadScreen.svelte";

	export let data: PageData;

	let session: Session;
	$: ({ session } = data);

	// initialize the min width for the masonry cards
	let minMasonryColWidth = 450;

	// the active commission posts all commission posts
	let allCommissionPosts: string[] = [];
	let activeCommissionPosts: string[] = [];

	let allLoaded: boolean = false;

	const init = async () => {
		// add listener for window resize so that we can update the min width for the masonry cards
		const updateMasonryColWidth = () => {
			minMasonryColWidth = window.innerWidth > TABLET_VIEWPORT_WIDTH ? 450 : 300;
		};
		window.addEventListener("resize", updateMasonryColWidth);

		// trigger this update once
		updateMasonryColWidth();

		allLoaded = true;
	};
	onMount(init);
</script>

<main>
	{#if !allLoaded}
		<LoadScreen />
	{:else}
		<!-- PROFILE DISPLAYED -->
		<section id="profile">
			<!-- Profile Card -->
			<ProfileCard />

			<!-- CTA -->
			<section id="account-setting-container">
				<!-- desktop -->
				<button class="text underlined only-desktop" id="edit">Edit Profile</button>
				<button class="text underlined only-desktop" id="copy-link"
					>Copy Link to Profile</button
				>
				<!-- tablet and mobile -->
				<button class="underlined small exclude-desktop" id="edit">Edit Profile</button>
				<button class="underlined small exclude-desktop" id="copy-link"
					>Copy Link to Profile</button
				>
			</section>
		</section>

		{#if $profilePageState.type === "artist"}
			<section id="artist-content">
				<!-- The active commissions section -->
				<ArtistCardList
					title={"Active Commission Posts"}
					bind:posts={activeCommissionPosts}
					bind:method={$profilePageState.artist.activeCommSorting}
				>
					<a href="/dashboard/new/post">
						<button id="new-comm" class="solid small exclude-phone"
							>New Commission</button
						>
					</a>
				</ArtistCardList>

				<!-- The all commissions section -->
				<CardMasonry
					title={"All Commission Posts"}
					bind:posts={allCommissionPosts}
					bind:method={$profilePageState.artist.allCommSorting}
					{minMasonryColWidth}
				/>
			</section>
		{:else}
			<section id="artist-content">
				<!-- The all commissions section -->
				<CardMasonry
					title={"All Commission Posts"}
					posts={[]}
					bind:method={$profilePageState.client.allCommSorting}
					{minMasonryColWidth}
				/>
			</section>
		{/if}
	{/if}
</main>

<Modal>
	<!-- The desktop settings -->
	<div class="exclude-phone modal-content">
		<AccountSettings />
	</div>

	<!-- The mobile settings -->
	<div class="only-phone modal-content">
		<MobileAccountSettings {session} />
	</div>
</Modal>

<style lang="scss">
	@import "$static/stylesheets/guideline";

	main {
		width: calc(100% - 260px); // full navbar width minus the 20 pixels margin on each side
		max-width: 1400px;

		padding: 0 15px 200px 15px;
		box-sizing: border-box;

		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: flex-start;

		#artist-content {
			width: 100%;
			margin-top: 100px;

			display: flex;
			flex-direction: column;
			row-gap: 120px;
		}

		#all-comms {
			#cards {
				padding-top: 30px;
				box-sizing: border-box;

				width: 100%;

				// display: grid;
				// grid-template-columns: repeat(2, 50%);
				// grid-auto-flow: dense;
				// column-gap: 20px;
				// row-gap: 20px;

				// display: flex;
				// flex-wrap: wrap;
				// justify-content: space-between;
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

	.modal-content {
		display: flex;
		flex-direction: column;

		min-height: 0px;
		height: fit-content;
		max-height: 100%;
	}
</style>
