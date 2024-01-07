<script lang="ts">
	import DefaultBar from "./bars/DefaultBar.svelte";

	export let mobile: boolean;

	export let signedOut: boolean;
</script>

<main>
	<DefaultBar {signedOut} {mobile} />
</main>

<style lang="scss">
	@import "$static/stylesheets/guideline";
</style>
