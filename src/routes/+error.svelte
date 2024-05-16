<script lang="ts">
	import { page } from "$app/stores";
	import LoadingSpinner from "./../lib/comp/ui/general/LoadingSpinner.svelte";

	const reload = () => {
		window.location.reload();
	};

	const NotFoundMessageChain: string[] = [
		"Sorry, but we couldn't find what you're looking for.",
		"It's sad, we know. A true tragedy.",
		"...",
		"We can look again for you if you wanna.",
		"Give us a sec...",
		"...",
		"......",
		".........",
		"*paper shuffling sounds*",
		"*paper shuffling sounds*",
		"*paper shuffling sounds*",
		"*louder paper shuffling sounds*",
		"*in the distance* bella... what's in your mouth?",
		"*dog runs while someone chases*",
		"*struggling*",
		"*struggling intensifies*",
		"*something dashes out the door*",
		"*in the distance* COME BACK HERE",
		"...",
		"*footsteps back*",
		"Yeah nah we found nothing.",
		"...",
		"Aw don't be sad :c",
		"You can always go to the home page...",
		"...",
		"...",
		"...",
		"...please?"
	];
	let idx: number = 0;
	const show404MessageChain = () => {
		if (idx < NotFoundMessageChain.length - 1) idx++;
	};
</script>

<main>
	<div id="cat">
		{#if idx >= 4 && idx <= 19}
			<LoadingSpinner />
		{:else}
			<img src="https://http.cat/{$page.status}" alt="" />
		{/if}
	</div>

	<section id="message">
		{#if $page.status === 404}
			<section class="error-msg-container" id="not-found">
				<h1>{NotFoundMessageChain[idx]}</h1>
			</section>
		{:else if $page.status === 500}
			<section class="error-msg-container">
				<h1>Yikes! Something went wrong on our side.</h1>
				<p>Sorry about that, there was a cat in our server. Give us a sec and try again.</p>
			</section>
		{:else}
			<section class="error-msg-container">
				<h1>Sorry, but we couldn't process your request.</h1>
			</section>
		{/if}

		<section id="cta">
			<a id="return" href="/">
				<button class="solid">Return Home</button>
			</a>
			{#if $page.status === 500}
				<button on:click={reload}>Try Again</button>
			{:else if $page.status === 404}
				{#if idx < 27}
					<button on:click={show404MessageChain}>
						{#if idx === 3}
							:D
						{:else if idx >= 4 && idx < 10}
							:3
						{:else if idx >= 10 && idx < 14}
							:|
						{:else if idx >= 14 && idx < 20}
							...
						{:else if idx === 20}
							Damn
						{:else}
							:(
						{/if}
					</button>
				{:else}
					<a id="return" href="/">
						<button class="solid">Return Home</button>
					</a>
				{/if}
			{/if}
		</section>
	</section>
</main>

<style lang="scss">
	@import "$static/stylesheets/guideline";

	main {
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, calc(-50% + $navbar-height/2));
		width: 100%;
		height: calc(100% - $navbar-height);

		padding: 0px 20px;

		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		row-gap: 50px;

		#cat {
			width: 300px;
			height: 300px;

			display: flex;
			justify-content: center;
			align-items: center;

			border-radius: 8px;
			overflow: hidden;

			img {
				display: block;
				height: 300px;
				transform: translate(0px, 12.5%) scale(155%);
			}
		}

		#message {
			width: fit-content;
			max-width: 100%;

			display: flex;
			flex-direction: column;

			justify-content: center;
			align-items: center;

			row-gap: 42px;

			.error-msg-container {
				width: min-content;
				max-width: 100%;

				display: flex;
				justify-content: center;
				align-items: center;
				flex-direction: column;

				row-gap: 15px;

				h1 {
					width: max-content;
					max-width: 100%;
					text-align: center;
				}
				p {
					font-size: 18px;
					line-height: 22px;
					text-align: center;
				}
			}

			#cta {
				display: flex;
				column-gap: 10px;
			}
		}

		@media screen and (max-width: $mobile-width) {
			max-height: calc(100vh - $navbar-height - $urlbar-height);
		}
	}
</style>
