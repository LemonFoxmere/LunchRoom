<script lang="ts" context="module">
	interface menuItems {
		content: string;
		callback?: () => void;
		href?: string;
		formAction?: string;
	}
</script>

<script lang="ts">
	export let shown: boolean = true;
	export let menuItems: menuItems[] = [];
</script>

<main>
	<div id="cta">
		<slot />
	</div>

	<form id="menu-background" class={shown ? "" : "hidden"} method="post">
		{#each menuItems as item, i (i)}
			<a class="menu-item" href={item.href}>
				<button class="text" on:click={item.callback} formaction={item.formAction}>
					{item.content}
				</button>
			</a>
			{#if i < menuItems.length - 1}
				<hr />
			{/if}
		{/each}
	</form>
</main>

<style lang="scss">
	@import "$static/stylesheets/guideline";

	main {
		width: 100%;
		height: 100%;
		position: relative;
		display: flex;

		#cta {
			width: fit-content;
			height: fit-content;
		}

		#menu-background {
			@extend .glass-heavy;

			position: absolute;
			right: 0px;
			top: calc(100% + 10px);
			z-index: 100;

			padding: 3px 20px;
			border-radius: 12px;
			box-shadow: 6px 6px 24px hsla(0, 0%, 0%, 20%);
			width: max-content;
			max-width: 500px;

			display: flex;
			flex-direction: column;
			justify-content: flex-end;

			transform: translateY(0px);
			filter: blur(0px);

			transition:
				opacity 200ms linear,
				transform 700ms $out-cubic,
				filter 300ms $out-cubic;

			&.hidden {
				pointer-events: none;
				opacity: 0;
				transform: translateY(-10px);
				filter: blur(10px);

				transition:
					opacity 200ms linear,
					transform 250ms $in-cubic,
					filter 400ms $in-cubic;
			}

			hr {
				width: 100%;
				height: 1px;
				border: none;
				background-color: hsla(0, 0%, 0%, 20%);

				margin: 0px;
				padding: 0px;
				border-radius: 0px;
			}

			.menu-item {
				text-decoration: none;
				width: 100%;

				button {
					width: 100%;
					height: 100%;
					text-align: right;
					color: $tertiary;

					padding: 15px 0px 15px 15px;
					border-radius: 0px;

					@media (hover: hover) {
						&:hover {
							color: $quaternary;
						}
					}
				}
			}
		}
	}
</style>
