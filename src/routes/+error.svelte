<script lang="ts">
    import { page } from '$app/stores';
</script>

<main>
    {#if $page.status === 404}
        <h1>Sorry, but we couldn't find the content you're looking for.</h1>
    {:else}
        <h1>Sorry, but we couldn't process your request.</h1>
    {/if}

    <a href="/">
        <button>Return Home</button>
    </a>
</main>

<style lang="scss">
    @import "$static/stylesheets/guideline";

    main {
        position: absolute; top: 50%; left: 50%; transform: translate(-50%, calc(-50% + $navbar-height/2));
        width: 100vw; height: fit-content;
        display: flex; align-items: center; justify-content: center; flex-direction: column;

        h1{
            margin-bottom: 36pt;
            width: calc(100% - 100px); max-width: 600pt;
            text-align: center;
        }

        @media screen and (max-width: $mobile-width) {
            max-height: calc(100vh - $navbar-height - $urlbar-height);
        }
    }
</style>