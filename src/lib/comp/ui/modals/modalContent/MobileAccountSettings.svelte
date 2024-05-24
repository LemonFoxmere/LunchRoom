<script lang="ts">
	import Menu from "$lib/comp/mobileAccountSettings/Menu.svelte";
	import SettingField from "$lib/comp/mobileAccountSettings/SettingField.svelte";
	import SubmenuField from "$lib/comp/mobileAccountSettings/SubmenuField.svelte";
	import BioMenu from "$lib/comp/mobileAccountSettings/menus/BioMenu.svelte";
	import DisplayNameMenu from "$lib/comp/mobileAccountSettings/menus/DisplayNameMenu.svelte";
	import HandleMenu from "$lib/comp/mobileAccountSettings/menus/HandleMenu.svelte";
	import { user } from "$lib/objects/user";
	import type { Session } from "@supabase/supabase-js";
	import Dollar from "../../icons/Dollar.svelte";
	import Lock from "../../icons/Lock.svelte";
	import User from "../../icons/User.svelte";

	let settingLvl = 0;
	let accountLvl = 0;
	let profileLvl = -1;

	export let session: Session;
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
						bind:currentValue={$user.account.handle}
						on:edit={() => (accountLvl = 0)}
					/>
				</section>

				<!-- submenus -->
				<section slot="submenus">
					<!-- Editing handle menu -->
					<HandleMenu
						bind:currentHandle={$user.account.handle}
						bind:parentCtrlLevel={accountLvl}
						menuLevel={0}
					/>
				</section>
			</Menu>

			<!-- Profile submenu -->
			<Menu
				id="profile"
				menuName="Profile"
				bind:parentCtrlLevel={settingLvl}
				bind:localCtrlLevel={profileLvl}
				menuLevel={1}
			>
				<!-- Profile menu options -->
				<section class="menu-cta-container" slot="content">
					<!-- Display name -->
					<SettingField
						name="Display Name"
						currentValue={$user.account.name}
						on:edit={() => (profileLvl = 0)}
					/>
					<!-- Bio -->
					<SettingField
						name="Bio"
						defaultValue={"Tell a bit about yourself"}
						currentValue={$user.profile.bio}
						on:edit={() => (profileLvl = 1)}
					/>
				</section>

				<section slot="submenus">
					<!-- Editing display name menu -->
					<DisplayNameMenu
						bind:currentName={$user.account.name}
						bind:parentCtrlLevel={profileLvl}
						menuLevel={0}
					/>
					<!-- Editing bio menu -->
					<BioMenu
						bind:currentBio={$user.profile.bio}
						bind:parentCtrlLevel={profileLvl}
						menuLevel={1}
					/>
				</section>
			</Menu>

			<!-- Payment submenu -->
			<Menu
				id="payment"
				menuName="Payment & Monetization"
				bind:parentCtrlLevel={settingLvl}
				menuLevel={2}
			>
				<section slot="content">
					<img
						src="https://media.discordapp.net/attachments/1162659762043891732/1242190410361733301/396FCA95-16D5-4303-A69D-8EB0668752B4_1_102_o.jpeg?ex=664e40f8&is=664cef78&hm=fdbce0054766b95ac2941ae0910f3462df44d3e8f2d1402b9b03279570653c73&=&format=webp&width=1302&height=1302"
						style="width: 100%; border-radius: 10px"
						alt=""
					/>
				</section>
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
