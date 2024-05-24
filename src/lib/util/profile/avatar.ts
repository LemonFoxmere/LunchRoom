/**
 * Get the high-res version of an image url depending on the provider used.
 *
 * @param url
 * @param targetDim
 * @param provider
 */
export const getHighResURL = (url: string, targetDim: number) => {
	// determine the provider based on the url
	let provider = "";
	const domain = url.split("/")[2];

	if (domain.includes("discord")) {
		provider = "discord";
	} else if (domain.includes("google")) {
		provider = "google";
	} else if (domain.includes("twimg")) {
		provider = "twitter";
	}

	switch (provider) {
		case "google":
			return url.replace(/s[0-9]+-c/g, `s${targetDim}-c`);
		case "discord":
			if (/\?size=[0-9]+/g.test(url)) {
				return url.replace(/\?size=[0-9]+/g, `?size=${targetDim}`);
			} else {
				return `${url}?size=${targetDim}`;
			}
		case "twitter":
			return url.replace(/_(normal|mini|bigger)/g, "");
		default:
			return `${url}?size=${targetDim}&s=${targetDim}&sz=${targetDim}`;
	}
};
