<script lang="ts">
	import ProfileCard from "./../../lib/comp/profile/ProfileCard.svelte";
</script>

<main>
	<ProfileCard />
</main>

<style lang="scss">
	@import "$static/stylesheets/guideline";

	main {
		width: 100%;
		max-width: 1400px;

		padding: 0 20px;
		box-sizing: border-box;

		display: flex;
		justify-content: center;
		align-items: center;
	}
</style>
