<script lang="ts">
	import { API_URL } from '../../../constants/constants';
	import { onMount } from 'svelte';
	import { statusText } from '$lib/utils';

	let apiKey: string = '';
	let category: string = '';
	let channel: string = '';
	let datetime: string = '';
	let description: string = '';
	let name: string = '';
	let notify: boolean = false;
	let result: string = '';
	let tags: string = '';
	let checked: boolean = notify === 'true' ? true : false;

	onMount(() => {
		apiKey = localStorage.getItem('apiKey')?.toString() || '';
	});

	async function addEvent(): Promise<void> {
		try {
			const response = await fetch(`${API_URL}/events/add`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					'x-api-key': apiKey
				},
				body: JSON.stringify({
					category: category,
					name: name,
					description: description,
					datetime: datetime + ':00Z',
					channel: channel,
					tags: tags,
					notify: checked
				})
			});

			if (response.ok) {
				result = 'Event added successfully';
			} else {
				result = `Event could not be added. (${response.status} ${statusText(response.status)})`;
			}
		} catch (error: unknown) {
			if (error instanceof TypeError || error instanceof DOMException || error instanceof Error) {
				result = `Event could not be added. (${error.message})`;
			} else {
				result = 'Event could not be added. (Unknown error)';
			}
		}
	}
</script>

<div>{result}</div>
<form id="eventForm" on:submit|preventDefault={addEvent}>
	<label for="category">Category:</label>
	<input type="text" id="category" name="category" bind:value={category} />

	<label for="name">Name:</label>
	<input type="text" id="name" name="name" bind:value={name} />

	<label for="description">Description:</label>
	<input type="text" id="description" name="description" bind:value={description} />

	<label for="datetime">Date/Time:</label>
	<input type="datetime-local" id="datetime" name="datetime" bind:value={datetime} />

	<label for="channel">Channel:</label>
	<select id="channel" name="channel" bind:value={channel}>
		<option value="#formula1" selected>#formula1</option>
		<option value="#geeks">#geeks</option>
		<option value="#nerds">#nerds</option>
	</select>

	<label for="tags">Tags:</label>
	<input type="text" id="tags" name="tags" bind:value={tags} />

	<label for="notify">Notify:</label>
	<input type="checkbox" id="notify" name="notify" bind:value={notify} />

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
