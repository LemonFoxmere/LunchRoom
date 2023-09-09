<script lang="ts">

</script>

<main>
    <div id="frontpage">
        <img src="/images/tiny.jpg" alt="">
    
        <section>
            <button>Sign Up</button>
            <button class="text">What?</button>
        </section>
    </div>

    <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Perspiciatis fugiat, temporibus totam excepturi soluta, dolores nesciunt reiciendis tenetur impedit explicabo architecto eaque amet laudantium libero eligendi culpa cupiditate dolor numquam quasi, nam suscipit! Maiores ducimus quod voluptatum dolor vitae eligendi ut, itaque ex voluptatibus rem reiciendis incidunt tempore, laboriosam, sint consequuntur a quibusdam inventore dolorum nobis! Dicta ipsa omnis delectus reprehenderit placeat est saepe ea eum sint assumenda accusamus libero dolorum ab id autem, itaque, harum maxime provident. Tenetur illo voluptate culpa maxime dolorum quod a in, ad inventore laboriosam enim corrupti aspernatur incidunt deleniti deserunt accusamus ea! Repudiandae officia necessitatibus facere? Explicabo ipsam, sunt possimus nesciunt voluptas tempora numquam, itaque minus cum sint quibusdam earum fugit, facere dolores asperiores provident nobis recusandae adipisci consequuntur! Cupiditate dicta atque illum, molestias beatae quis dolore a hic. Veritatis officiis aperiam dignissimos perferendis corporis voluptas, dolore vitae exercitationem a repellat ullam error itaque ut? Sapiente asperiores accusantium accusamus voluptatum consequatur maxime consectetur dicta. Ullam ea minima explicabo ipsa dolor eos reiciendis aspernatur, asperiores eius accusamus esse, at temporibus molestias quis non. Nesciunt molestias cum eligendi! Pariatur impedit tempora amet a eos accusantium, porro voluptates perferendis repellendus sunt officiis in libero quibusdam quam, nihil rem ducimus inventore numquam quia laudantium deleniti harum ad, eum odio. Earum, consectetur. Voluptatem perferendis nihil amet a eveniet est adipisci, nisi architecto modi laudantium atque suscipit quia, non at. Impedit eligendi architecto aliquid dicta omnis maxime sapiente, fuga est! Accusantium, aliquid nisi. Atque, nesciunt cum necessitatibus voluptas illo temporibus commodi delectus repellendus laudantium autem, beatae at officia aperiam magni alias corporis quod rem sequi earum repellat dolorem possimus accusamus consequuntur? Ea animi sapiente voluptatem est saepe quae! Illum, nostrum impedit esse amet sapiente delectus id suscipit aperiam rem ipsam sit quo, eligendi possimus repudiandae nemo deserunt nobis ea fugiat deleniti voluptates blanditiis. Aspernatur minus maiores recusandae impedit debitis ipsa. Esse maxime, explicabo autem voluptatem amet assumenda hic nulla possimus nobis reiciendis, ab velit omnis dolores tempore. Ab maiores ea molestiae, distinctio commodi assumenda laborum enim quo, ducimus, minima itaque fugiat! Veniam nostrum quasi quo quia modi earum quod culpa molestias aliquid quidem vel at, eligendi enim sit explicabo eius quaerat illo quibusdam fuga accusantium! Minus perspiciatis exercitationem, asperiores expedita harum alias nemo qui deleniti voluptate, eligendi tempore iusto magnam sed porro, ratione iure autem in. Minus obcaecati nam, officia qui deserunt temporibus. Odit, cumque odio sed aliquid beatae quisquam animi vero, excepturi dolorem perspiciatis pariatur cum ipsa ipsam eius eum et repudiandae? Rerum eius voluptatum nisi facere sint tenetur reprehenderit suscipit. Beatae accusamus inventore doloremque libero consectetur perspiciatis iste eius consequuntur dolorum tenetur totam qui id quaerat necessitatibus rem, consequatur accusantium earum cupiditate modi doloribus fugit odio? Doloribus adipisci soluta commodi, enim accusantium atque dolore! Enim veritatis eius fugit exercitationem autem iure ducimus, excepturi possimus placeat officiis deleniti natus consectetur quasi. Eum obcaecati voluptas, autem ipsam suscipit in nisi, illo dolorem rerum temporibus natus eligendi error, possimus laboriosam accusantium dignissimos accusamus officia et sed harum. Soluta expedita ipsum nobis?</p>
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