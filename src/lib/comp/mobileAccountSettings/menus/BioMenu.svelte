<script lang="ts">
	import { enhance } from "$app/forms";
	import LoadingDots from "$lib/comp/ui/general/LoadingDots.svelte";
	import Checkmark from "$lib/comp/ui/icons/Checkmark.svelte";
	import type { SubmitFunction } from "@sveltejs/kit";
	import Menu from "../Menu.svelte";

	export let parentCtrlLevel: number;
	export let menuLevel: number;
	export let currentBio: string | null | undefined;

	let newBio: string | null | undefined;
	$: newBio = currentBio;

	// Validation states
	$: bioLengthValid = `${newBio?.trim() ?? ""}`.length < 200;
	$: bioDifferent = (newBio?.trim() ?? "") !== currentBio;
	$: bioValid = bioLengthValid && bioDifferent;

	console.log((newBio?.trim() ?? "") !== currentBio);

	let displayMsg: string;
	let errorMsg: string | null = null;

	// Dynamically update the error message
	$: if (errorMsg) {
		displayMsg = errorMsg;
	} else {
		if (!bioValid) {
			if (!bioLengthValid) {
				displayMsg = "That's way too long";
			} else {
				displayMsg = "";
			}
		} else {
			displayMsg = ""; // No issue
		}
	}

	let textarea: HTMLTextAreaElement;

	// Function to auto-resize the textarea
	const autoresize = () => {
		textarea.style.height = ""; // Reset the height
		textarea.style.height = Math.min(textarea.scrollHeight, 200) + "px";
		if (textarea.scrollHeight > 200) {
			textarea.style.touchAction = "pan-y";
		} else {
			textarea.style.touchAction = "none";
		}
	};

	// Menu UI controls
	let menuLocked = false;
	let saving = false;
	let saved = false;

	// Function to reset menu state
	const resetMenu = () => {
		newBio = currentBio; // Reset buffer name
		errorMsg = "";
		saving = false;
		saved = false;

		setTimeout(() => {
			autoresize(); // Auto-resize the textarea after the text has been updated
		});
	};

	// Save change submit function
	const saveChange: SubmitFunction = () => {
		menuLocked = true; // Lock menu
		saving = true; // Set saving state
		errorMsg = null; // Clear previous error messages

		return async ({ result }) => {
			if (result.type === "failure") {
				// Handle failure
				errorMsg = "Something went wrong. Please try again later.";
				menuLocked = false;
				saved = false;
				saving = false;
				return;
			}

			// Update current bio on success
			currentBio = newBio;
			if (currentBio) currentBio = currentBio.trim(); // Trim whitespace
			if (!currentBio) currentBio = null; // Save null if there's nothing left
			saved = true;

			// Return to previous menu after a delay
			setTimeout(() => {
				parentCtrlLevel = -1;
			}, 700);
		};
	};
</script>

<main>
	<Menu
		id="edit-handle"
		menuName="Edit Bio"
		menuDescription="Tell a little bit about yourself!"
		bind:parentCtrlLevel
		{menuLevel}
		on:enter={resetMenu}
	>
		<form id="content" slot="content" method="POST" use:enhance={saveChange}>
			<h6 id="caption">Bio:</h6>

			<textarea
				bind:this={textarea}
				bind:value={newBio}
				on:input={autoresize}
				name="value"
				id="input"
				placeholder="Not Set"
			></textarea>

			<section id="submit">
				<button
					id="save"
					class="solid {bioValid ? '' : 'disabled'}"
					type="submit"
					formaction="?/updateUser&s=profile&f=bio"
				>
					{#if !saved && !saving}
						{displayMsg ? displayMsg : "Save"}
					{:else if !saved}
						<LoadingDots />
					{:else}
						<Checkmark s={28} />
					{/if}
				</button>
			</section>
		</form>
	</Menu>
</main>

<style lang="scss">
	@import "$static/stylesheets/guideline";

	#content {
		display: flex;
		flex-direction: column;

		#caption {
			font-weight: 600;
			margin-bottom: 10px;
			color: $black;
		}

		#input {
			@extend input;

			width: 100%;
			height: 48px;
			resize: none;
			padding-left: 18px;
			padding-top: 12px;
			padding-bottom: 12px;
			touch-action: none;
			overscroll-behavior: contain;
		}

		#submit {
			width: 100%;
			height: 50px;
			margin-top: 36px;

			button {
				width: 100%;
				height: 100%;
				display: flex;
				justify-content: center;
				align-items: center;
				transition: opacity 500ms $out-generic-expo;

				&.disabled {
					opacity: 0.3;
					pointer-events: none;
					touch-action: none;
				}
			}
		}
	}
</style>
