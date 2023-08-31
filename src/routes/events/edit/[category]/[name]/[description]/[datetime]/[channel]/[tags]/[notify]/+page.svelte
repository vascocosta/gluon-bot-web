<script lang="ts">
	export let data;
	import { API_URL } from '../../../../../../../../../../constants/constants';
	import { onMount } from 'svelte';
	import { statusText } from '$lib/utils';

	let apiKey: string = '';
	let category: string = data.category;
	let channel: string = data.channel;
	let datetime: string = data.datetime.slice(0, -4);
	let description: string = data.description;
	let name: string = data.name;
	let notify: string = data.notify;
	let result: string = '';
	let tags: string = data.tags;
	let checked: boolean = notify === 'true' ? true : false;

	onMount(() => {
		apiKey = localStorage.getItem('apiKey')?.toString() || '';
	});

	async function updateEvent(): Promise<void> {
		alert(
			JSON.stringify([
				{
					category: data.category,
					name: data.name,
					description: data.description,
					datetime: data.datetime,
					channel: data.channel,
					tags: data.tags,
					notify: true
				},
				{
					category: category,
					name: name,
					description: description,
					datetime: datetime + ':00Z',
					channel: channel,
					tags: tags,
					notify: true
				}
			])
		);
		try {
			const response = await fetch(`${API_URL}/events/update`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					'x-api-key': apiKey
				},
				body: JSON.stringify([
					{
						category: data.category,
						name: data.name,
						description: data.description,
						datetime: data.datetime,
						channel: data.channel,
						tags: data.tags,
						notify: checked
					},
					{
						category: category,
						name: name,
						description: description,
						datetime: datetime + ':00Z',
						channel: channel,
						tags: tags,
						notify: checked
					}
				])
			});

			if (response.ok) {
				result = 'Event updated successfully';
			} else {
				result = `Event could not be updated. (${response.status} ${statusText(response.status)})`;
			}
		} catch (error: unknown) {
			if (error instanceof TypeError || error instanceof DOMException || error instanceof Error) {
				result = `Event could not be updated. (${error.message})`;
			} else {
				result = 'Event could not be updated. (Unknown error)';
			}
		}
	}
</script>

<div>{result}</div>
<form id="eventForm" on:submit|preventDefault={updateEvent}>
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
	<input type="checkbox" id="notify" name="notify" bind:value={notify} bind:checked />

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
