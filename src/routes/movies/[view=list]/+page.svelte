<script lang="ts">
	import * as api from '$lib/api';
	import ResultsPage from '$lib/components/results-page.svelte';

	export let data;

	let appending = false;
</script>

<div class="column">
	<h1>{data.title}</h1>

	<ResultsPage
		movies={data.movies}
		next={data.next_page
			? `/movies/{data.view}?page={data.next_page}`
			: null}
		on:load-more={async () => {
			if (!data.next_page || appending) return;

			const next = await api.get(fetch, data.endpoint, {
				page: String(data.next_page),
			});

			data.movies = [...data.movies, ...next.results];
			data.next_page =
				next.next_page < next.total_pages ? next.next_page + 1 : null;
		}}
	/>
</div>

<style>
	.column {
		display: flex;
		flex-direction: column;
		height: 100%;
	}
</style>
