<script lang="ts">
	export let name: string;

	let contentHeight: number;
</script>

<main>
	<h1 bind:clientHeight={contentHeight}>Welcome to LunchRoom{name ? `, ${name.split(" ")[0]}` : ""}!</h1>

	<section id="cta" style="transform: translateY({contentHeight/2 + 75}px)">
		<a href="/profile" class="plain">
			<button class="solid large">View Profile</button>
		</a>
		<a href="/">
			<button class="large text">Return Home</button>
		</a>
	</section>
</main>

<style lang="scss">
    @import "$static/stylesheets/guideline";

    main {
        display: flex;
        justify-content: center;
        align-items: center;

        h1 {
            margin-bottom: 10px;
            text-align: center;
        }

        p {
            font-size: 16px;
        }

        #cta {
            position: absolute;
            display: flex;

            a {
                width: fit-content;
                height: fit-content;
                padding: 0;
                margin: 0;

                &:first-child {
                    margin-right: 12px;
                }
            }
        }

        @media screen and (max-width: $mobile-width) {
            flex-direction: column;

            h1 {
                font-size: 32px;
            }

            #cta {
                flex-direction: column;
                justify-content: center;
                align-content: center;

                width: 100%;

                a {
                    width: inherit;
                    height: 46px;

                    button {
                        width: inherit;
                        height: inherit;
                    }

                    &:first-child {
                        margin-bottom: 12px;
                    }
                }
            }
        }
    }
</style>
