<script lang="ts">
	import { media } from '$lib/api';
	import type { MovieListResult } from '$lib/types';
	import type { View } from '$lib/views';

	interface Props {
		movies: MovieListResult[];
		view: View;
		href?: string | null;
	}

	let { movies, view, href = null }: Props = $props();
</script>

<h2 class="column">
	{view.title}
	{#if href}
		<a {href}>see all</a>
	{/if}
</h2>

<div class="carousel">
	{#each movies as movie}
		<a href="/movies/{movie.id}">
			<img src={media(movie.poster_path, 500)} alt={movie.title} />
		</a>
	{/each}
</div>

<style>
	.carousel {
		--padding: max(
			var(--side),
			calc(var(--side) + (100vw - var(--column)) / 2)
		);
		display: flex;
		height: 10rem;
		gap: 1rem;
		overflow-x: scroll;
		scroll-snap-type: x mandatory;
		scroll-padding-left: var(--padding);
		padding: 0 var(--padding);
	}

	.carousel::-webkit-scrollbar {
		display: none;
	}

	a {
		height: 100%;
	}

	img {
		height: 100%;
		width: auto;
		object-fit: cover;
	}
</style>
