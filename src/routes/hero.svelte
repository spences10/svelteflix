<script lang="ts">
	import { media } from '$lib/api';
	import type { MovieDetails } from '$lib/types';

	export let movie: MovieDetails;

	$: images = movie.images;
	$: backdrop =
		images.backdrops.find((image) => !image.iso_639_1) ||
		images.backdrops[0];
	$: logo =
		images.logos.find((image) => image.iso_639_1 === 'en') ||
		images.logos[0];
</script>

<a class="column" href="/movies/{movie.id}">
	<img
		class="backdrop"
		src={media(backdrop?.file_path, 1280)}
		alt={movie.title}
		style="aspect-ratio: {backdrop?.aspect_ratio}"
	/>
	<img
		class="logo"
		src={media(logo?.file_path, 1280)}
		alt={movie.title}
		style="aspect-ratio: {backdrop?.aspect_ratio}"
	/>
</a>

<style>
	a {
		display: flex;
	}
	.backdrop {
		width: 100%;
	}
	.logo {
		position: absolute;
		top: 0;
		left: 1rem;
		height: 100%;
		width: 30%;
		object-fit: contain;
		filter: drop-shadow(0 0 1rem rgba(0, 0, 0, 0.5));
	}
</style>
