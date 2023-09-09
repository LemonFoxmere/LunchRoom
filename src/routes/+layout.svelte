<script lang="ts">
	import { onMount } from "svelte";
	import MenuButton from "./../lib/comp/ui/MenuButton.svelte";

    // mobile menu control
    let mobileMenuOpened = false;
    const toggleMobileMenu = () => {
        mobileMenuOpened = !mobileMenuOpened;
    }
    const closeMobileMenu = () => {
        mobileMenuOpened = false;
    }

    // scroll animation
    let scrollDist = 0;
    const trackScroll = () => {
        scrollDist = window.scrollY;
        requestAnimationFrame(trackScroll);
    }
    onMount(trackScroll);

    $: animResolution = 1000;
    $: navbarAnimDelay = -1 * (Math.min(100, scrollDist) / 100) * animResolution;
    $: navbarLogoDelay = -1 * (Math.min(300, scrollDist) / 300) * animResolution;
</script>

<main>
    <div id="navbar" class="{mobileMenuOpened ? "active" : ""}" on:touchmove={e => {e.preventDefault(); e.stopPropagation()}}>
        <div id="content" style="animation-duration: {animResolution}ms; animation-delay: {navbarAnimDelay}ms">
            <a href="/" on:click={closeMobileMenu}>
                <div id="logo" style="animation-duration: {animResolution}ms; animation-delay: {navbarLogoDelay}ms">
                    <img src="/logo.svg" height="32pt" alt="" class="no-drag exclude-desktop">
                    <img src="/logo_text.svg" alt="" class="no-drag only-desktop">
                </div>
            </a>

            <div>
                <section class="only-phone cta">
                    <MenuButton opened={mobileMenuOpened} on:click={toggleMobileMenu}/>
                </section>

                <section class="exclude-phone cta">
                    <a href="/login">
                        <button class="text">Login</button>
                    </a>
    
                    <a target="_blank">
                        <button class="text">Community</button>
                    </a>
    
                    <a href="https://github.com/LemonFoxmere/LunchRoom" target="_blank">
                        <button class="text">GitHub</button>
                    </a>
                </section>
            </div>
        </div>
    </div>

    <!-- svelte-ignore a11y-no-static-element-interactions -->
    <div
        id="mobile-menu"
        class="{mobileMenuOpened ? "" : "disabled"} only-phone"
        on:touchmove={e => {e.preventDefault(); e.stopPropagation()}}
        on:click={closeMobileMenu}
    >
        <div id="menu-bg" on:click={e => e.stopPropagation()}>
            <a class="menu-items" href="/login">
                <button class="text">Login</button>
            </a>

            <hr class="menu-items">

            <a class="menu-items" target="_blank">
                <button class="text">Community</button>
            </a>

            <hr class="menu-items">

            <a class="menu-items" href="https://github.com/LemonFoxmere/LunchRoom" target="_blank">
                <button class="text">GitHub</button>
            </a>
        </div>
    </div>

    <slot></slot>
</main>

<style lang="scss">
    @import "$static/stylesheets/guideline";

    $stagger: 40ms;    // Delay between animations

    main{
        width: 100%; height: fit-content;
        display: flex; flex-direction: column; justify-content: flex-start; align-items: center;
        min-height: 100vh;

        #navbar{
            @extend .glass-heavy;

            width: 100%; min-height: $navbar-height; height: $navbar-height;
            display: flex; justify-content: center; align-items: flex-end;
            position: sticky; top: 0;

            #content{
                width: calc(100vw - 300px); height: fit-content;
                display: flex; justify-content: space-between; align-items: center;

                animation: shrink forwards;
                animation-play-state: paused;

                @keyframes shrink {
                    from {
                        transform: translateY(0pt);
                    }
                    to {
                        transform: translateY(-18pt);
                    }
                }

                #logo{
                    animation: logo-shrink forwards;
                    animation-play-state: paused;
                    animation-timing-function: $out-expo;

                    @keyframes logo-shrink {
                        from {
                            transform: scale(100%);
                        }
                        to {
                            transform: scale(80%);
                        }
                    }

                    @media screen and (max-width: $mobile-width){
                        animation: none;
                    }
                }

                .cta{
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
                    width: calc(100vw - 70px);
                }

                @media screen and (max-width: $mobile-width) {
                    animation: none;
                }
            }

            @media screen and (max-width: $mobile-width) {
                align-items: center;
                min-height: $mobile-navbar-height; height: $mobile-navbar-height;
                background-color: $white;
            }
        }

        #mobile-menu{
            @extend .glass-light;

            width: 100%; height: calc(100% - $navbar-height);
            position: fixed; top: $navbar-height;
            z-index: 100;

            overflow: hidden;
            
            pointer-events: all;

            transition: 500ms $out-cubic;
            transition-property: backdrop-filter, -webkit-backdrop-filter, opacity;

            #menu-bg{
                width: 100%; height: fit-content;
                box-sizing: border-box;
                padding: 0pt 20pt 8pt 20pt;

                display: flex; flex-direction: column; align-items: flex-start; justify-content: flex-start;
                
                background-color: $white;
                box-shadow: 0px 20px 70px 0px hsla(0, 0%, 0%, 20%);
                border-radius: 0pt 0pt 22pt 22pt;

                transform: translateY(0px);
                transform-origin: top;
                transition: 400ms $out-cubic;
                transition-property: transform;

                .menu-items{
                    width: 100%;

                    @for $i from 1 through 5 { // Change the number based on the number of buttons
                        &:nth-child(#{$i}) {
                            animation: fly-in 500ms $out-cubic #{($i - 1) * $stagger} forwards;
                            animation-fill-mode: both;
                        }
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

                a{
                    display: flex;
                
                    padding: 16pt 8pt; box-sizing: border-box;
                    text-decoration: none;

                    &:active{
                        button{
                            color: $tertiary;
                        }
                    }

                    button{
                        font-size: 16pt;
                    }
                }

                hr{
                    margin: 0px;
                    height: 2px; width: calc(100% + 40pt);

                    border: none;
                    background-color: $pentinary;
                }
            }
            
            &.disabled{
                opacity: 0;
                pointer-events: none;
                
                transition: 400ms $in-quart;
                transition-property: backdrop-filter, -webkit-backdrop-filter, opacity;

                #menu-bg{
                    transform: translateY(-15px);
                    transition: 400ms $in-quint;


                    .menu-items{
                        @for $i from 1 through 5 { // Change the number based on the number of buttons
                            &:nth-child(#{$i}) {
                                animation: fly-out 250ms $in-cubic #{($i - 1) * $stagger} forwards;
                            }
                        }
                    }

                    @keyframes fly-out {
                        0% {
                            opacity: 1;
                            transform: translateY(0);
                        }
                        100% {
                            opacity: 0;
                            transform: translateY(-15px);
                        }
                    }
                }
            }

            @media screen and (max-width: $mobile-width) {
                top: $mobile-navbar-height;
            }
        }
    }
</style>