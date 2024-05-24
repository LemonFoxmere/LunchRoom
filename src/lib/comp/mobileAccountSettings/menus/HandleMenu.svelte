<script lang="ts">
	import At from "$lib/comp/ui/icons/At.svelte";
	import Menu from "../Menu.svelte";

	export let parentCtrlLevel: number;
	export let currentHandle: string | null | undefined;
	export let menuLevel: number;

	let newHandle: string | null | undefined;

	const resetMenu = () => {};
</script>

<main>
	<Menu
		id="edit-handle"
		menuName="Edit Handle"
		bind:parentCtrlLevel
		{menuLevel}
		on:enter={resetMenu}
	>
		<section id="content" slot="content">
			<h6 id="caption">New handle:</h6>

			<div id="input-field">
				<div id="icon">
					<At s={20} />
				</div>
				<input type="text" value={currentHandle ?? ""} placeholder="Not Set" />
			</div>

			<section id="requirement">
				<p id="title">Your handle must:</p>

				<section id="lights">
					<div class="req">
						<div id="status" class="fulfilled" />
						<p id="message">Be between 3 and 20 characters</p>
					</div>

					<div class="req">
						<div id="status" class="" />
						<p id="message">Not contain any spaces or symbols</p>
					</div>
				</section>
			</section>

			<section id="submit">
				<button id="save" class="solid" on:click={() => (parentCtrlLevel = 0)}>Save</button>
			</section>

			<p id="note">
				Note: You must have a registered handle for a valid artist profile. Removing your
				handle will automatically disable any active artist profiles.
			</p>
		</section>
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
		#input-field {
			position: relative;
			width: 100%;
			height: 48px;
			display: flex;
			align-items: center;

			margin-bottom: 22px;

			#icon {
				position: absolute;
				transform: translateY(2px);
				left: 13px;
				color: $tertiary;
			}

			input {
				width: 100%;
				height: 100%;

				padding-left: 40px;
				padding-bottom: 2px;
			}
		}

		#requirement {
			display: flex;
			flex-direction: column;
			row-gap: 12px;

			#title {
				color: $primary;
			}

			#lights {
				display: flex;
				flex-direction: column;
				row-gap: 5px;

				.req {
					display: flex;
					align-items: center;
					column-gap: 12px;

					#status {
						height: 8px;
						width: 8px;

						background-color: $quaternary;
						border-radius: 100%;

						&.fulfilled {
							background-color: $green;
						}
					}
				}
			}
		}

		#submit {
			width: 100%;
			height: 50px;

			margin-top: 30px;

			button {
				width: 100%;
				height: 100%;
			}
		}

		#note {
			color: $quaternary;

			margin-top: 20px;

			width: 100%;
			text-align: center;
			font-size: 14px;
			line-height: 16px;
			font-style: italic;
		}
	}
</style>
