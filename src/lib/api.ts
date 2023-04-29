export const base = 'https://api.movies.tastejs.com';
export const media_base = 'https://image.tmdb.org/t/p';

const cache = new Map();

export const get = async (
	fetch: typeof globalThis.fetch,
	endpoint: string,
	params?: Record<string, string>
) => {
	const query = new URLSearchParams(params);
	const url = `${base}/${endpoint}?${query}`;

	if (cache.has(url)) {
		return cache.get(url);
	}

	const response = await fetch(url);
	const data = await response.json();

	cache.set(url, data);

	return data;
};

export const media = (file_path: string, width: number) => {
	return `${media_base}/w${width}${file_path}`;
};
