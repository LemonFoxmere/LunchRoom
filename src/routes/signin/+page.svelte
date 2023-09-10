<script lang="ts">
	import { signInText } from "$route/+layout.svelte";
	import { onMount } from "svelte";

    onMount(() => {
        $signInText = "Sign Up";
    })
</script>

<main>
    <h1>Welcome Back!</h1>

    <form>
        <input id="emailInput" type="email" placeholder="tinysable@lunchroom.ink"/>

        <button id="submit-btn" type="submit" class="text">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                <path stroke-linecap="round" stroke-linejoin="round" d="M12.75 15l3-3m0 0l-3-3m3 3h-7.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
        </button>
    </form>
</main>

<style lang="scss">
    @import "$static/stylesheets/guideline";

    main {
        width: 100%; height: calc(100vh - $navbar-height);
        padding: 0pt 20px; box-sizing: border-box;
        display: flex; justify-content: center; align-items: center; flex-direction: column;

        transform: translateY(-30pt);

        h1{
            font-size: 36pt;
        }

        form{
            position: relative;

            width: 100%; max-width: 600px;
            margin-top: 20pt;

            display: flex; justify-content: center; align-items: center; flex-direction: column;

            input{
                border: 2px solid $black;
                background: none;
                border-radius: 8pt;

                width: 100%; height: 36pt;
                padding: 0pt 36pt 0pt 12pt; box-sizing: border-box;

                font-size: 12pt;
                
                &::placeholder{
                    color: $quaternary;
                }
            }
            
            #submit-btn{
                position: absolute;
                right: 8pt;
                width: 24pt; height: 24pt;

                svg{
                    width: 100%; height: 100%;
                    color: $black;
                }
            }
        }

        @media screen and (max-width: $mobile-width) {
            height: calc(100vh - $urlbar-height - $navbar-height);
            
            h1{
                font-size: 28pt;
            }

            form{
                $icon-size: 32pt;

                input{
                    height: 42pt;
                    padding: 0pt 14pt;
                    font-size: 13pt;
                }

                #submit-btn{
                    width: 28pt; height: 28pt;
                }
            }
        }
    }
</style>