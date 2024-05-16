/**
 * Get the high-res version of an image url depending on the provider used.
 *
 * @param url
 * @param targetDim
 * @param provider
 */
export const getHighResURL = (url: string, targetDim: number, provider: string | null) => {
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
