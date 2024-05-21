<script lang="ts">
	import Menu from "$lib/comp/mobileAccountSettings/Menu.svelte";
	import SettingField from "$lib/comp/mobileAccountSettings/SettingField.svelte";
	import SubmenuField from "$lib/comp/mobileAccountSettings/SubmenuField.svelte";
	import HandleMenu from "$lib/comp/mobileAccountSettings/menus/HandleMenu.svelte";
	import type { Session } from "@supabase/supabase-js";
	import Dollar from "../../icons/Dollar.svelte";
	import Lock from "../../icons/Lock.svelte";
	import User from "../../icons/User.svelte";

	let settingLvl = -1;
	let accountLvl = -1;

	export let session: Session;
	export let user: AppUser;
</script>

<main>
	<!-- The main menu -->
	<Menu
		id="account"
		menuName="Settings"
		menuTitleSpacing={32}
		bind:localCtrlLevel={settingLvl}
		parentCtrlLevel={0}
		menuLevel={0}
		rootMenu={true}
	>
		<!-- menu items -->
		<section class="menu-cta-container wide" slot="content">
			<!-- Account Settings -->
			<SubmenuField menuName="Account" targetLevel={0} bind:parentCtrlLevel={settingLvl}>
				<Lock slot="icon" />
			</SubmenuField>

			<!-- Profile Settings -->
			<SubmenuField menuName="Profile" targetLevel={1} bind:parentCtrlLevel={settingLvl}>
				<User slot="icon" />
			</SubmenuField>

			<!-- Payment Settings -->
			<SubmenuField
				menuName="Payment & Monetization"
				targetLevel={2}
				bind:parentCtrlLevel={settingLvl}
			>
				<Dollar slot="icon" />
			</SubmenuField>
		</section>

		<!-- submenus -->
		<section slot="submenus">
			<!-- Account submenu -->
			<Menu
				id="account"
				menuName="Account"
				parentMenuName="Settings"
				bind:parentCtrlLevel={settingLvl}
				bind:localCtrlLevel={accountLvl}
				menuLevel={0}
			>
				<!-- Account menu options -->
				<section class="menu-cta-container" slot="content">
					<!-- Account Email -->
					<SettingField name="Email" currentValue={session.user.email} editable={false} />
					<!-- Handle -->
					<SettingField
						name="Handle"
						currentValue={user.account.handle}
						on:edit={() => (accountLvl = 0)}
					/>
				</section>

				<!-- submenus -->
				<section slot="submenus">
					<!-- Editing handle menu -->
					<HandleMenu bind:parentCtrlLevel={accountLvl} currentHandle={user.account.handle} />
				</section>
			</Menu>

			<!-- Profile submenu -->
			<Menu id="profile" menuName="Profile" bind:parentCtrlLevel={settingLvl} menuLevel={1}>
				<!-- Display name -->
				<SettingField name="Display Name" currentValue={user.account.name} />
				<!-- Bio -->
				<SettingField
					name="Bio"
					currentValue={user.profile.bio}
					defaultValue={"Tell a bit about yourself"}
				/>
			</Menu>

			<!-- Payment submenu -->
			<Menu
				id="payment"
				menuName="Payment & Monetization"
				bind:parentCtrlLevel={settingLvl}
				menuLevel={2}
			>
				<p>
					Autem ullam inventore error in explicabo earum a blanditiis magni aspernatur temporibus
					laborum accusamus placeat mollitia reiciendis iste iusto eaque, corrupti numquam minus?
					Inventore quis rem voluptate mollitia tempore hic aliquam cumque in rerum unde enim iusto
					omnis a ullam facere adipisci earum pariatur incidunt deleniti harum, illo deserunt
					tempora veniam! Animi ea inventore ut.
				</p>
			</Menu>
		</section>
	</Menu>
</main>

<style lang="scss">
	@import "$static/stylesheets/guideline";

	main {
		position: relative;
		width: 100%;
		height: 100%;

		.menu-cta-container {
			display: flex;
			flex-direction: column;
			row-gap: 25px;

			&.wide {
				row-gap: 35px;
			}
		}

		#main-menu {
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
				transform: translateX(-60px) scale(90%);
				transition: 400ms $out-generic-expo;
				transition-delay: 0ms;

				pointer-events: none;
			}

			#title {
				font-size: 32px;
				color: $black;

				margin-bottom: 32px;
			}

			#cta {
				display: flex;
				flex-direction: column;
				row-gap: 25px;

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
