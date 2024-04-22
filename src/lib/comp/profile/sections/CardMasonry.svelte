<script lang="ts">
	import { type CommissionPost } from "$server/src/posts/commissions/commissions.repository";
	import { onMount } from "svelte";
	import { Masonry } from "svelte-bricks";
	import ArtistCardSummary from "../ArtistCardSummary.svelte";

	export let title: string;
	export let posts: CommissionPost[];
	export let method: "latest" | "name";
	export let minMasonryColWidth = 450;
	export let maxMasonryColWidth = 600;

	// UI Bindings
	const cardAnimDuration = 500;
	const showDuration = cardAnimDuration;
	const hideDuration = cardAnimDuration / 1.5;
	let cardDisabled = false;

	// updating active commission posts once the sorting method is changed
	const sortPost = () => {
		// split the open and closed comm posts and sort them seperately
		const closedSubarr = posts.filter((e: CommissionPost) => e.closed);
		const openSubarr = posts.filter((e: CommissionPost) => !e.closed);

		// sort posts
		const sorterCallback = (a: CommissionPost, b: CommissionPost) => {
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

		closedSubarr.sort(sorterCallback);
		openSubarr.sort(sorterCallback);

		// update UI by reassignment
		posts = [...openSubarr, ...closedSubarr];
	};

	const updateActiveCommSorting = async (
		newMethod: "latest" | "name",
		animated = true,
		forced = false
	) => {
		if (!forced && newMethod === method) return; // don't animate if the sorting method hasn't changed

		// assign the new sorting method
		method = newMethod;

		if (!animated) {
			// if we don't want to animate, just update the sorting method and stop executino
			sortPost();
			return;
		}

		// apply a hiding effect to every card, sort the cards, and then remove the hiding effect
		cardDisabled = true;

		await new Promise((r) => setTimeout(r, hideDuration));
		// actually sort the post
		sortPost();

		// reshow the card 1 frame after sorting so that we don't see flickering
		requestAnimationFrame(() => {
			cardDisabled = false;
		});
	};

	const init = () => {
		// initialize sorted arrays
		updateActiveCommSorting(method, false, true);
	};

	onMount(init);
</script>

<main>
	<!-- Section Title -->
	<section id="title">
		<!-- Change title name dynamically based on the state of the page -->
		<section id="text-container">
			<h1>{title}</h1>

			<!-- This slot can be used for any title CTA that comes up -->
			<section id="cta">
				<slot />
			</section>
		</section>

		<div id="filter-container">
			<p>Sort By</p>

			<!-- sort button organized by current profile type -->
			<section id="cta">
				<button
					id="latest"
					class="small {method === 'latest' ? 'solid' : ''}"
					disabled={method === "latest"}
					on:click={() => updateActiveCommSorting("latest")}
				>
					Latest
				</button>
				<button
					id="name"
					class="small {method === 'name' ? 'solid' : ''}"
					disabled={method === "name"}
					on:click={() => updateActiveCommSorting("name")}
				>
					Name
				</button>
			</section>
		</div>
	</section>

	<section id="posts">
		<Masonry
			items={posts}
			minColWidth={minMasonryColWidth}
			maxColWidth={maxMasonryColWidth}
			animate={false}
			gap={20}
			idKey="id"
			let:item
		>
			<div
				class="cards {cardDisabled ? 'hidden' : ''}"
				style="--hide-duration: {hideDuration}ms; --show-duration: {showDuration}ms"
			>
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

		{#if posts.length === 0}
			<p id="card-place-holder">No Activities Yet...</p>
		{/if}
	</section>
</main>

<style lang="scss">
	@import "$static/stylesheets/guideline";

	main {
		width: 100%;

		#title {
			display: flex;
			justify-content: space-between;
			align-items: center;

			flex-wrap: wrap;
			row-gap: 20px;

			margin-bottom: 35px;

			#text-container {
				display: flex;
				align-items: center;

				h1 {
					margin-right: 25px;
				}

				#cta {
					display: flex;
					column-gap: 10px;
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

					#latest {
						border-radius: 10px 0px 0px 10px;
						border-right: none;
					}
					#name {
						border-radius: 0px 10px 10px 0px;
						border-left: none;
					}
				}
			}
		}

		#posts {
			.cards {
				transition: $out-cubic;
				transition-duration: var(--show-duration);
				transition-property: transform, opacity, filter;

				&.hidden {
					transition: $in-out-quad;
					transition-duration: var(--hide-duration);

					opacity: 0;
					filter: blur(5px);
					transform: scale(0.95);
					pointer-events: none;
				}
			}
		}

		#card-place-holder {
			width: 100%;
			text-align: center;
			margin-top: 100px;
			box-sizing: border-box;
		}

		@media screen and (max-width: $tablet-width) {
			#title {
				h1 {
					font-size: 32px;
				}
			}
		}

		@media screen and (max-width: $mobile-width) {
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
	}
</style>
