<script lang="ts">
	export let s: number = 22;
</script>

<svg style="--s: {s}px;" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5px">
	<path
		stroke-linecap="round"
		stroke-linejoin="round"
		d="M8.25 9V5.25A2.25 2.25 0 0 1 10.5 3h6a2.25 2.25 0 0 1 2.25 2.25v13.5A2.25 2.25 0 0 1 16.5 21h-6a2.25 2.25 0 0 1-2.25-2.25V15m-3 0-3-3m0 0 3-3m-3 3H15"
	/>
</svg>

<style lang="scss">
	$s: var(--s);

	svg {
		width: $s;
		height: $s;
		color: inherit;
	}
</style>
