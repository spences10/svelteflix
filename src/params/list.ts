import { views } from '$lib/views';

export const match = (param) => {
	return param in views;
};
