<script lang="ts">
	import { onMount } from 'svelte';

	const URL: string = 'https://vettel.gluonspace.com/api/events/add';

	let result: string = '';
	let category: string = '';
	let name: string = '';
	let description: string = '';
	let datetime: string = '';
	let channel: string = '';
	let tags: string = '';
	let notify: boolean = false;
	let apiKey: string;

	onMount(() => {
		apiKey = localStorage.getItem('apiKey') !== null ? localStorage.getItem('apiKey')! : '';
	});

	async function addEvent() {
		try {
			const response = await fetch(URL, {
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
					notify: true
				})
			});

			if (response.ok) {
				result = 'Event added successfully';
			} else {
				result = `Event could not be added. (Error: ${response.status})`;
			}
		} catch (error) {
			result = `Event could not be added. (Error: ${error})`;
		}
	}
</script>

<h1>Add Event</h1>
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

	<label for="apiKey">API Key:</label>
	<input type="password" id="apiKey" name="apiKey" value={apiKey} />

	<input type="submit" value="Submit" />
</form>

<style>
	form {
		display: grid;
		gap: 10px;
		width: 25%;
	}

	label {
		display: block;
	}
</style>
