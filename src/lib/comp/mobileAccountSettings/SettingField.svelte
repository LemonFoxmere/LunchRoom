<script lang="ts">
	import { createEventDispatcher } from "svelte";
	const disp = createEventDispatcher();

	import Pen from "../ui/icons/Pen.svelte";

	export let name: string;
	export let currentValue: string | null | undefined;
	export let defaultValue: string = "Not Set";
	export let editable: boolean = true;

	// export let buttonText: string | null = null;

	const edit = () => {
		disp("edit");
	};
</script>

<main>
	<section id="information">
		<p class="label-text">{name}</p>
		<p class="value-text">{currentValue ?? defaultValue}</p>
	</section>

	{#if editable}
		<button class="text" id="edit" on:click={edit}><Pen /></button>
	{/if}
</main>

<style lang="scss">
	@import "$static/stylesheets/guideline";

	main {
		display: flex;
		justify-content: space-between;
		align-items: center;

		column-gap: 25px;

		#information {
			display: flex;
			flex-direction: column;
			row-gap: 3px;

			.label-text {
				font-weight: 700;
				font-size: 18px;
				color: $primary;
			}

			.value-text {
				font-size: 16px;
				color: $tertiary;
			}
		}

		#edit {
			width: 42px;
			height: 42px;
			min-width: 42px;
			min-height: 42px;
			color: $secondary;

			display: flex;
			justify-content: center;
			align-items: center;

			border-radius: 100px;
		}
	}
</style>
