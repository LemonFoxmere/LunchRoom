<script lang="ts">
	import Cookies from "js-cookie";

	export let accessTokenExist: boolean;

	const signOut = () => {
		// delete the access token cookie and redirect to the login page
		Cookies.remove("access_token");
		window.location.href = "/";
	};
</script>

{#if !accessTokenExist}
	<slot />
{:else}
	<main>
		<h1>You're already signed in.</h1>

		<section>
			<a href="/" class="plain">
				<button class="large solid">Return Home</button>
			</a>

			<button on:click={signOut} class="large text underlined">Logout</button>
		</section>
	</main>
{/if}

<style lang="scss">
    @import "$static/stylesheets/guideline";

    main {
        width: 100%;
        height: calc(100vh - 2 * $navbar-height);
        padding: 0 20px;
        box-sizing: border-box;

        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;

        section {
            margin-top: 28px;

            a {
                margin-right: 42px;
            }
        }

        @media screen and (max-width: $mobile-width) {
            height: calc(100vh - $urlbar-height - 2 * $navbar-height);

            section {
                width: 100%;
                flex-direction: column;
                margin-top: 60px;

                button {
                    width: 100%;
                    height: 46px;
                }

                a {
                    display: flex;
                    width: 100%;
                    margin-bottom: 12px;
                }
            }
        }
    }
</style>
