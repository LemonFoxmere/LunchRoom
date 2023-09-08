<script lang="ts">
    import MediaQuery from "svelte-media-query";
</script>

<main>
    <div id="navbar">
        <div id="content">
            
            <div id="logo">
                <MediaQuery query="(min-width: 930px)" let:matches>
                    {#if matches}
                        <img src="/logo_text.svg" alt="" class="no-drag">
                    {:else}
                        <img src="/logo.svg" alt="" class="no-drag">
                    {/if}
                </MediaQuery>
            </div>

            <div id="cta">
                <MediaQuery query="(min-width: 621px)" let:matches>
                    {#if matches}
                        <a href="/login" target="_blank">
                            <button class="text">Login</button>
                        </a>

                        <a target="_blank">
                            <button class="text">
                                Community
    
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.75" stroke="currentColor" class="w-6 h-6">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                                </svg>                              
                            </button>
                        </a>

                        <a href="https://github.com/LemonFoxmere/LunchRoom" target="_blank">
                            <button class="text">GitHub</button>
                        </a>
                    {:else}
                        <h3>kys</h3>
                    {/if}
                </MediaQuery>
            </div>
        </div>
    </div>
    <slot></slot>
</main>

<style lang="scss">
    @import "$static/stylesheets/guideline";

    main{
        width: 100%; height: 100%;
        display: flex; flex-direction: column; justify-content: flex-start; align-items: center;
        min-height: 100vh;

        #navbar{
            width: 100%; height: 86px;
            display: flex; justify-content: center; align-items: flex-end;

            #content{
                width: calc(100vw - 300px); height: fit-content;
                display: flex; justify-content: space-between; align-items: center;

                #cta{
                    display: flex; flex-direction: row-reverse;

                    a{
                        text-decoration: none;

                        button{
                            margin-right: 48pt;
                            display: flex; align-items: center;
    
                            svg{
                                margin-left: 8pt;
                                height: 14pt;
                            }
                        }

                        &:first-child{
                            margin: 0px;
                        }
                    }
                }

                div{
                    height: 36px;
                    display: flex; align-items: center;
                    overflow: visible;
                }

                @media screen and (max-width: 930px) {
                    width: calc(100vw - 100px);
                }
            }
        }
    }
</style>