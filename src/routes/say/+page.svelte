<script lang="ts">
	import { API_URL } from '../../constants/constants';
	import { onMount } from 'svelte';
	import { statusText } from '$lib/utils';

	let apiKey: string = '';
	let body: string = '';
	let channel: string = '';
	let result: string = '';

	onMount(() => {
		apiKey = localStorage.getItem('apiKey')?.toString() || '';
	});

	async function sayMessage(): Promise<void> {
		try {
			let response = await fetch(`${API_URL}/say`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					'x-api-key': apiKey
				},
				body: JSON.stringify({
					channel: channel,
					body: body
				})
			});

			if (response.ok) {
				result = 'Message sent successfully.';
				body = '';
			} else {
				result = `Could not send message. (${response.status} ${statusText(response.status)})`;
			}
		} catch (error: unknown) {
			if (error instanceof TypeError || error instanceof DOMException || error instanceof Error) {
				result = `Message could not be sent. (${error.message})`;
			} else {
				result = 'Message could not be sent. (Unknown error)';
			}
		}
	}
</script>

<div>{result}</div>
<form id="sayForm" on:submit|preventDefault={sayMessage}>
	<label for="channel">Channel:</label>
	<input type="text" id="channel" name="channel" bind:value={channel} />

	<label for="body">Body:</label>
	<input type="text" id="body" name="body" bind:value={body} />

	<input type="submit" value="Send" />
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
