<script lang="ts">
	export let name: string;

	export let views: number;
	export let earning: number;
	export let slots: number;
	export let slotsTaken: number;
	export let closed: boolean;
	export let suspended: boolean;

	let filled: boolean;
	$: filled = slots === slotsTaken;

	let postStatus: "warning" | "success" | "error";
	$: postStatus = suspended ? "error" : filled ? "warning" : "success";
</script>

<main class={closed ? "closed" : ""}>
	<img id="thumbnail" class="no-drag" src="/images/card-3.jpg" alt="" />

	<section id="content-container">
		<section id="title-container">
			<section id="text-container">
				{#if !closed}
					<!-- show a status light if the post isn't closed -->
					<div id="status-light" class="{postStatus}-bg" />
				{/if}

				<section id="title-text-container">
					<h1 id="title">{name}</h1>
					{#if closed}
						<p>closed</p>
					{/if}
				</section>
			</section>

			<div id="stats-container">
				<!-- Views -->
				<div id="views">
					<svg width="24px" height="24px" viewBox="0 0 24 24" version="1.1">
						<g
							stroke="none"
							stroke-width="1"
							fill="none"
							fill-rule="evenodd"
							stroke-linecap="round"
							stroke-linejoin="round"
						>
							<g transform="translate(2, 5)" stroke="currentColor" stroke-width="2.15">
								<path
									d="M0.0517584939,7.822 C-0.0172528313,7.61458986 -0.0172528313,7.39041014 0.0517584939,7.183 C1.43875849,3.01 5.37575849,0 10.0157585,0 C14.6537585,0 18.5887585,3.007 19.9787585,7.178 C20.0487585,7.385 20.0487585,7.609 19.9787585,7.817 C18.5927585,11.99 14.6557585,15 10.0157585,15 C5.37775849,15 1.44275849,11.993 0.0527584939,7.822 L0.0517584939,7.822 Z"
									id="Path"
								></path>
								<path
									d="M13.0157585,7.5 C13.0157585,9.15685425 11.6726127,10.5 10.0157585,10.5 C8.35890424,10.5 7.01575849,9.15685425 7.01575849,7.5 C7.01575849,5.84314575 8.35890424,4.5 10.0157585,4.5 C11.6726127,4.5 13.0157585,5.84314575 13.0157585,7.5 L13.0157585,7.5 Z"
									id="Path"
								></path>
							</g>
						</g>
					</svg>
					<p>{views ?? 0}</p>
				</div>

				<!-- Total money made -->
				<div id="money">
					<svg width="24px" height="24px" viewBox="0 0 24 24" version="1.1">
						<g
							stroke="none"
							stroke-width="1"
							fill="none"
							fill-rule="evenodd"
							stroke-linecap="round"
							stroke-linejoin="round"
						>
							<path
								d="M3,17.5888345 C7.92517573,17.5848421 12.8289327,18.2371162 17.5818462,19.5284598 C18.2529231,19.71125 18.9230769,19.2127313 18.9230769,18.5166516 L18.9230769,17.5888345 M4.38461538,4.43349907 L4.38461538,5.12588612 C4.38461538,5.50828092 4.07465867,5.81827316 3.69230769,5.81827316 L3,5.81827316 M3,5.81827316 L3,5.47207964 C3,4.89878317 3.46523077,4.43349907 4.03846154,4.43349907 L19.6153846,4.43349907 M3,5.81827316 L3,14.1269177 M19.6153846,4.43349907 L19.6153846,5.12588612 C19.6153846,5.50808377 19.9255385,5.81827316 20.3076923,5.81827316 L21,5.81827316 M19.6153846,4.43349907 L19.9615385,4.43349907 C20.5347692,4.43349907 21,4.89878317 21,5.47207964 L21,14.4731112 C21,15.0464077 20.5347692,15.5116918 19.9615385,15.5116918 L19.6153846,15.5116918 M21,14.1269177 L20.3076923,14.1269177 C19.9253413,14.1269177 19.6153846,14.4369099 19.6153846,14.8193047 L19.6153846,15.5116918 M19.6153846,15.5116918 L4.38461538,15.5116918 M4.38461538,15.5116918 L4.03846154,15.5116918 C3.46493507,15.5116918 3,15.0467034 3,14.4731112 L3,14.1269177 M4.38461538,15.5116918 L4.38461538,14.8193047 C4.38461538,14.4369099 4.07465867,14.1269177 3.69230769,14.1269177 L3,14.1269177 M14.7692308,9.97259543 C14.7692308,11.5021747 13.5294039,12.7421436 12,12.7421436 C10.4705961,12.7421436 9.23076923,11.5021747 9.23076923,9.97259543 C9.23076923,8.44301621 10.4705961,7.20304725 12,7.20304725 C13.5294039,7.20304725 14.7692308,8.44301621 14.7692308,9.97259543 L14.7692308,9.97259543 Z"
								stroke="currentcolor"
								stroke-width="1.75"
							></path>
						</g>
					</svg>
					<p>${Math.round(earning * 100) / 100 ?? 0}</p>
				</div>

				<!-- Slots -->
				<div id="slots">
					<svg width="24px" height="24px" viewBox="0 0 24 24" version="1.1">
						<g
							stroke="none"
							stroke-width="1"
							fill="none"
							fill-rule="evenodd"
							stroke-linecap="round"
							stroke-linejoin="round"
						>
							<path
								d="M14.7697206,18.579433 C15.5570525,18.8080304 16.372862,18.9236423 17.192708,18.922814 C18.5111849,18.9247121 19.8125225,18.6240877 20.9965674,18.0440682 C21.0684905,16.344199 20.0039311,14.8029196 18.3886965,14.2683677 C16.773462,13.7338157 14.9996212,14.335744 14.0432859,15.7429225 M14.7697206,18.579433 L14.7697206,18.5766639 C14.7697206,17.5493173 14.5066534,16.5828914 14.044209,15.7429225 M14.7697206,18.579433 L14.7697206,18.6772756 C12.993306,19.7471695 10.9581184,20.3108679 8.88439967,20.3073854 C6.73278687,20.3073854 4.7196305,19.7120066 3.00092479,18.6772756 L3.00000087,18.5766639 C2.99854477,15.8889217 4.81842955,13.5417752 7.42182785,12.8737351 C10.0252262,12.2056949 12.7504104,13.3865623 14.0432859,15.7429225 M12.0005922,6.80786807 C12.0005922,8.5283839 10.6058385,9.92313756 8.88532271,9.92313756 C7.16480688,9.92313756 5.77005322,8.5283839 5.77005322,6.80786807 C5.77005322,5.08735225 7.16480688,3.69259859 8.88532271,3.69259859 C10.6058385,3.69259859 12.0005922,5.08735225 12.0005922,6.80786807 Z M19.6156954,8.8847144 C19.6156954,10.2228934 18.530887,11.3077018 17.192708,11.3077018 C15.854529,11.3077018 14.7697206,10.2228934 14.7697206,8.8847144 C14.7697206,7.54653542 15.854529,6.46172702 17.192708,6.46172702 C18.530887,6.46172702 19.6156954,7.54653542 19.6156954,8.8847144 L19.6156954,8.8847144 Z"
								id="Shape"
								stroke="currentcolor"
								stroke-width="1.9"
							></path>
						</g>
					</svg>
					<p>{slotsTaken ?? 0}/{slots ?? 0}</p>
				</div>
			</div>
		</section>

		<section id="cta">
			<button id="detail" class="small">View</button>

			<!-- only show the button if the commission isn't closed -->
			{#if !closed}
				<button id="edit" class="small">Share</button>
			{/if}
		</section>
	</section>
</main>

<style lang="scss">
	@import "$static/stylesheets/guideline";

	main {
		position: relative;

		// margin-top: 35px;
		display: flex;
		flex-direction: column;

		height: fit-content;
		box-sizing: border-box;

		overflow: hidden;

		&.closed {
			opacity: 0.5;
			transition: 150ms opacity linear;

			&:hover {
				opacity: 1;
			}
		}

		#content-container {
			padding: 25px;
			box-sizing: border-box;

			border: 1.5px solid $quaternary;
			border-radius: 0px 0px 18px 18px;
			border-top: none;

			display: flex;
			justify-content: space-between;
			align-items: center;

			#title-container {
				display: flex;
				flex-direction: column;

				min-width: 0px;
				margin-right: 25px;

				#text-container {
					display: flex;
					align-items: center;

					#status-light {
						width: 14px;
						min-width: 14px;
						height: 14px;
						min-height: 14px;
						border-radius: 100%;

						margin-right: 15px;
					}

					#title-text-container {
						display: flex;
						flex-direction: column;
						align-items: flex-start;
						margin-bottom: 10px;

						width: fit-content;

						#title {
							font-weight: 700;
							font-size: 36px;

							width: 100%;
							height: 42px;
							margin-bottom: 2px;

							white-space: nowrap;
							overflow-x: hidden;
							text-overflow: ellipsis;
						}
					}
				}

				#stats-container {
					display: flex;
					align-items: center;
					justify-content: flex-start;
					margin-top: 2px;

					flex-wrap: wrap;
					row-gap: 10px;
					column-gap: 22px;

					color: $tertiary;

					div {
						display: flex;
						align-items: center;

						svg {
							height: 22px;
							width: auto;
							margin-right: 10px;
						}
						p {
							font-weight: 600;
							color: inherit;
						}

						&#money {
							transform: translateX(3px);
						}
					}
				}
			}

			#cta {
				display: flex;
				#detail {
					margin-right: 5px;
				}
			}
		}

		#thumbnail {
			display: block;

			width: 100%;
			height: auto;
			min-height: 300px;
			max-height: calc(100vh - 300px);
			object-fit: cover;

			border-radius: 18px 18px 0px 0px;
		}

		@media screen and (max-width: $tablet-width) {
			&.closed {
				#content-container {
					#title-container {
						margin-right: 0px;
					}
				}
			}

			#content-container {
				padding: 20px;
				flex-direction: column;

				#title-container {
					width: 100%;

					align-items: center;

					#text-container {
						width: 100%;

						justify-content: center;

						#status-light {
							margin: 0px 15px;
						}

						#title-text-container {
							align-items: center;

							#title {
								width: fit-content;
								text-align: center;
								margin-top: 10px;
							}
						}
					}
				}

				#cta {
					width: 100%;
					margin-top: 15px;

					button {
						width: 100%;
					}
				}
			}

			#thumbnail {
				min-height: 220px;
			}
		}

		@media screen and (max-width: $mobile-width) {
			&.closed {
				#content-container {
					#title-container {
						margin: 0px;
					}
				}
			}

			#content-container {
				width: 100%;
				padding: 20px;

				height: fit-content;
				min-height: 0;

				border-left: 1.5px solid $quaternary;
				border-top: none;
				border-radius: 0px 0px 18px 18px;

				#title {
					font-size: 32px;
					margin-top: 10px;
				}

				#cta {
					width: 100%;
					display: flex;
					margin-top: 30px;

					button {
						width: 100%;

						font-size: 16px;
					}

					#detail {
						margin-right: 10px;
					}
				}
			}

			#thumbnail {
				border-radius: 18px 18px 0px 0px;
				width: 100%;
				min-height: 0px;
				height: auto;
				aspect-ratio: 1.382/1;
			}
		}
	}
</style>
