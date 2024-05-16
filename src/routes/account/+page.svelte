<script lang="ts">
	import { getHighResURL } from "$lib/util/profile/avatar";
	import type { Session } from "@supabase/supabase-js";
	import { Md5 } from "ts-md5";
	import type { PageData } from "./$types";

	export let data: PageData;

	let session: Session;
	let payload: AppUser;
	$: ({ session, payload } = data);

	let sectionIdx = 0;
</script>

<main>
	<div id="sidebar">
		<a id="back-to-profile" href="/profile">
			<svg id="back" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
				<path stroke-linecap="round" stroke-linejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
			</svg>

			<p>Back to profile</p>
		</a>

		<section id="greet">
			<img
				id="avatar"
				src={payload.profile.avatar
					? getHighResURL(payload.profile.avatar, 512, session.user.app_metadata.provider ?? null)
					: `https://gravatar.com/avatar/${Md5.hashStr(
							session.user.email ?? ""
						)}?f=y&d=identicon&s=512`}
				class="no-drag"
				alt=""
			/>

			<h3 id="name">{payload.account.name}</h3>
		</section>

		<section id="settings-menu">
			<a class={sectionIdx === 0 ? "active" : ""}>
				<svg id="icon" viewBox="0 0 24 24" fill="currentColor">
					<path
						fill-rule="evenodd"
						d="M12 1.5a5.25 5.25 0 0 0-5.25 5.25v3a3 3 0 0 0-3 3v6.75a3 3 0 0 0 3 3h10.5a3 3 0 0 0 3-3v-6.75a3 3 0 0 0-3-3v-3c0-2.9-2.35-5.25-5.25-5.25Zm3.75 8.25v-3a3.75 3.75 0 1 0-7.5 0v3h7.5Z"
						clip-rule="evenodd"
					/>
				</svg>

				<h6 id="text">Account</h6>
			</a>
			<a class={sectionIdx === 1 ? "active" : ""}>
				<svg id="icon" viewBox="0 0 24 24" fill="currentColor">
					<path
						fill-rule="evenodd"
						d="M7.5 6a4.5 4.5 0 1 1 9 0 4.5 4.5 0 0 1-9 0ZM3.751 20.105a8.25 8.25 0 0 1 16.498 0 .75.75 0 0 1-.437.695A18.683 18.683 0 0 1 12 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 0 1-.437-.695Z"
						clip-rule="evenodd"
					/>
				</svg>

				<h6 id="text">Profile</h6>
			</a>
			<a class={sectionIdx === 2 ? "active" : ""}>
				<svg id="icon" viewBox="0 0 24 24" fill="currentColor">
					<path
						d="M10.464 8.746c.227-.18.497-.311.786-.394v2.795a2.252 2.252 0 0 1-.786-.393c-.394-.313-.546-.681-.546-1.004 0-.323.152-.691.546-1.004ZM12.75 15.662v-2.824c.347.085.664.228.921.421.427.32.579.686.579.991 0 .305-.152.671-.579.991a2.534 2.534 0 0 1-.921.42Z"
					/>
					<path
						fill-rule="evenodd"
						d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25ZM12.75 6a.75.75 0 0 0-1.5 0v.816a3.836 3.836 0 0 0-1.72.756c-.712.566-1.112 1.35-1.112 2.178 0 .829.4 1.612 1.113 2.178.502.4 1.102.647 1.719.756v2.978a2.536 2.536 0 0 1-.921-.421l-.879-.66a.75.75 0 0 0-.9 1.2l.879.66c.533.4 1.169.645 1.821.75V18a.75.75 0 0 0 1.5 0v-.81a4.124 4.124 0 0 0 1.821-.749c.745-.559 1.179-1.344 1.179-2.191 0-.847-.434-1.632-1.179-2.191a4.122 4.122 0 0 0-1.821-.75V8.354c.29.082.559.213.786.393l.415.33a.75.75 0 0 0 .933-1.175l-.415-.33a3.836 3.836 0 0 0-1.719-.755V6Z"
						clip-rule="evenodd"
					/>
				</svg>

				<h6 id="text">Payment</h6>
			</a>

			<a id="signout">
				<svg id="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5px">
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						d="M8.25 9V5.25A2.25 2.25 0 0 1 10.5 3h6a2.25 2.25 0 0 1 2.25 2.25v13.5A2.25 2.25 0 0 1 16.5 21h-6a2.25 2.25 0 0 1-2.25-2.25V15m-3 0-3-3m0 0 3-3m-3 3H15"
					/>
				</svg>

				<h6 id="text">Sign Out</h6>
			</a>
		</section>
	</div>

	<div id="settings">
		<section class="section">
			<h1 id="title">Account Settings</h1>

			<section id="body">
				<p>
					Lorem ipsum, dolor sit amet consectetur adipisicing elit. Sunt dolore, voluptas excepturi
					quam quo mollitia fuga fugit laboriosam odio totam!
				</p>
				<p>
					Iure quaerat amet dolorem aliquam laboriosam explicabo harum odit dicta accusamus quidem
					aut possimus vero, blanditiis sapiente nam exercitationem fugit.
				</p>
				<p>
					Aliquam ad explicabo porro quidem mollitia modi, ab, inventore exercitationem eligendi,
					placeat soluta molestiae beatae natus et magni obcaecati deleniti!
				</p>
				<p>
					Maiores, quisquam voluptatem commodi vel reiciendis delectus temporibus explicabo in
					minima eius, atque debitis officiis odio! Vero cupiditate explicabo eligendi.
				</p>
				<p>
					Molestiae nostrum consequatur similique enim vero fugiat doloribus ea cumque eius a,
					numquam alias amet fuga vitae? Magni, itaque similique?
				</p>
				<p>
					Corrupti quaerat iste nostrum, in id fugiat voluptatum, enim ut maxime consequuntur
					voluptas dolorum quas rerum, sint odio illum iusto.
				</p>
				<p>
					Odit dolores delectus, ratione vero, quod autem doloremque dicta eaque deserunt similique
					vel. Nostrum illum ipsam neque et eveniet hic!
				</p>
				<p>
					Sit iure asperiores hic voluptatum quod. Voluptate enim assumenda nulla sunt veniam
					sapiente! Ipsa, corrupti? Nesciunt pariatur nihil natus labore.
				</p>
				<p>
					Mollitia harum soluta tempora voluptate, nesciunt sit fugiat aliquam, perferendis nostrum
					debitis laborum exercitationem amet. Alias tenetur repudiandae commodi facere!
				</p>
				<p>
					Perspiciatis dicta architecto voluptas possimus sapiente commodi maxime non labore
					expedita, repellendus ad iusto provident reprehenderit, voluptatem excepturi pariatur
					impedit.
				</p>
				<p>
					Quibusdam ducimus nostrum eum asperiores unde amet voluptatum, voluptatem libero optio ad,
					dolore minima, tenetur fuga odit voluptas ipsa iure?
				</p>
				<p>
					Optio debitis consequuntur quisquam quas saepe odio illum asperiores ipsa suscipit veniam,
					mollitia quo amet, excepturi qui expedita, pariatur aspernatur.
				</p>
				<p>
					Quibusdam soluta facilis impedit nostrum commodi! Optio alias hic dignissimos ab? Odio
					dicta totam quo corporis, modi nisi accusamus maiores!
				</p>
				<p>
					Eligendi cumque aliquid iste deserunt. Minima, eos! Magni distinctio nam recusandae alias
					eum, ad optio molestias possimus, veritatis et nihil.
				</p>
				<p>
					Quod nostrum aut obcaecati, ea adipisci non sunt reiciendis voluptatibus amet maxime quia
					dolorem. Cum illo commodi numquam quasi beatae?
				</p>
				<p>
					Omnis, dolor ratione! Ex, corrupti ab repellat molestias consectetur repudiandae
					voluptatibus nulla nobis id illo facere explicabo voluptas laudantium tenetur.
				</p>
				<p>
					Sit similique obcaecati voluptas! Ad earum nisi quis cum cumque officiis laborum veniam
					commodi. Non illo quibusdam voluptate voluptates architecto!
				</p>
				<p>
					Quidem placeat ea excepturi vitae inventore at magni deserunt, amet ad fuga dolor
					reprehenderit cumque sunt autem odit rerum obcaecati?
				</p>
				<p>
					Esse, quasi. At saepe, ab quisquam enim eligendi beatae neque tempore in inventore ad
					magnam quia fugit voluptas repellat. Excepturi.
				</p>
				<p>
					Illum, explicabo animi laudantium deserunt dolorum commodi consequatur laboriosam
					similique praesentium officiis beatae fugiat impedit laborum est quos recusandae
					distinctio!
				</p>
				<p>
					Distinctio voluptate provident sed quod beatae iusto error fugit, unde eveniet,
					accusantium nihil veritatis dolores doloremque culpa molestias, velit quas!
				</p>
				<p>
					Laborum unde laboriosam quod sapiente inventore, iusto perferendis exercitationem
					molestias molestiae rem beatae porro, asperiores natus! Quisquam, autem? Unde, dolore.
				</p>
				<p>
					Iste commodi dolore excepturi. Nostrum mollitia similique officia voluptates ad atque
					dolor, excepturi ipsa quo harum fugit repellendus enim itaque!
				</p>
				<p>
					Obcaecati voluptatibus asperiores deserunt sed temporibus, rerum debitis numquam unde rem
					sapiente alias ut fuga, excepturi architecto sequi. Possimus, error.
				</p>
				<p>
					Eum corrupti deserunt asperiores consequatur! Quae molestiae reprehenderit porro
					recusandae nihil vitae eaque iusto repellendus, ut, dolor repellat maiores sint.
				</p>
				<p>
					Ipsa harum distinctio laudantium dolorum fugit alias libero at quod nostrum doloribus,
					repellendus non sint dicta tenetur culpa ipsum animi.
				</p>
				<p>
					Reprehenderit laboriosam odio modi nobis corporis? Reprehenderit, neque laudantium vitae
					est fugiat libero, nam, ipsam ducimus enim dicta ad maxime.
				</p>
				<p>
					Voluptas porro esse assumenda excepturi. Porro eos itaque sunt? Deserunt aliquid sapiente
					non reiciendis recusandae, et suscipit quo consectetur dolorum.
				</p>
				<p>
					At, sunt tempore sequi blanditiis, magnam est et, fugiat odio amet aspernatur quae soluta
					illum. Dignissimos alias quos qui aperiam?
				</p>
				<p>
					Nisi libero ducimus consequatur soluta nulla repellat mollitia animi neque aliquid, autem
					at suscipit, est voluptatum incidunt temporibus quas. Voluptates.
				</p>
				<p>
					Dolorum quia ratione cumque illum voluptate commodi dolorem nam laborum, sed quis. Quos
					quisquam ipsum repellat tempore esse, est necessitatibus?
				</p>
				<p>
					Porro, accusamus doloribus quae id placeat ex quaerat reprehenderit praesentium aspernatur
					dolorum distinctio iusto, maiores assumenda sit asperiores voluptatum eaque.
				</p>
				<p>
					Non nam blanditiis quo velit. Reiciendis vero ratione iste error porro odit! Perferendis
					reiciendis fuga nisi, facilis quibusdam nam consequatur.
				</p>
				<p>
					Ab iusto itaque doloribus, dolores quae doloremque architecto. Ipsam quae voluptatem
					distinctio accusantium soluta praesentium incidunt voluptate similique, pariatur quia.
				</p>
				<p>
					Maxime ratione, nemo facere, illum expedita molestiae at harum accusantium dolorum
					possimus optio cupiditate odio culpa ab suscipit dolor eius!
				</p>
				<p>
					Itaque aliquid assumenda dignissimos doloribus sed atque voluptate culpa sunt labore
					explicabo quos exercitationem quod, rem suscipit quia nesciunt possimus.
				</p>
				<p>
					Aliquid et natus ducimus earum atque dolorum voluptas nisi sunt ea quasi, tempora vitae
					perferendis esse eos soluta, voluptates placeat?
				</p>
				<p>
					Aut nemo saepe amet ut obcaecati earum, numquam perspiciatis quas sit. In iusto voluptates
					autem aliquam quas alias repellendus dolores.
				</p>
				<p>
					Tempora cupiditate, voluptates illo vitae recusandae corrupti ipsum fugiat vero quisquam,
					ullam sequi labore praesentium nulla veritatis, itaque aliquam eaque?
				</p>
				<p>
					Aut asperiores, quo qui consectetur sapiente aperiam quis minus laborum, nesciunt culpa
					nihil facere perspiciatis eaque? Tenetur, dolorem! Consequuntur, amet?
				</p>
				<p>
					Totam nihil a quos, odio placeat officia deserunt ratione porro, repellendus sint, earum
					tempora debitis! Tempore a neque dolorum aut.
				</p>
				<p>
					Cupiditate assumenda tenetur sapiente similique perspiciatis amet maxime molestias quidem
					ullam aliquam labore commodi, quae esse nam eveniet dicta dignissimos.
				</p>
				<p>
					Facere mollitia fugit accusamus quaerat id ut quod sequi laudantium quibusdam officiis
					enim, debitis, sint ullam esse quisquam perferendis. Quisquam?
				</p>
				<p>
					Quam magni facilis, ducimus aspernatur accusamus vero commodi repellat odio deleniti
					eveniet esse qui incidunt dolor eius corporis aliquid quia.
				</p>
				<p>
					Officiis, amet. Reprehenderit odio laudantium, explicabo aut laboriosam accusamus ducimus
					nemo eaque, reiciendis dolorem sapiente cumque beatae autem assumenda necessitatibus!
				</p>
				<p>
					Ad repellendus molestias, odio, qui iste excepturi necessitatibus labore ipsa officiis
					consequatur eius ut. Beatae quo similique eligendi quia tempora!
				</p>
				<p>
					Culpa excepturi ullam magni, cum assumenda facilis, aspernatur aliquam suscipit officiis
					natus nemo ipsa explicabo illo autem impedit quod reprehenderit?
				</p>
				<p>
					Quos sapiente sunt voluptate obcaecati dolorum quaerat magnam animi mollitia ducimus ipsa
					alias voluptates nobis neque, labore illo quidem veritatis.
				</p>
				<p>
					Dolorem deleniti culpa error aspernatur illum eum nesciunt necessitatibus provident
					possimus, consequatur aliquid reiciendis. Sunt voluptatum consequuntur dolore! Maiores,
					natus.
				</p>
				<p>
					Nobis temporibus facilis maiores ab velit asperiores est vel qui, quidem neque voluptates.
					Ut quidem expedita, vel accusamus vitae eius.
				</p>
				<p>
					Repudiandae nihil, ipsa quaerat odit, magnam eum cupiditate possimus eos ullam blanditiis,
					fugit non perferendis beatae! Incidunt voluptas similique minus!
				</p>
				<p>
					Ab iure quae sed minima hic asperiores impedit maxime iste quo omnis expedita, quisquam
					animi itaque facilis eum tempore? Voluptate.
				</p>
				<p>
					Inventore, quis amet, dolor, maxime earum odit ad sed explicabo quo quibusdam debitis.
					Consequatur nisi veritatis modi enim quidem porro!
				</p>
				<p>
					Et sit nemo minus mollitia voluptatum doloremque vel minima, est obcaecati exercitationem
					at possimus quae unde? Quisquam minima tenetur repellendus?
				</p>
				<p>
					Exercitationem officia dolore ea vitae libero vel odit consequuntur distinctio qui minus
					dolor eveniet quos nostrum beatae eligendi, sed assumenda.
				</p>
				<p>
					Ab omnis unde nihil amet. Ab sint culpa nihil distinctio sunt cupiditate ullam iure illo
					neque, harum maxime modi quas?
				</p>
				<p>
					Soluta nostrum quod ut. Vero neque, earum porro culpa recusandae reiciendis modi qui ex
					aliquid sapiente expedita excepturi assumenda voluptates?
				</p>
				<p>
					Corrupti in itaque incidunt aspernatur quas id tempore, blanditiis non modi? Rerum
					aspernatur reiciendis numquam optio accusamus. Aliquam, fuga assumenda!
				</p>
				<p>
					Quia possimus illum tempora quas repellendus libero incidunt, nemo recusandae accusamus
					unde at molestias dicta, excepturi nisi ab doloribus natus.
				</p>
				<p>
					Dignissimos, dicta! Magnam, ea molestiae vel veritatis voluptates natus dolor delectus
					sunt excepturi repellendus tempore, cupiditate nesciunt facilis nobis autem.
				</p>
				<p>
					Dolore molestiae nam quisquam alias id tempore quia totam ea, rerum quo unde laboriosam,
					et libero facere aperiam commodi ducimus?
				</p>
				<p>
					Laboriosam, modi mollitia laudantium dicta animi dolor deleniti blanditiis omnis
					aspernatur nulla commodi minima quidem laborum exercitationem illo at quibusdam?
				</p>
				<p>
					Vitae modi nesciunt odit ab fuga, nulla enim unde architecto labore at provident earum
					aut, repudiandae eius quidem dolorem eum.
				</p>
				<p>
					Mollitia dolores placeat nobis veritatis nemo obcaecati asperiores quae voluptatum et?
					Ipsa doloremque alias minus obcaecati, aliquam beatae dolorum nam.
				</p>
				<p>
					Odit consectetur nostrum perspiciatis, a ex doloribus commodi similique unde optio,
					maiores nihil harum tempora? Iste, tempora alias. Pariatur, suscipit.
				</p>
				<p>
					Earum amet error tempora deleniti voluptates? Eum dolorem inventore officia et esse
					architecto labore ipsam, assumenda quisquam rem nostrum explicabo?
				</p>
				<p>
					Adipisci minus ut facilis rem est praesentium ab quod consequatur iste unde! Perferendis
					eius dignissimos repellat aspernatur rem. Odio, natus.
				</p>
				<p>
					Reiciendis libero expedita aperiam rerum odio minus, dolorum cumque accusantium sed ea
					officia repudiandae. Dolorum debitis rem aut laborum eveniet.
				</p>
				<p>
					Labore harum mollitia odit voluptatem fugiat odio laboriosam dolor, quod itaque! Aliquid
					quod dicta ducimus deleniti rem sint, temporibus ut?
				</p>
				<p>
					Quod, velit veritatis? Perferendis eum, nulla amet cupiditate soluta rem magni! Architecto
					cupiditate quia nisi molestiae perferendis minima sint quos.
				</p>
				<p>
					Perspiciatis saepe eaque error repellat animi nam facilis consequuntur vel vitae id unde
					adipisci commodi atque aperiam, non sapiente nobis.
				</p>
				<p>
					Corporis quod commodi mollitia molestias, assumenda dolorum ad ratione temporibus? Dicta
					labore modi earum perspiciatis soluta, ab a sed assumenda?
				</p>
				<p>
					Saepe ut exercitationem nisi ullam quibusdam fugit. Autem eligendi facere ex ab provident
					eos error omnis? Incidunt commodi voluptatibus reprehenderit.
				</p>
				<p>
					Doloribus fugit sed eveniet dolore iste sit architecto. Facilis dignissimos corporis
					similique rem dolore id ratione atque modi quis unde?
				</p>
				<p>
					Doloremque ut ducimus illo tenetur amet. Cum, quos aut quaerat officia vel explicabo nobis
					vero dicta perspiciatis voluptatum accusantium non.
				</p>
				<p>
					Expedita unde tempore ratione voluptatem animi iure atque praesentium natus fugit saepe
					possimus beatae, non laboriosam quae reiciendis cum nobis?
				</p>
				<p>
					Beatae itaque at officia quod? Ducimus similique explicabo repellendus soluta quis! Aut
					mollitia dolorum dolore modi quibusdam fugiat aliquam? Odio!
				</p>
				<p>
					Eaque ipsam aut, eligendi deserunt alias consectetur natus maiores illum iusto quam fugit
					nihil repudiandae eius dolore libero, autem id.
				</p>
				<p>
					Tenetur dolorum magnam ex sed officia alias ipsam labore impedit aperiam voluptatibus,
					cumque obcaecati esse autem ducimus. Libero, commodi inventore.
				</p>
				<p>
					Maxime tempora possimus aliquam ratione doloribus voluptatum maiores non nemo, nam impedit
					nobis, excepturi in nulla voluptas et, officia natus?
				</p>
				<p>
					Nisi harum quaerat placeat maiores. Ad animi ab voluptas delectus suscipit, debitis
					laboriosam expedita asperiores aperiam natus consequuntur culpa deleniti.
				</p>
				<p>
					Perspiciatis est ad quo ut veritatis pariatur nobis laborum nihil reprehenderit
					repellendus quaerat et quod suscipit dolorem, aliquam iste cumque.
				</p>
				<p>
					Laborum eligendi aliquam assumenda qui repudiandae consequuntur voluptatem excepturi.
					Quibusdam id velit vero aliquid laborum a veniam voluptatibus dolor reprehenderit!
				</p>
				<p>
					Aliquam repudiandae quis dolorem animi assumenda ab nesciunt repellat quod unde, quos
					doloribus vel ut dicta aut laudantium! Sint, incidunt.
				</p>
				<p>
					Maxime, animi natus dolorem incidunt obcaecati, voluptates magni atque nobis dolore, saepe
					repellendus deleniti? Ipsam ea voluptatem eveniet provident fuga?
				</p>
				<p>
					Sit ipsam incidunt, harum ut esse eos, aliquam quasi veniam ullam fugit rerum aliquid est
					odit sed tempora reiciendis porro.
				</p>
				<p>
					Facere ullam earum natus at quaerat nisi consectetur voluptatem tenetur nostrum eaque
					ipsum laboriosam, rem, cum vitae necessitatibus quo sed.
				</p>
				<p>
					Facere illum asperiores at dicta sint sunt fuga dolorum vel laboriosam odio, accusamus
					molestias commodi exercitationem illo. Magnam, obcaecati distinctio.
				</p>
				<p>
					Impedit magni nam unde deleniti id. Architecto ipsam odit minus voluptatibus quisquam
					mollitia iste. Ut esse perspiciatis asperiores veniam laboriosam?
				</p>
				<p>
					Enim tenetur velit deleniti odio ratione eum minima, itaque temporibus quae ab quod
					eligendi? Ducimus laborum deleniti magnam facere consequuntur.
				</p>
				<p>
					Soluta esse earum, at, maiores ipsum temporibus quidem ut ratione repudiandae quae tenetur
					vitae voluptatibus corporis. Magnam iure nihil cumque!
				</p>
				<p>
					Sapiente doloribus provident esse eaque aperiam nostrum beatae nesciunt laudantium rerum
					expedita officia fugiat, sed quaerat, reiciendis placeat ab? Ducimus.
				</p>
				<p>
					Facilis veritatis quo tenetur distinctio temporibus eaque quae neque sit reiciendis
					assumenda deleniti labore unde, quidem voluptatibus repellendus in! Ullam?
				</p>
				<p>
					Odio in distinctio similique, sequi dolorum consequuntur numquam dolor temporibus aut.
					Modi id dolore doloremque labore veniam commodi vero asperiores?
				</p>
				<p>
					Qui recusandae minima fugit velit, rem, modi atque quae porro deleniti nobis eveniet ipsam
					facilis optio consectetur? Ex, fuga illum?
				</p>
				<p>
					Quibusdam, dolorem enim fugit sequi esse nulla recusandae beatae voluptatibus, vero
					provident quis exercitationem perferendis assumenda consequatur voluptatem hic illo.
				</p>
				<p>
					Architecto autem est commodi ducimus quas magni aliquam omnis, corporis provident maxime
					minima expedita tempora animi debitis eum quis nemo!
				</p>
				<p>
					Cumque, ullam officiis. Necessitatibus sequi quidem accusantium. Eius quas aspernatur
					facilis rerum, exercitationem tenetur possimus, repellat quod et quisquam velit?
				</p>
				<p>
					Ut at veritatis, beatae in sed officia rem ducimus mollitia debitis necessitatibus atque
					doloribus eius excepturi libero, accusantium dignissimos consequuntur.
				</p>
				<p>
					Totam et, quibusdam est ab nesciunt porro culpa quod temporibus velit delectus vel iste!
					Nesciunt, doloremque? Vitae itaque obcaecati illum?
				</p>
			</section>
		</section>
	</div>
</main>

<style lang="scss">
	@import "$static/stylesheets/guideline";

	main {
		position: relative;
		width: 100%;
		height: fit-content;
		max-width: 1100px;

		display: flex;
		column-gap: 100px;

		padding: 0px 20px;

		#sidebar {
			position: sticky;
			top: $navbar-height;

			width: 350px;
			height: 100%;

			display: flex;
			flex-direction: column;
			row-gap: 25px;
			padding-top: 70px;

			#back-to-profile {
				color: $primary;
				display: flex;
				align-items: center;
				column-gap: 7px;
				text-decoration: none;

				#back {
					display: block;
					color: inherit;
					height: 20px;
				}
				p {
					transform: translateY(0.4px);
					color: inherit;
				}

				@media (hover: hover) {
					&:hover {
						color: $tertiary;
					}
				}
			}

			#greet {
				width: 100%;

				display: flex;
				align-items: center;
				column-gap: 15px;

				padding-top: 20px;

				#avatar {
					height: 48px;
				}
				#name {
					color: $black;
				}
			}

			#settings-menu {
				display: flex;
				flex-direction: column;
				row-gap: 30px;
				padding: 10px 0px;

				a {
					display: flex;
					align-items: center;

					column-gap: 14px;
					text-decoration: none;
					color: $tertiary;

					font-weight: 600;
					transition: 500ms $out-generic-expo;
					transition-property: transform, color;

					transform-origin: left;

					#icon {
						display: block;
						height: 22px;
					}
					#text {
						color: inherit;
						font-weight: inherit;
						font-size: 18px;
					}

					&#signout {
						color: $quaternary;

						&:hover {
							color: $red;
						}
					}

					&.active {
						color: $black;
						transform: scale(115%);

						&#signout {
							color: $red;
						}
					}
					&:hover {
						transition:
							transform 500ms $out-generic-expo,
							color 200ms $out-generic-expo;
						color: $primary;
					}
				}
			}

			hr {
				width: 100%;
				height: 1px;
				border: none;
				background-color: $quaternary;

				margin: 0px;
			}
		}

		#settings {
			display: flex;
			flex-direction: column;
			padding-top: 65px;

			.section {
				display: flex;
				flex-direction: column;
				row-gap: 40px;

				#body {
					display: flex;
					flex-direction: column;
					row-gap: 20px;
				}
			}
		}
	}
</style>
