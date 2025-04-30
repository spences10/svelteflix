<script lang="ts">
	import { media } from '$lib/api';
	import type { MovieListResult } from '$lib/types';
	import { createEventDispatcher, onMount } from 'svelte';

	interface Props {
		movies: MovieListResult[];
		next: string | null;
	}

	let { movies, next }: Props = $props();

	const dispatch = createEventDispatcher();

	let viewport: HTMLElement = $state();
	let results: HTMLElement = $state();
	let item_width: number;
	let item_height: number;
	let num_columns = 4;

	let a = $state(0);
	let b = $state(movies.length);
	let padding_top = $state(0);
	let padding_bottom = $state(0);

	const handle_resize = () => {
		const first = results.firstChild as HTMLAnchorElement;

		item_width = first.offsetWidth;
		item_height = first.offsetHeight;
		num_columns = 4;

		handle_scroll();
	};
	const handle_scroll = () => {
		const remaining =
			viewport.scrollHeight -
			(viewport.scrollTop + viewport.clientHeight);

		if (remaining < 400) {
			dispatch('load-more');
		}

		a = Math.floor(viewport.scrollTop / item_height) * num_columns;
		b =
			Math.ceil(
				(viewport.scrollTop + viewport.clientHeight) / item_height
			) * num_columns;

		padding_top = Math.floor(a / num_columns) * item_height;
		padding_bottom =
			Math.floor((movies.length - b) / num_columns) * item_height;
	};

	onMount(handle_resize);
</script>

<svelte:window onresize={handle_resize} />

<div bind:this={viewport} onscroll={handle_scroll} class="viewport">
	<div
		bind:this={results}
		class="results"
		style:padding-top="{padding_top}px"
		style:padding-bottom="{padding_bottom}px"
	>
		{#each movies.slice(a, b) as movie}
			<a href="/movies/{movie.id}">
				<img src={media(movie.poster_path, 500)} alt={movie.title} />
			</a>
		{/each}

		{#if next}
			<a href={next}>next page</a>
		{/if}
	</div>
</div>

<style>
	.viewport {
		overflow-y: auto;
	}
	.results {
		display: grid;
		grid-template-columns: repeat(4, 1fr);
		width: 100%;
	}

	a {
		height: 100%;
		height: auto;
		aspect-ratio: 2/3;
		padding: 0.5rem;
	}

	img {
		height: 100%;
		width: 100%;
		object-fit: cover;
	}
</style>
