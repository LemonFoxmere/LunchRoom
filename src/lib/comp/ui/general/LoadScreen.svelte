<script lang="ts">
	import LoadingSpinner from "./LoadingSpinner.svelte";
</script>

<main>
	<LoadingSpinner size="80" />
</main>

<style lang="scss">
	@import "$static/stylesheets/guideline";

	main {
		position: fixed;
		top: 0;
		left: 0;
		z-index: 100;

		width: 100%;
		height: 100%;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;

		background-color: $white;
	}
</style>
