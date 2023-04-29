export interface View {
	title: string;
	endpoint: string;
}

export const views: Record<string, View> = {
	trending: {
		title: 'Trending',
		endpoint: 'trending/movie/day',
	},
	now_playing: {
		title: 'Now Playing',
		endpoint: 'movie/now_playing',
	},
	upcoming: {
		title: 'Upcoming',
		endpoint: 'movie/upcoming',
	},
};
