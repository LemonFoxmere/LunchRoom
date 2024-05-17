<script lang="ts" context="module">
	import { get, writable } from "svelte/store";

	export const modalOpen = writable<boolean>(true);
	export const modalLocked = writable<boolean>(false);
	export const closeModal = () => {
		if (!get(modalLocked)) modalOpen.set(false);
	};
	export const openModal = () => {
		if (!get(modalLocked)) modalOpen.set(true);
	};
</script>

<script lang="ts">
	let contentShown = $modalOpen;
	let contentShownTimeout: ReturnType<typeof setTimeout>;
	let animateModal = false;
	let animateModalTimeout: ReturnType<typeof setTimeout>;

	$: if (!$modalOpen) {
		animateModal = false;

		contentShownTimeout = setTimeout(() => {
			contentShown = false;
		}, 300);
	} else {
		clearTimeout(contentShownTimeout);
		contentShown = true;
	}

	$: if (contentShown) {
		animateModal = false;
		animateModalTimeout = setTimeout(() => {
			animateModal = true;
		}, 100);
	} else {
		clearTimeout(animateModalTimeout);
		animateModal = false;
	}

	// for updating mobile content height scaling
	let contentHeight = 0;
</script>

<div
	id="background-blur"
	class={$modalOpen ? "" : "hidden"}
	on:click={closeModal}
	on:touchmove={(e) => e.preventDefault()}
></div>

<div
	id="window"
	style="--content-scaling: {contentHeight}%; --content-height: {contentHeight}px"
	class={$modalOpen ? "" : "hidden"}
	bind:clientHeight={contentHeight}
	on:click={(e) => e.stopPropagation()}
	on:touchmove={(e) => e.preventDefault()}
>
	<!-- some extra mobile elements to acheive a smooth 2 slice scaling when we expand the menu -->
	<section class="mobile-only {animateModal ? '' : 'no-anim'}" id="mobile-background-scaling">
		<div id="main-backdrop"></div>
		<div id="top-bar"></div>
		<div id="bottom-bar"></div>
	</section>

	{#if contentShown}
		<div id="content" class={animateModal ? "" : "no-anim"}>
			<slot />
		</div>
	{/if}
</div>

<style lang="scss">
	@import "$static/stylesheets/guideline";

	#background-blur {
		background-color: hsla(96, 12%, 92%, 50%);

		backdrop-filter: blur(5px);
		-webkit-backdrop-filter: blur(5px);

		position: fixed;
		top: 0px;
		left: 0px;
		width: 100vw;
		height: 100vh;
		z-index: 20;

		transition: opacity 400ms $out-generic;

		&.hidden {
			pointer-events: none;
			opacity: 0;
		}
	}

	#window {
		$contentScaling: var(--content-scaling);
		$contentHeight: var(--content-height);

		position: fixed;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		z-index: 100;

		max-width: calc(100vw - 20px);
		max-height: calc(100vh - 100px);
		padding: 42px 48px;
		border-radius: 22px;

		background-color: $white;
		box-shadow: 0 5px 25px hsla(0, 0%, 0%, 30%);

		transition:
			opacity 300ms $out-generic,
			transform 800ms $out-generic-expo;

		&.hidden {
			pointer-events: none;
			opacity: 0;

			transform: translate(-50%, calc(-50% - 20px));

			transition:
				opacity 300ms $out-generic,
				transform 550ms $out-generic;
		}

		@media screen and (max-width: $mobile-width) {
			$scalingTransition: 700ms $out-generic-expo;

			width: calc(100% - 20px);
			max-height: calc(100% - 150px);
			max-width: unset;
			padding: 0px;

			background: none;
			box-shadow: none;
			border-radius: 0px;
			transform: translate(-50%, 0px);

			top: unset;
			bottom: calc(15px + 32px);

			&.hidden {
				transform: translate(-50%, 200%);
			}

			#content {
				max-height: 100%;
				padding: 0px 28px;

				clip-path: inset(calc(100% - $contentHeight - 32px) 0px 0px 0px round 32px);
				// -webkit-clip-path: inset(0px 0px 0px 0px);

				transition: clip-path $scalingTransition;

				&.no-anim {
					transition: none;
				}
			}

			#mobile-background-scaling {
				position: absolute;
				left: 0px;
				bottom: 0px;
				width: 100%;
				height: 100px;

				z-index: -1;

				#main-backdrop {
					position: absolute;
					left: 0px;
					bottom: 0px;
					width: 100%;
					height: 100px; // for easy scaling computation

					transform-origin: center bottom;
					transform: scaleY($contentScaling);
					background-color: $white;

					box-shadow: 0 5px 25px hsla(0, 0%, 0%, 20%);
					clip-path: inset(0px -25px -25px -25px); // show thru the shadow

					transition: transform $scalingTransition;

					z-index: 2;
				}

				#top-bar {
					position: absolute;
					bottom: 0px;
					left: 0px;
					width: 100%;
					height: 32px;

					transform: translateY(calc($contentHeight * -1 + 1px));
					transition: transform $scalingTransition;

					background-color: $white;
					border-radius: 32px 32px 0px 0px;

					box-shadow: 0 5px 25px hsla(0, 0%, 0%, 30%);

					z-index: 1;
				}

				#bottom-bar {
					position: absolute;
					bottom: -32px;
					left: 0px;
					width: 100%;
					height: 32px;

					background-color: $white;
					border-radius: 0px 0px 32px 32px;

					box-shadow: 0 5px 25px hsla(0, 0%, 0%, 20%);
					clip-path: inset(0px -25px -25px -25px);

					z-index: 2;
				}

				&.no-anim {
					#top-bar,
					#main-backdrop {
						transition: none;
					}
				}
			}
		}
	}
</style>
