<script lang="ts">
	import { page } from '$app/state';
	import logo from '$lib/images/logo.svg';
	import tmdb from '$lib/images/tmdb.svg';
	import '../styles.css';
	interface Props {
		children?: import('svelte').Snippet;
	}

	let { children }: Props = $props();
</script>

<nav>
	<a href="/">
		<img src={logo} alt="svelteflix" />
	</a>

	<div class="links">
		<a href="/search">Search</a>
		<a href="/watchlist">Watchlist</a>
		<a href="/login">Login</a>
	</div>
</nav>

<main class:infinite={page.data.infinite}>
	{@render children?.()}
</main>

<footer>
	<p>
		Data provided by
		<a href="https://www.themoviedb.org/" target="_blank">
			<img src={tmdb} alt="tmdb logo" />
		</a>
	</p>
</footer>

<style>
	nav {
		display: flex;
		width: 100%;
		height: 3rem;
		align-items: center;
		justify-content: space-between;
		max-width: var(--column);
		padding: 0 var(--side);
		color: var(--accent);
	}

	a {
		color: inherit;
		text-decoration: none;
	}

	img {
		height: 1rem;
	}

	.links {
		display: flex;
		gap: 1rem;
	}

	main.infinite {
		height: 0;
		flex: 1;
		overflow: hidden;
	}

	footer {
		display: flex;
		justify-content: center;
		height: 5rem;
	}
</style>
