<script lang="ts">
	import { onMount } from 'svelte';
	import { statusText } from '$lib/utils';
	import type { BotEvent } from '../../types/types';

	const URL: string = 'https://vettel.gluonspace.com/api/events';

	let category: string = '';
	let channel: string = '';
	let datetime: string = '';
	let description: string = '';
	let events: Promise<BotEvent[]> = Promise.resolve([]);
	let name: string = '';
	let result: string = '';
	let tags: string = '';

	onMount(async () => {
		events = search();
	});

	async function handleSearch(): Promise<void> {
		events = search();
	}

	async function search(): Promise<BotEvent[]> {
		const response = await fetch(
			`${URL}?category=${category}` +
				`&name=${name}` +
				`&description=${description}` +
				`&datetime=${datetime}` +
				`&channel=${channel}` +
				`&tags=${tags}`
		);

		if (!response.ok) {
			throw new Error(`Could not fetch data. (${response.status} ${statusText(response.status)})`);
		}

		return response.json();
	}
</script>

<div>{result}</div>
<form id="eventForm" on:submit|preventDefault={handleSearch}>
	<label for="category">Category:</label>
	<input type="text" id="category" name="category" bind:value={category} on:keyup={handleSearch} />

	<label for="name">Name:</label>
	<input type="text" id="name" name="name" bind:value={name} on:keyup={handleSearch} />

	<label for="description">Description:</label>
	<input
		type="text"
		id="description"
		name="description"
		bind:value={description}
		on:keyup={handleSearch}
	/>

	<label for="datetime">Date/Time:</label>
	<input type="text" id="datetime" name="datetime" bind:value={datetime} on:keyup={handleSearch} />

	<label for="channel">Channel:</label>
	<input type="text" id="channel" name="channel" bind:value={channel} on:keyup={handleSearch} />

	<label for="tags">Tags:</label>
	<input type="text" id="tags" name="tags" bind:value={tags} on:keyup={handleSearch} />

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
		{#await events}
			<p>Fetching data...</p>
		{:then events}
			{#each events as event (event.datetime)}
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
		{:catch error}
			<p>Error: {error.message}</p>
		{/await}
	</tbody>
</table>

<style>
	form {
		margin-bottom: 20px;
	}

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
