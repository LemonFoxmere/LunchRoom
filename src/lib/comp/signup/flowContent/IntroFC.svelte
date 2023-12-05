<h1>Welcome to LunchRoom!</h1>
<p>Click the right arrow to start creating your account.</p>

<a id="signin" href="/signin"> Nevermind, I already have an account </a>

<style lang="scss">
	@import "$static/stylesheets/guideline";

	h1 {
		margin-bottom: 10px;
	}

	#signin {
		position: fixed;
		// we have to do this weird shit instead of just setting a bottom cuz of how the parent is structured
		transform: translateY(calc(100vh / 2 - 50% - 24px));

		font-size: 16px;
		font-weight: 400;
		color: $quaternary;
	}
</style>
