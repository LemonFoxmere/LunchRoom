<script lang="ts">
	export let menuName: string;
	export let parentCtrlLevel: number = -1;
	export let targetLevel: number = -1;
</script>

<!-- Account Settings -->
<button class="text" on:click={() => (parentCtrlLevel = targetLevel)}>
	<slot name="icon" />
	<p id="text">{menuName}</p>
</button>

<style lang="scss">
	@import "$static/stylesheets/guideline";

	button {
		color: $secondary;
		display: flex;
		align-items: center;
		column-gap: 15px;

		padding: 5px 0px;

		#text {
			font-size: 18px;
			color: inherit;
		}
	}
</style>
