<script lang="ts">
	import ResultsPage from '$lib/components/results-page.svelte';

	export let data;
</script>

<div class="column">
	<h1>Search</h1>

	<form>
		<input
			type="text"
			name="query"
			value={data.query}
			autocomplete="off"
			spellcheck="false"
		/>
	</form>

	{#if data.query}
		<ResultsPage movies={data.movies} next={null} />
	{/if}
</div>

<style>
	input {
		font-family: inherit;
		font-size: 2em;
		padding: 0.5em;
		width: 100%;
		background: rgba(225, 225, 225, 0.1);
		border: none;
		border-radius: 0.2em;
		color: inherit;
	}

	input:focus-visible {
		outline: 2px solid var(--accent);
	}
</style>
