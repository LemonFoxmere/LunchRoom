<script lang="ts">
	import { screenSize } from "$lib/@const/ui";
	import MenuButton from "./../lib/comp/ui/MenuButton.svelte";
    import MediaQuery from "svelte-media-query";

    // mobile menu control
    let mobileMenuOpened = false;
    const toggleMobileMenu = () => {
        mobileMenuOpened = !mobileMenuOpened;

        if(mobileMenuOpened){
            // scroll to top of page
            window.scrollTo(0, 0);
        }
    }
    const closeMobileMenu = () => {
        mobileMenuOpened = false;
    }
</script>

<main>
    <div id="navbar" on:touchmove={e => {e.preventDefault(); e.stopPropagation()}}>
        <div id="content">
            <div id="logo">
                <MediaQuery query="(min-width: {screenSize.tablet}px)" let:matches>
                    {#if matches}
                        <img src="/logo_text.svg" alt="" class="no-drag">
                    {:else}
                        <img src="/logo.svg" alt="" class="no-drag">
                    {/if}
                </MediaQuery>
            </div>

            <div id="cta">
                <MediaQuery query="(min-width: {screenSize.phone}px)" let:matches>
                    {#if matches}
                        <a href="/login" target="_blank">
                            <button class="text">Login</button>
                        </a>

                        <a target="_blank">
                            <button class="text">Community</button>
                        </a>

                        <a href="https://github.com/LemonFoxmere/LunchRoom" target="_blank">
                            <button class="text">GitHub</button>
                        </a>
                    {:else}
                        <!-- menu icon -->
                        <MenuButton opened={mobileMenuOpened} on:click={toggleMobileMenu}/>
                    {/if}
                </MediaQuery>
            </div>
        </div>
    </div>

    <MediaQuery query="(min-width: {screenSize.phone}px)" let:matches>
        <div
            id="mobile-menu"
            class="{mobileMenuOpened && !matches ? "" : "disabled"}"
            on:touchmove={e => {e.preventDefault(); e.stopPropagation()}}
        >
            <div id="menu-bg">
                <section class="menu-buttons">
                    <a href="/login" target="_blank">
                        <button class="text">Login</button>
                    </a>
                    <hr>
                </section>

                <section class="menu-buttons">
                    <a target="_blank">
                        <button class="text">Community</button>
                    </a>
                    <hr>
                </section>

                <section class="menu-buttons">
                    <a href="https://github.com/LemonFoxmere/LunchRoom" target="_blank">
                        <button class="text">GitHub</button>
                    </a>
                </section>
            </div>
        </div>
    </MediaQuery>

    <slot></slot>
</main>

<style lang="scss">
    @import "$static/stylesheets/guideline";

    main{
        width: 100%; height: fit-content;
        display: flex; flex-direction: column; justify-content: flex-start; align-items: center;
        min-height: 100vh;

        overflow: scroll;

        #navbar{
            width: 100%; min-height: $navbar-height; height: $navbar-height;
            display: flex; justify-content: center; align-items: flex-end;

            #content{
                width: calc(100vw - 300px); height: fit-content;
                display: flex; justify-content: space-between; align-items: center;

                #cta{
                    display: flex; flex-direction: row-reverse;

                    a{
                        text-decoration: none;
                        margin-right: 36pt;

                        &:first-child{
                            margin: 0px;
                        }

                        button{
                            display: flex; align-items: center;
    
                            svg{
                                margin-left: 8pt;
                                height: 14pt;
                            }
                        }
                    }
                }

                div{
                    height: 36px;
                    display: flex; align-items: center;
                    overflow: visible;
                }

                @media screen and (max-width: $tablet-width) {
                    width: calc(100vw - 100px);
                }
            }
        }

        #mobile-menu{
            width: 100%; height: calc(100% - $navbar-height);
            position: absolute; top: $navbar-height;
            background-color: hsla(96, 12%, 92%, 50%);
            
            backdrop-filter: blur(30px) saturate(200%);
            -webkit-backdrop-filter: blur(30px) saturate(200%);
            overflow: hidden;
            
            pointer-events: all;

            transition: 500ms $out-cubic;
            transition-property: backdrop-filter, -webkit-backdrop-filter, opacity;

            #menu-bg{
                width: 100%; height: fit-content;
                box-sizing: border-box;
                padding: 26pt 50px 20pt 50px;

                display: flex; flex-direction: column; align-items: flex-start; justify-content: flex-start;
                
                background-color: $white;
                box-shadow: 0px 20px 70px 0px hsla(0, 0%, 0%, 20%);
                border-radius: 0pt 0pt 22pt 22pt;

                transform: translateY(0px);
                transform-origin: top;
                transition: transform 400ms $out-cubic;

                .menu-buttons{
                    width: 100%;

                    $stagger: 70ms;    // Delay between animations
                    @for $i from 1 through 3 { // Change the number based on the number of buttons
                        &:nth-child(#{$i}) {
                            animation: fly-in 500ms $out-cubic #{($i - 1) * $stagger} forwards;
                            animation-fill-mode: backwards;
                        }
                    }

                    a{
                        display: flex;
                        
                        width: 100%;
                        padding: 15pt 50vw;
                        text-decoration: none;

                        transform: translateX(-50vw);
    
                        &:active{
                            button{
                                color: $tertiary;
                            }
                        }

                        button{
                            font-size: 22pt;
                        }
                    }
    
                    hr{
                        margin: 0px;
                        height: 2px; width: calc(100% + 40pt);
                        transform: translate(-20pt, 0pt);
    
                        border: none;
                        background-color: $pentinary;
                    }

                    @keyframes fly-in {
                        0% {
                            opacity: 0;
                            transform: translateY(-15px);
                        }
                        100% {
                            opacity: 1;
                            transform: translateY(0);
                        }
                    }
                }
            }
            
            &.disabled{
                opacity: 0;
                pointer-events: none;

                #menu-bg{
                    transform: translateY(-10px);

                    .menu-buttons{
                        animation: none;
                    }
                }
            }
        }
    }
</style>