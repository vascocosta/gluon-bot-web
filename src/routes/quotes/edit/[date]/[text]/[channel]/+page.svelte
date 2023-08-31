<script lang="ts">
	export let data;
	import { API_URL } from '../../../../../../constants/constants';
	import { onMount } from 'svelte';
	import { statusText } from '$lib/utils';

	let apiKey: string = '';
	let channel: string = data.channel;
	let date: string = data.date;
	let result: string = '';
	let text: string = data.text;

	onMount(() => {
		apiKey = localStorage.getItem('apiKey')?.toString() || '';
	});

	async function updateQuote(): Promise<void> {
		//alert(`search: ${data.text} | new: ${text}`);
		try {
			const response = await fetch(`${API_URL}/quotes/delete`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					'x-api-key': apiKey
				},
				body: JSON.stringify({
					date: data.date,
					text: data.text,
					channel: data.channel
				})
			});

			if (!response.ok) {
				alert(`Quote could not be updated. (${response.status} ${statusText(response.status)})`);

				return;
			}
		} catch (error: unknown) {
			if (error instanceof TypeError || error instanceof DOMException || error instanceof Error) {
				result = `Quote could not be updated. (${error.message})`;
			} else {
				result = 'Quote could not be updated. (Unknown error)';
			}
		}

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
				result = 'Quote updated successfully';
			} else {
				result = `Quote could not be updated. (${response.status} ${statusText(response.status)})`;
			}
		} catch (error: unknown) {
			if (error instanceof TypeError || error instanceof DOMException || error instanceof Error) {
				result = `Quote could not be updated. (${error.message})`;
			} else {
				result = 'Quote could not be updated. (Unknown error)';
			}
		}
	}
</script>

<div>{result}</div>
<form id="quoteForm" on:submit|preventDefault={updateQuote}>
	<label for="date">Date:</label>
	<input type="text" id="date" name="date" bind:value={date} />

	<label for="text">Text:</label>
	<input type="text" id="text" name="text" bind:value={text} />

	<label for="channel">Channel:</label>
	<input type="text" id="channel" name="channel" bind:value={channel} />

	<input type="submit" value="Update" />
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
