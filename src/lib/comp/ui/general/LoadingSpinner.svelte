<script lang="ts">
	export let unit: SpinnerTypes["unit"] = "px";
	export let duration: SpinnerTypes["duration"] = "1.5s";
	export let size: SpinnerTypes["size"] = "60";
	export let pause: SpinnerTypes["pause"] = false;

	type SpinnerTypes = {
		size: string | number;
		color: string;
		unit: string;
		duration: string;
		pause: boolean;
	};

	const durationUnitRegex = /[a-zA-Z]/;
	const range = (size: number, startAt = 0) => [...Array(size).keys()].map((i) => i + startAt);

	let durationUnit: string = duration.match(durationUnitRegex)?.[0] ?? "s";
	let durationNum: string = duration.replace(durationUnitRegex, "");
</script>

<div class="wrapper" style="--size: {size}{unit}; --duration: {duration};">
	<div class="spinner" class:pause-animation={pause}>
		{#each range(2, 0) as version}
			<div
				class="dot"
				class:pause-animation={pause}
				style="animation-delay: {version === 1
					? `${+durationNum / 2}${durationUnit}`
					: '0s'}; {version === 1 ? 'bottom: 0;' : ''} {version === 1 ? 'top: auto;' : ''}"
			/>
		{/each}
	</div>
</div>

<style lang="scss">
	@import "$static/stylesheets/guideline";

	.wrapper {
		height: var(--size);
		width: var(--size);
		display: flex;
		justify-content: center;
		align-items: center;

		position: relative;
	}
	.filter {
		width: 200%;
		height: 200%;
		position: absolute;
		z-index: 3;
	}
	.spinner {
		height: var(--size);
		width: var(--size);
		animation: rotate var(--duration) infinite linear;
	}
	.dot {
		width: 58%;
		height: 58%;
		display: inline-block;
		position: absolute;
		top: 0;
		background-color: $black;
		border-radius: 100%;
		animation: bounce var(--duration) infinite $out-generic;

		transform: scale(0.25);
	}
	.pause-animation {
		animation-play-state: paused;
	}

	@keyframes rotate {
		100% {
			transform: rotate(360deg);
		}
	}
	@keyframes bounce {
		0% {
			transform: scale(0.25);
			opacity: 50%;
		}
		40% {
			transform: scale(1);
			opacity: 100%;
		}
		100% {
			transform: scale(0.25);
			opacity: 50%;
		}
	}
</style>
