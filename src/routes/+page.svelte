<script lang="ts">
	import { onMount } from "svelte";
	import type { PageData } from "./$types";

    export let data: PageData;
</script>

<main>
    <div id="frontpage">
        <section id="title">
            <h1>YCH</h1>
            <h3><em>Noun:</em> Your Commission Here</h3>
        </section>
        
        <section id="cta">
            {#if !data.accessToken}
                <a href="/signup">
                    <button>Sign Up</button>
                </a>
                <button class="text">What?</button>
            {:else}
                <button>View Profile</button>
            {/if}
        </section>
    </div>
</main>

<style lang="scss">
    @import "$static/stylesheets/guideline";

    main{
        width: 100%; height: fit-content;
        display: flex; justify-content: center; align-items: center; flex-direction: column;
        box-sizing: border-box;

        #frontpage{
            width: 100%; height: calc(100vh - 2*$navbar-height);
            display: flex; justify-content: center; align-items: center; flex-direction: row;

            #title{
                display: flex; flex-direction: column;

                h1{
                    font-size: 64px;
                    font-weight: 800;
                    transform: translate(-10px, 0px);
                }
                h3{
                    margin-top: 12px;
                    font-weight: 400;
                    color: $primary;
                }
            }

            #cta{
                display: flex; flex-direction: row;
                margin: 0px 0px 0px 82px;
    
                button{
                    width: 128px; height: 46px;
        
                    &.text{
                        text-decoration: underline;
                    }

                    &:first-child{
                        margin-right: 12px;
                    }
                }
    
                @media screen and (max-width: $tablet-width) {
                    margin: 36px 0px 0px 0px;
                }

                @media screen and (max-width: $mobile-width) {
                    flex-direction: column; align-items: center;
                    margin: 42px 0px 0px 0px;
    
                    button{
                        width: calc(100vw - 60px);
                        margin-bottom: 12px;
                        
                        &:last-child{
                            margin: 0;
                        }

                        &.text{
                            width: fit-content
                        }
                    }
                }
            }

            @media screen and (max-width: $tablet-width) {
                flex-direction: column;

                #title{
                    h3{
                        font-size: 26px;
                    }
                }
            }

            @media screen and (max-width: $mobile-width) {
                height: calc(100vh - $urlbar-height - $navbar-height);
                flex-direction: column;
            }
        }

        p{
            width: min(600px, calc(100% - 50px));
            margin-bottom: 200px
        }

        @media screen and (max-width: $mobile-width) {
            padding-bottom: 16px;
        }
    }
</style>