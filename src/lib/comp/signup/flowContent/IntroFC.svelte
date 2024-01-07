<script lang="ts">
	export let contentHeight: number;
</script>

<main bind:clientHeight={contentHeight}>
	<h1>Welcome to LunchRoom!</h1>
	<p>Click the right arrow to start creating your account.</p>
</main>

<a id="signin" href="/signin"> Nevermind, I already have an account </a>

<style lang="scss">
    @import "$static/stylesheets/guideline";

    main {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;

        h1 {
            margin-bottom: 10px;
            text-align: center;
        }

        p {
            text-align: center;
            font-size: 16px;
        }

        @media screen and (max-width: $mobile-width) {
            h1 {
                font-size: 32px;
            }
            p {
                font-size: 14px;
            }
        }
    }

    #signin {
        position: absolute;
        // we have to do this weird shit instead of just setting a bottom cuz of how the parent is structured
        //transform: translateY(calc(100vh / 2 - 50% - 24px));

        bottom: 4px;

        text-align: center;

        font-size: 16px;
        font-weight: 400;
        color: $quaternary;
    }
</style>
