<script lang="ts">
	export let leftClickable: boolean;
	export let rightClickable: boolean;

	export let leftCallback: (e: MouseEvent) => void;
	export let rightCallback: (e: MouseEvent) => void;
</script>

<main>
	<button disabled={!leftClickable} id="left" class="text" type="reset" on:click={leftCallback}>
		<svg
			width="24px"
			height="24px"
			viewBox="0 0 24 24"
			xmlns="http://www.w3.org/2000/svg"
		>
			<g
				id="Icons"
				stroke="none"
				stroke-width="1"
				fill="none"
				fill-rule="evenodd"
				stroke-linecap="round"
				stroke-linejoin="round"
			>
				<g id="Icons-/-arrow-circle-right" stroke="currentColor" stroke-width="1.75">
					<path
						d="M12.875,15.4999998 L16.375,11.9999998 M16.375,11.9999998 L12.875,8.4999998 M16.375,11.9999998 L7.625,11.9999998 M22.5,12 C22.5,15.7512886 20.4987114,19.2176223 17.25,21.0932667 C14.0012887,22.9689111 9.99871128,22.9689111 6.74999995,21.0932667 C3.50128863,19.2176223 1.5,15.7512886 1.5,12 C1.5,6.20101001 6.20101021,1.5 12,1.5 C17.7989898,1.5 22.5,6.20101001 22.5,12 L22.5,12 Z"
						id="Shape"
						transform="translate(12, 12) scale(-1, 1) translate(-12, -12)"
					/>
				</g>
			</g>
		</svg>
	</button>

	<button disabled={!rightClickable} id="right" class="text" type="submit" on:click={rightCallback}>
		<svg
			width="24px"
			height="24px"
			viewBox="0 0 24 24"
			xmlns="http://www.w3.org/2000/svg"
		>
			<g
				id="Icons"
				stroke="none"
				stroke-width="1"
				fill="none"
				fill-rule="evenodd"
				stroke-linecap="round"
				stroke-linejoin="round"
			>
				<g id="Icons-/-arrow-circle-right" stroke="currentColor" stroke-width="1.75">
					<path
						d="M12.875,15.4999998 L16.375,11.9999998 M16.375,11.9999998 L12.875,8.4999998 M16.375,11.9999998 L7.625,11.9999998 M22.5,12 C22.5,15.7512886 20.4987114,19.2176223 17.25,21.0932667 C14.0012887,22.9689111 9.99871128,22.9689111 6.74999995,21.0932667 C3.50128863,19.2176223 1.5,15.7512886 1.5,12 C1.5,6.20101001 6.20101021,1.5 12,1.5 C17.7989898,1.5 22.5,6.20101001 22.5,12 L22.5,12 Z"
						id="Shape"
					/>
				</g>
			</g>
		</svg>
	</button>
</main>

<style lang="scss">
    @import "$static/stylesheets/guideline";

    button {
        width: 24px;
        height: 24px;
        border-radius: 24px;

        opacity: 1;

        transition: opacity 250ms ease-in-out;

        &#left {
            margin-right: 36px;
        }

        &:disabled {
            opacity: 0.5;
            color: $tertiary;
            pointer-events: none;
        }
    }
</style>
