<script lang="ts">
	import LoadingSpinner from "$lib/comp/ui/general/LoadingSpinner.svelte";
	import type { uniqueSignupProcessStatus } from "$route/signup/+page.svelte";
    import { createEventDispatcher } from "svelte";
    const disp = createEventDispatcher();

    export let nameValue: string;
    export let status: uniqueSignupProcessStatus;

    export let input: HTMLInputElement;
    export let value: string;

    const oninput = () => { disp("input") }
</script>

<h1>Hey {nameValue?.split(" ")[0] ?? ""}! Let's get you a handle.</h1>
            
<div>
    <input bind:this={input} bind:value={value} on:input={oninput} type="text" class="large hide-placeholder" placeholder="Tiny Sable"/>

    <p id="input-decorator" class="no-drag">@</p>
</div>

<div id="message-container">
    {#if status.state !== null}
        {#if status.state === "checking"}
            <LoadingSpinner/>
        {:else}
            <h6 class={status.state}>{status.message}</h6>
        {/if}
    {/if}
</div>

<style lang="scss">
    @import "$static/stylesheets/guideline";
    
    h1{
        margin-bottom: 28px;
        white-space: nowrap;
    }
    
    div{
        width: 100%; height: fit-content;
        position: relative;

        display: flex; justify-content: center; align-items: center;
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
    #input-decorator{
        position: absolute; left: 13.5px;
        font-size: 22px;
        font-weight: 400;

        transform: translateY(-1.65px);
    }

    #message-container{
        position: absolute; bottom: -130px;
        display: flex; justify-content: center; align-items: center;

        h6{
            font-size: 16px;
            position: relative;
        }

        .failed{
            color: $red;
        }
        .success{
            color: $green;
        }
    }
</style>