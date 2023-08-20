<script lang="ts">
	import { API_URL } from '../../constants/constants';
	import { onMount } from 'svelte';
	import { statusText } from '$lib/utils';
	import type { Quote } from '../../types/types';

	let apiKey: string = '';
	let date: string = '';
	let channel: string = '';
	let quotes: Promise<Quote[]> = Promise.resolve([]);
	let result: string = '';
	let text: string = '';

	onMount(() => {
		quotes = fetchQuotes();
		apiKey = localStorage.getItem('apiKey')?.toString() || '';
	});

	function clearInputs() {
		date = '';
		text = '';
		channel = '';
		quotes = fetchQuotes();
	}

	async function handleDelete(quote: Quote): Promise<void> {
		try {
			if (
				confirm(
					`Are you sure you want to delete this quote?\n` +
						`Date: ${quote.date}\n` +
						`Text: ${quote.text}\n` +
						`Channel: ${quote.channel}`
				)
			) {
				const response = await fetch(`${API_URL}/quotes/delete`, {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
						'x-api-key': apiKey
					},
					body: JSON.stringify(quote)
				});

				if (!response.ok) {
					alert(`Could not delete quote. (${response.status} ${statusText(response.status)})`);

					return;
				}

				result = 'Quote deleted successfully.';
				quotes = fetchQuotes();
			}
		} catch (error: unknown) {
			if (error instanceof TypeError || error instanceof DOMException || error instanceof Error) {
				result = `Quote could not be deleted. (${error.message})`;
			} else {
				result = 'Quote could not be deleted. (Unknown error)';
			}
		}
	}

	function handleEdit(quote: Quote) {
		alert('Coming soon...');
	}

	function handleSearch() {
		quotes = fetchQuotes();
	}

	async function fetchQuotes(): Promise<Quote[]> {
		const response = await fetch(`${API_URL}/quotes?date=${date}&text=${text}&channel=${channel}`);

		if (!response.ok) {
			throw new Error(`Could not fetch data. (${response.status} ${statusText(response.status)})`);
		}

		return response.json();
	}
</script>

<div>{result}</div>
<form id="quoteForm" on:submit|preventDefault={handleSearch}>
	<label for="date">Date:</label>
	<input type="text" id="date" name="date" bind:value={date} on:keyup={handleSearch} />

	<label for="text">Nick/Text:</label>
	<input type="text" id="text" name="text" bind:value={text} on:keyup={handleSearch} />

	<label for="channel">Channel:</label>
	<input type="text" id="channel" name="channel" bind:value={channel} on:keyup={handleSearch} />

	<input type="button" value="Clear" on:click={clearInputs} />
	<input type="submit" value="Search" />
	|
	<button><a href="/quotes/add">Add Quote</a></button>
</form>
<table>
	<thead>
		<tr>
			<th>Date</th>
			<th>Nick/Text</th>
			<th>Channel</th>
			<th>Actions</th>
		</tr>
	</thead>
	<tbody>
		{#await quotes}
			<p>Fetching quotes...</p>
		{:then quotes}
			{#each quotes.reverse() as quote (quote.text)}
				<tr>
					<td>{quote.date}</td>
					<td>{quote.text}</td>
					<td>{quote.channel}</td>
					<td
						><button on:click={() => handleDelete(quote)}>Delete</button>
						<button on:click={() => handleEdit(quote)}>⠀Edit⠀</button></td
					>
				</tr>
			{/each}
		{:catch error}
			<p>Could not fetch quotes. ({error.message})</p>
		{/await}
	</tbody>
</table>

<style>
	td:nth-child(1) {
		width: 10%;
	}

	td:nth-child(2) {
		width: 60%;
	}

	td:nth-child(3) {
		width: 10%;
	}

	td:nth-child(4) {
		width: 20%;
	}
</style>
