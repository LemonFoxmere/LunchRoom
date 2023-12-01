<script lang="ts">
    export let input: HTMLInputElement;
    export let value: string;
</script>

<h1>First, what's your name?</h1>
<input bind:this={input} bind:value={value} type="text" class="large hide-placeholder" placeholder="Tiny Sable"/>

<style lang="scss">
    @import "$static/stylesheets/guideline";
    
    h1{
        margin-bottom: 28px;
        white-space: nowrap;
    }

    input{
        width: 100%;
        text-align: center;
        transition: opacity 700ms ease-in-out, transform 700ms $out-generic;

        &::-webkit-contacts-auto-fill-button {
            visibility: hidden;
            display: none !important;
            pointer-events: none;
            width: 0px !important;
            margin: 0px !important;
        }
    }
</style>