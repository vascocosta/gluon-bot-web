<script lang="ts">
	import { onMount } from 'svelte';
	import { statusText } from '$lib/utils';
	import type { BotEvent } from '../../types/types';

	const URL: string = 'https://vettel.gluonspace.com/api/events';

	let apiKey: string = '';
	let category: string = '';
	let channel: string = '';
	let datetime: string = '';
	let description: string = '';
	let events: BotEvent[] = [];
	let name: string = '';
	let notify: boolean = false;
	let result: string = '';
	let tags: string = '';

	onMount(async () => {
		try {
			const response = await fetch(URL);

			if (response.ok) {
				events = await response.json();
			} else {
				result = `Could not fetch events. (${response.status} ${statusText(response.status)})`;
			}
		} catch (error) {
			result = `Could not parse events. (Error: ${error})`;
		}
	});

	async function search(): Promise<void> {
		try {
			const response = await fetch(`${URL}?category=${category}` +
												`&name=${name}` +
												`&description=${description}`+
												`&datetime=${datetime}` +
												`&channel=${channel}` +
												`&tags=${tags}`);

			if (response.ok) {
				events = [];
				events = await response.json();
			} else {
				result = `Could not fetch events. (${response.status} ${statusText(response.status)})`;
			}

		} catch (error) {
			result = `Could not parse events. (Error: ${error})`;
		}
	}
</script>

<div>{result}</div>
<form id="eventForm" on:submit|preventDefault={search}>
	<label for="category">Category:</label>
	<input type="text" id="category" name="category" bind:value={category} />

	<label for="name">Name:</label>
	<input type="text" id="name" name="name" bind:value={name} />

	<label for="description">Description:</label>
	<input type="text" id="description" name="description" bind:value={description} />

	<label for="datetime">Date/Time:</label>
	<input type="text" id="datetime" name="datetime" bind:value={datetime} />

	<label for="channel">Channel:</label>
	<select id="channel" name="channel" bind:value={channel}>
		<option value="#formula1" selected>#formula1</option>
		<option value="#geeks">#geeks</option>
		<option value="#nerds">#nerds</option>
	</select>

	<label for="tags">Tags:</label>
	<input type="text" id="tags" name="tags" bind:value={tags} />

	<input type="submit" value="Search" />
</form>
<table>
	<thead>
		<tr>
			<th>Category</th>
			<th>Name</th>
			<th>Description</th>
			<th>Date</th>
			<th>Channel</th>
			<th>Tags</th>
			<th>Notify</th>
		</tr>
	</thead>
	<tbody>
		{#each events as event (event.name)}
			<tr>
				<td>{event.category}</td>
				<td>{event.name}</td>
				<td>{event.description}</td>
				<td>{event.datetime}</td>
				<td>{event.channel}</td>
				<td>{event.tags}</td>
				<td>{event.notify}</td>
			</tr>
		{/each}
	</tbody>
</table>

<style>
	/* Set alternating row colors */
	tbody tr:nth-child(even) {
		background-color: #eee;
	}

	/* Style the headers */
	thead th {
		background-color: #36c;
		color: #fff;
		text-align: left;
	}

	/* Set table width to 100% */
	table {
		width: 100%;
	}

	/* Remove visible borders */
	table,
	th,
	td {
		border: none;
	}
</style>
