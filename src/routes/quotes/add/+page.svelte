<script lang="ts">
	import { API_URL } from '../../../constants/constants';
	import { onMount } from 'svelte';
	import { statusText } from '$lib/utils';

	let apiKey: string = '';
	let channel: string = '';
	let date: string = '';
	let result: string = '';
	let text: string = '';

	onMount(() => {
		apiKey = localStorage.getItem('apiKey')?.toString() || '';
	});

	async function addQuote(): Promise<void> {
		try {
			const response = await fetch(`${API_URL}/quotes/add`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					'x-api-key': apiKey
				},
				body: JSON.stringify({
					date: date,
					text: text,
					channel: channel
				})
			});

			if (response.ok) {
				result = 'Quote added successfully';
			} else {
				result = `Quote could not be added. (${response.status} ${statusText(response.status)})`;
			}
		} catch (error: unknown) {
			if (error instanceof TypeError || error instanceof DOMException || error instanceof Error) {
				result = `Quote could not be added. (${error.message})`;
			} else {
				result = 'Quote could not be added. (Unknown error)';
			}
		}
	}
</script>

<div>{result}</div>
<form id="quoteForm" on:submit|preventDefault={addQuote}>
	<label for="date">Date:</label>
	<input type="text" id="date" name="date" bind:value={date} />

	<label for="text">Text:</label>
	<input type="text" id="text" name="text" bind:value={text} />

	<label for="channel">Channel:</label>
	<input type="text" id="channel" name="channel" bind:value={channel} />

	<input type="submit" value="Add" />
</form>

<style>
	form {
		display: grid;
		gap: 10px;
		width: 25%;
		margin-bottom: 20px;
		font-family: Arial, sans-serif;
	}

	label {
		display: block;
	}
</style>
