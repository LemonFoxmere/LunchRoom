<script lang="ts">
	import { createEventDispatcher } from "svelte";
	import ChevLeft from "../ui/icons/ChevLeft.svelte";
	const disp = createEventDispatcher();

	export let id: string = "";
	export let parentCtrlLevel: number; // The parent menu's level controller. Make sure this is binded in the parent
	export let menuLevel: number; // The current menu's level

	// for local submenu control
	export let localCtrlLevel: number = -1; // The current menu's level

	export let menuName: string = "";
	export let menuDescription: string = "";
	export let parentMenuName: string = "Cancel";
	export let menuTitleSpacing: number = 25;

	export let rootMenu: boolean = false;
	export let locked: boolean = false;

	const exitMenu = () => {
		if (locked) return;

		// dispatch event and reset parent control level
		disp("exit");
		parentCtrlLevel = -1;
	};

	$: if (parentCtrlLevel === menuLevel) disp("enter");

	// detect if we should hide or show the menu
	let mainContainer: HTMLElement;
	$: if (mainContainer) {
		if (parentCtrlLevel !== menuLevel) {
			mainContainer.classList.add("hidden-as-child");
		} else mainContainer.classList.remove("hidden-as-child");

		if (localCtrlLevel !== -1 && parentCtrlLevel === menuLevel) {
			mainContainer.classList.add("hidden-as-parent");
		} else mainContainer.classList.remove("hidden-as-parent");
	}
</script>

<main
	bind:this={mainContainer}
	{id}
	class="
        {parentCtrlLevel !== menuLevel ? 'hidden-as-child' : ''}
        {localCtrlLevel !== -1 && parentCtrlLevel === menuLevel ? 'hidden-as-parent' : ''}"
>
	<!-- Back button -->
	{#if !rootMenu}
		<button id="back" class="text {locked ? 'disabled' : ''}" on:click={exitMenu}>
			<ChevLeft s={20} />
			<p>{parentMenuName}</p>
		</button>
	{/if}

	<section id="menu-title-container" style="--spacing:{menuTitleSpacing}px">
		<h1 id="title">{menuName}</h1>
		{#if menuDescription}
			<p id="description">{menuDescription}</p>
		{/if}
	</section>

	<slot name="content" />
</main>

<slot name="submenus" />

<style lang="scss">
	@import "$static/stylesheets/guideline";

	main {
		display: flex;
		flex-direction: column;

		transition: 800ms $out-generic-expo;
		transition-property: opacity, transform;
		transition-delay: 150ms;

		padding: 32px 28px 32px 28px;

		&.hidden {
			position: fixed;
			width: 100%;
			height: fit-content;
			max-height: 100%;
			bottom: 0px;

			opacity: 0;
			transition: 400ms $out-generic-expo;
			transition-delay: 0ms;
			pointer-events: none;
		}

		&.hidden-as-child {
			@extend .hidden;
			transform: translateX(60px) scale(90%);
		}
		&.hidden-as-parent {
			@extend .hidden;
			transform: translateX(-60px) scale(90%);
		}

		#back {
			display: flex;
			align-items: center;
			column-gap: 5px;
			padding: 0px;

			color: $quaternary;

			width: fit-content;
			border-radius: 12px;
			padding: 10px;

			transform: translate(-10px, -10px);
			transition: opacity 500ms $out-generic-expo;

			&.disabled {
				opacity: 0.4;
				pointer-events: none;
			}

			p {
				font-size: 18px;
				color: inherit;
			}
		}

		#menu-title-container {
			$spacing: var(--spacing);
			margin-bottom: $spacing;

			display: flex;
			flex-direction: column;
			row-gap: 12px;

			#title {
				font-size: 32px;
				color: $black;
			}
		}
	}
</style>
