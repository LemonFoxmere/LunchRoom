<script lang="ts">
	import Lock from "$lib/comp/ui/icons/Lock.svelte";
	import type { Session } from "@supabase/supabase-js";
	import Dollar from "../../icons/Dollar.svelte";
	import User from "../../icons/User.svelte";
	import ChevLeft from "./../../icons/ChevLeft.svelte";
	import Pen from "./../../icons/Pen.svelte";

	let sectionLvl = 2;

	export let session: Session;
	export let user: AppUser;
</script>

<main>
	<!-- The main menu -->
	<section id="main-menu" class="section {sectionLvl === 0 ? '' : 'hidden'}">
		<h1 class="section-titles">Settings</h1>

		<section id="cta">
			<!-- Account Settings -->
			<button class="cta-item text" on:click={() => (sectionLvl = 1)}>
				<Lock />
				<p>Account</p>
			</button>

			<!-- Profile Settings -->
			<button class="cta-item text" on:click={() => (sectionLvl = 2)}>
				<User />
				<p>Profile</p>
			</button>

			<!-- Payment Settings -->
			<button class="cta-item text" on:click={() => (sectionLvl = 3)}>
				<Dollar />
				<p>Payment & Monetization</p>
			</button>
		</section>
	</section>

	<!-- The submenus -->
	<section id="account" class="section {sectionLvl === 1 ? '' : 'hidden'}">
		<!-- Back button -->
		<button id="back" class="text" on:click={() => (sectionLvl = 0)}>
			<ChevLeft s={20} />
			<p>Settings</p>
		</button>

		<h1 class="section-titles">Account</h1>

		<section id="cta">
			<!-- Account Email -->
			<section class="setting-container" id="handle">
				<section id="information">
					<p class="label-text">Email</p>
					<p class="value-text">{session.user.email}</p>
				</section>
			</section>

			<!-- Handle (if there is any) -->
			<section class="setting-container" id="handle">
				<section id="information">
					<p class="label-text">Handle</p>
					<p class="value-text">{user.account.handle ?? "Not Set"}</p>
				</section>

				<button class="text" id="edit"><Pen /></button>
			</section>
		</section>
	</section>

	<section id="profile" class="section {sectionLvl === 2 ? '' : 'hidden'}">
		<!-- Back button -->
		<button id="back" class="text" on:click={() => (sectionLvl = 0)}>
			<ChevLeft s={20} />
			<p>Settings</p>
		</button>

		<h1 class="section-titles">Profile</h1>

		<section id="cta">
			<!-- Handle (if there is any) -->
			<section class="setting-container" id="handle">
				<section id="information">
					<p class="label-text">Display Name</p>
					<p class="value-text">{user.account.name ?? "Not Set"}</p>
				</section>

				<button class="text" id="edit"><Pen /></button>
			</section>

			<!-- Handle (if there is any) -->
			<section class="setting-container" id="handle">
				<section id="information">
					<p class="label-text">Bio</p>
					<p class="value-text">
						{user.profile.bio ?? "Describe your quirkiness"}
					</p>
				</section>

				<button class="text" id="edit"><Pen /></button>
			</section>
		</section>
	</section>

	<section id="payment" class="section {sectionLvl === 3 ? '' : 'hidden'}">
		<!-- Back button -->
		<button id="back" class="text" on:click={() => (sectionLvl = 0)}>
			<ChevLeft s={20} />
			<p>Settings</p>
		</button>

		<h1 class="section-titles">Payment & Monetization</h1>

		<section id="cta">
			<p>
				Autem ullam inventore error in explicabo earum a blanditiis magni aspernatur temporibus
				laborum accusamus placeat mollitia reiciendis iste iusto eaque, corrupti numquam minus?
				Inventore quis rem voluptate mollitia tempore hic aliquam cumque in rerum unde enim iusto
				omnis a ullam facere adipisci earum pariatur incidunt deleniti harum, illo deserunt tempora
				veniam! Animi ea inventore ut.
			</p>
		</section>
	</section>
</main>

<style lang="scss">
	@import "$static/stylesheets/guideline";

	main {
		position: relative;
		width: 100%;
		height: 100%;

		.section {
			display: flex;
			flex-direction: column;

			transition: 800ms $out-generic-expo;
			transition-property: opacity, transform;
			transition-delay: 150ms;

			&.hidden {
				position: absolute;
				width: 100%;
				bottom: 0px;

				opacity: 0;
				transform: translateX(60px) scale(90%);
				transition: 400ms $out-generic-expo;
				transition-delay: 0ms;

				pointer-events: none;

				&#main-menu {
					transform: translateX(-60px) scale(90%);
				}
			}

			#back {
				display: flex;
				align-items: center;
				column-gap: 5px;

				margin-bottom: 20px;
				padding: 0px;

				color: $quaternary;

				p {
					font-size: 18px;
					color: inherit;
				}
			}

			.section-titles {
				font-size: 32px;
				color: $black;

				margin-bottom: 32px;
			}

			#cta {
				display: flex;
				flex-direction: column;
				row-gap: 25px;

				.setting-container {
					display: flex;
					justify-content: space-between;
					align-items: center;

					column-gap: 25px;

					#information {
						display: flex;
						flex-direction: column;
						row-gap: 3px;

						.label-text {
							font-weight: 700;
							font-size: 18px;
							color: $primary;
						}

						.value-text {
							font-size: 16px;
							color: $tertiary;
						}
					}

					#edit {
						width: 42px;
						height: 42px;
						min-width: 42px;
						min-height: 42px;
						color: $secondary;

						display: flex;
						justify-content: center;
						align-items: center;

						border-radius: 100px;
					}
				}

				.cta-item {
					color: $secondary;
					display: flex;
					align-items: center;
					column-gap: 15px;

					padding: 5px 0px;

					p {
						font-size: 18px;
						color: inherit;
					}
				}
			}
		}
	}
</style>
