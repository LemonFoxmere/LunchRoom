<script lang="ts">
	import ChevLeft from "../ui/icons/ChevLeft.svelte";

	export let id: string = "";
	export let parentCtrlLevel: number; // The parent menu's level controller. Make sure this is binded in the parent
	export let menuLevel: number; // The current menu's level

	// for local submenu control
	export let localCtrlLevel: number = -1; // The current menu's level

	export let menuName: string = "";
	export let parentMenuName: string = "Cancel";
	export let menuTitleSpacing: number = 25;

	export let rootMenu: boolean = false;
</script>

<main
	{id}
	class="
        {parentCtrlLevel !== menuLevel ? 'hidden-as-child' : ''}
        {localCtrlLevel !== -1 && parentCtrlLevel === menuLevel ? 'hidden-as-parent' : ''}"
>
	<!-- Back button -->
	{#if !rootMenu}
		<button id="back" class="text" on:click={() => (parentCtrlLevel = -1)}>
			<ChevLeft s={20} />
			<p>{parentMenuName}</p>
		</button>
	{/if}

	<h1 id="menu-title" style="--spacing:{menuTitleSpacing}px">{menuName}</h1>

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

		&.hidden {
			position: absolute;
			width: 100%;
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

			margin-bottom: 20px;
			padding: 0px;

			color: $quaternary;

			p {
				font-size: 18px;
				color: inherit;
			}
		}

		#menu-title {
			$spacing: var(--spacing);

			font-size: 32px;
			color: $black;

			margin-bottom: $spacing;
		}
	}
</style>
