<script lang="ts">
	import { onMount } from "svelte";
	import { signInText } from "./+layout.svelte";

    onMount(() => {
        $signInText = "Sign In";
    })
</script>

<main>
    <div id="frontpage">
        <img src="/images/tiny.jpg" alt="">
    
        <section>
            <button>Sign Up</button>
            <button class="text">What?</button>
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
            width: 100%; height: calc(100vh - $navbar-height);
            display: flex; justify-content: center; align-items: center; flex-direction: row;

            img{
                width: 400px;
                border-radius: 12pt;
                box-shadow: 0px 15px 30px 0px hsla(0, 0%, 0%, 15%);
                margin-right: 100px;
            }

            section{
                display: flex; flex-direction: row;
    
                button{
                    width: 180px; height: 50px;
        
                    &.text{
                        text-decoration: underline;
                    }
                }
    
                @media screen and (max-width: $mobile-width) {
                    flex-direction: column; align-items: center;
    
                    button{
                        width: calc(100vw - 100px);
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

                img{
                    width: min(calc($mobile-width - 100px), calc(100vh - 300px));
                    
                    margin: 20px 0px 50px 0px;
                }
            }

            @media screen and (max-width: $mobile-width) {
                height: calc(100vh - $urlbar-height - $navbar-height);
                flex-direction: column;

                img{
                    width: calc(100vw - 100px);
                    border-radius: 16pt;
                    margin: 20px 0px 50px 0px;
                }
            }
        }

        p{
            width: min(600px, calc(100% - 50px));
            margin-bottom: 200px
        }

        @media screen and (max-width: $mobile-width) {
            padding-bottom: 16pt;
        }
    }
</style>