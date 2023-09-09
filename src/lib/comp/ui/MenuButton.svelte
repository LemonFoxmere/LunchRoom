<script lang="ts">
	import { createEventDispatcher } from "svelte";
    
    export let opened: boolean;

    const disp = createEventDispatcher();
</script>

<button id="menu-btn" class="text" on:click={() => disp("click")}>
    <div class="bar {opened ? "close" : "open"}" id="bar-1"></div>
    <div class="bar {opened ? "close" : "open"}" id="bar-2"></div>
    <!-- <div class="bar {opened ? "close" : "open"}" id="bar-3"></div> -->
</button>

<style lang="scss">
    @import "$static/stylesheets/guideline";

    #menu-btn{
        width: 24pt; height: 24pt;
        display: flex; justify-content: flex-end; align-items: center;

        position:relative;

        .bar{
            width: 24pt; height: 3px;
            border-radius: 10px;
            position:absolute;
            background-color: $primary;

            transition: 400ms $out-cubic;
            transition-property: transform, opacity;

            &.open{
                &#bar-1{
                    transform: translateY(-4.5pt);
                }
                &#bar-2{
                    transform: translateY(4.5pt);
                }
            }

            &.close{
                &#bar-1{
                    transform: rotate(-45deg);
                }
                &#bar-2{
                    transform: rotate(45deg);
                }
            }
        }

        @media(hover: hover){ &:hover{
            .bar{
                background-color: $tertiary;
            }
        }}
    }
</style>