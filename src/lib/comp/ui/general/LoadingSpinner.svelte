<main>
    <!-- the foreground div -->
    <div></div>
</main>

<!-- STYLE -->
<style lang="scss">
    @import "$static/stylesheets/guideline";

    main{
        $total-bar-width: 64px;
        $bounce-bar-width: 24px;

        width: $total-bar-width; height: 10px;
        // background-color: $pentinary;
        border-radius: 100px;

        div{
            width: $bounce-bar-width; height: 100%;
            border-radius: 100px;
            background-color: $black;
            animation: bounce 900ms linear infinite;
        }

        @keyframes bounce {
            0% {
                transform: translateX(0);
            }
            50% {
                transform: translateX(calc($total-bar-width - $bounce-bar-width));
            }
            100% {
                transform: translateX(0);
            }
            }
    }
</style>