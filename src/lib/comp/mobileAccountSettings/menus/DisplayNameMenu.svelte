<script lang="ts">
	import { enhance } from "$app/forms";
	import LoadingDots from "$lib/comp/ui/general/LoadingDots.svelte";
	import Checkmark from "$lib/comp/ui/icons/Checkmark.svelte";
	import type { SubmitFunction } from "@sveltejs/kit";
	import Menu from "../Menu.svelte";

	export let parentCtrlLevel: number;
	export let currentName: string | null | undefined; // Bound in parent
	export let menuLevel: number;

	let newName: string | null | undefined;
	$: newName = currentName;

	// Validation states
	$: nameLengthValid = newName && newName.trim().length < 50;
	$: nameUpdatable = newName && newName.trim() !== currentName;
	$: nameValid = newName && newName.trim() && nameLengthValid && nameUpdatable;

	let displayMsg: string;
	let errorMsg: string | null = null;

	// Dynamically update the error message
	$: if (errorMsg) {
		displayMsg = errorMsg;
	} else {
		if (!nameValid) {
			if (!newName || !newName.trim()) displayMsg = "You can't be nameless";
			else if (!nameUpdatable) displayMsg = "Save";
			else displayMsg = "That's way too long";
		} else {
			displayMsg = ""; // No issue
		}
	}

	// Menu UI controls
	let menuLocked = false;
	let saving = false;
	let saved = false;

	// Reset menu state with optional delay
	const resetMenu = (timeout: number = 0) => {
		setTimeout(() => {
			newName = currentName; // Reset buffer name
			displayMsg = "";
			saving = false;
			saved = false;
		}, timeout);
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

			// Update current name on success
			currentName = newName;
			if (currentName) currentName = currentName.trim();
			if (!currentName) currentName = null;
			saved = true;

			// Reset menu after a delay
			setTimeout(() => {
				parentCtrlLevel = -1;
				resetMenu(300);
			}, 700);
		};
	};
</script>

<main>
	<Menu
		id="edit-handle"
		menuName="Edit Display Name"
		menuDescription="This is the name that everyone will see."
		bind:parentCtrlLevel
		locked={menuLocked}
		{menuLevel}
		on:exit={() => resetMenu(400)}
	>
		<form id="content" slot="content" method="POST" use:enhance={saveChange}>
			<h6 id="caption">New name:</h6>

			<input id="input" type="text" name="value" placeholder="Not Set" bind:value={newName} />

			<section id="submit">
				<button
					id="save"
					class="solid {nameValid ? '' : 'disabled'}"
					type="submit"
					formaction="?/updateUser&s=users&f=name"
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
			width: 100%;
			height: 48px;
			padding-left: 16px;
			padding-bottom: 1px;
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
