<script lang="ts" context="module">
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
	import anime from "animejs";
	import { onMount } from "svelte";
	import { Masonry } from "svelte-bricks";
	import { writable } from "svelte/store";
	import type { PageData } from "./$types";

	import { TABLET_VIEWPORT_WIDTH } from "$lib/@const/dynamic.env";
	import ArtistCardSummary from "$lib/comp/profile/ArtistCardSummary.svelte";
	import type { CommissionPost } from "$server/src/posts/commissions/commissions.repository";

	export let data: PageData;

	// UI bindings
	let allCommsParent: HTMLElement;

	// initialize the min width for the masonry cards
	let minMasonryColWidth = 450;

	// initialize and update the active commission posts based on the sorting method currently used
	let allCommissionPosts: CommissionPost[] = data.posts;
	let activeCommissionPosts: CommissionPost[] = data.posts.filter((e: CommissionPost) => !e.closed);

	// defining the sorting function for commission posts
	const sorterCallback = (a: CommissionPost, b: CommissionPost, method: "latest" | "name") => {
		// get sorting criteria
		const aCrit = method === "latest" ? a.updated_at : a.name;
		const bCrit = method === "latest" ? b.updated_at : b.name;

		if (aCrit < bCrit) {
			return -1;
		} else if (aCrit > bCrit) {
			return 1;
		} else {
			return 0;
		}
	};

	// updating active commission posts once the sorting method is changed
	const updateActiveCommSorting = (method: "latest" | "name") => {
		if ($profilePageState.artist.activeCommSorting === method) return; // don't animate if the sorting method hasn't changed

		const sortPost = () => {
			$profilePageState.artist.activeCommSorting = method;
			// sort posts
			activeCommissionPosts.sort((a, b) => sorterCallback(a, b, method));
			// update UI by reassignment
			activeCommissionPosts = activeCommissionPosts;
		};
	};
	// updating all commission posts once the sorting method is changed
	const updateAllCommSorting = (method: "latest" | "name") => {
		if ($profilePageState.artist.allCommSorting === method) return; // don't animate if the sorting method hasn't changed
		$profilePageState.artist.allCommSorting = method;

		const sortPost = () => {
			// split the open and closed comm posts and sort them seperately
			const closedSubarr = allCommissionPosts.filter((e: CommissionPost) => e.closed);
			const openSubarr = [...activeCommissionPosts];

			closedSubarr.sort((a, b) => sorterCallback(a, b, method));
			openSubarr.sort((a, b) => sorterCallback(a, b, method));

			// assign new value and update UI by reassignment
			allCommissionPosts = [...openSubarr, ...closedSubarr];

			// reshow the posts after a little delay
			setTimeout(() => {
				anime({
					targets: ".allCommissionCards",
					opacity: 1,
					scale: 1,
					duration: 400,
					easing: "easeOutCubic"
				});
			}, 50);
		};

		// start the hiding animation
		anime({
			targets: ".allCommissionCards",
			opacity: 0,
			scale: 0.95,
			duration: 300,
			easing: "easeOutCubic",
			complete: sortPost
		});
	};

	const init = () => {
		// add listener for window resize so that we can update the min width for the masonry cards
		const updateMasonryColWidth = () => {
			minMasonryColWidth = window.innerWidth > TABLET_VIEWPORT_WIDTH ? 450 : 300;
		};
		window.addEventListener("resize", updateMasonryColWidth);

		// initialize sorted arrays
		updateActiveCommSorting($profilePageState.artist.activeCommSorting);
		updateAllCommSorting($profilePageState.artist.allCommSorting);

		// trigger this update once
		updateMasonryColWidth();
	};
	onMount(init);
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
			<section id="text-container">
				<h1>
					{#if $profilePageState.type === "client"}
						Current Commissions
					{:else}
						Active Commission Posts
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
							class="small {$profilePageState.client.activeCommSorting === 'latest' ? 'solid' : ''}"
							disabled={$profilePageState.client.activeCommSorting === "latest"}
							on:click={() => updateActiveCommSorting("latest")}
						>
							Latest
						</button>
						<button
							id="name"
							class="small {$profilePageState.client.activeCommSorting === 'name' ? 'solid' : ''}"
							disabled={$profilePageState.client.activeCommSorting === "name"}
							on:click={() => updateActiveCommSorting("name")}
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
							on:click={() => updateActiveCommSorting("latest")}
						>
							Latest
						</button>
						<button
							id="name"
							class="small {$profilePageState.artist.activeCommSorting === 'name' ? 'solid' : ''}"
							disabled={$profilePageState.artist.activeCommSorting === "name"}
							on:click={() => updateActiveCommSorting("name")}
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

			{#each data.posts.filter((e) => !e.closed) as post}
				<!-- <ArtistCardSummary
					name={post.name}
					views={post.views}
					earning={post.earning}
					slots={post.slots}
					slotsTaken={0}
					closed={post.closed}
				/> -->
				<ArtistCard
					title={post.name}
					status="active"
					views={0}
					earning={0}
					slots={5}
					slotsFilled={0}
				/>
			{/each}

			<p id="card-place-holder">No Activities Yet...</p>
		{/if}
	</section>

	<section id="all-comms" class="comm-sections">
		<!-- Section Title -->
		<section id="title">
			<!-- Change title name dynamically based on the state of the page -->
			<h1>
				{#if $profilePageState.type === "client"}
					Past Commissions
				{:else}
					All Commission Posts
				{/if}
			</h1>

			<div id="filter-container">
				<p>Sort By</p>

				<!-- sort button organized by current profile type -->
				{#if $profilePageState.type === "client"}
					<section id="cta">
						<button
							id="latest"
							class="small {$profilePageState.client.allCommSorting === 'latest' ? 'solid' : ''}"
							disabled={$profilePageState.client.allCommSorting === "latest"}
							on:click={() => updateAllCommSorting("latest")}
						>
							Latest
						</button>
						<button
							id="name"
							class="small {$profilePageState.client.allCommSorting === 'name' ? 'solid' : ''}"
							disabled={$profilePageState.client.allCommSorting === "name"}
							on:click={() => updateAllCommSorting("name")}
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
							on:click={() => updateAllCommSorting("latest")}
						>
							Latest
						</button>
						<button
							id="name"
							class="small {$profilePageState.artist.allCommSorting === 'name' ? 'solid' : ''}"
							disabled={$profilePageState.artist.allCommSorting === "name"}
							on:click={() => updateAllCommSorting("name")}
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

				<!-- <MasonryLayout
					items={[...data.posts, ...data.posts]}
					gap="10px"
					breakpointCols={{
						// breakpoint (in px) : number of columns
						default: 2 // display 2 columns by default
					}}
				>
					{#each [...data.posts, ...data.posts] as post}
						<ArtistCardSummary
							name={post.name}
							views={post.views}
							earning={post.earning}
							slots={post.slots}
							slotsTaken={0}
							closed={post.closed}
							suspended={false}
						/>
					{/each}

				</MasonryLayout> -->

				<Masonry
					items={allCommissionPosts}
					minColWidth={minMasonryColWidth}
					maxColWidth={600}
					idKey={"id"}
					animate={false}
					gap={20}
					let:item
				>
					<div class="allCommissionCards">
						<ArtistCardSummary
							name={item.name}
							views={item.views}
							earning={item.earning}
							slots={item.slots}
							slotsTaken={0}
							closed={item.closed}
							suspended={false}
						/>
					</div>
				</Masonry>

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
