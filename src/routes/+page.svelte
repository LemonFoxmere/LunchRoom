<script lang="ts">

</script>

<main>
    <h1>Fuck urself</h1>

    <section>
        <button>Sign Up</button>
        <button class="text">What?</button>
    </section>
</main>

<style lang="scss">
    @import "$static/stylesheets/guideline";

    main{
        width: 100%; height: 100%;
        display: flex; justify-content: center; align-items: center; flex-direction: column;

        h1{
            margin-bottom: 40px;
        }

        section{
            display: flex; flex-direction: row;

            button{
                width: 180px; height: 50px;
    
                &.text{
                    text-decoration: underline;
                }
            }

            @media screen and (max-width: 621px) {
                flex-direction: column;

                button{
                    width: calc(100vw - 100px);
                    margin-bottom: 12px;
                    
                    &:last-child{
                        margin: 0;
                    }
                }
            }
        }
    }
</style>