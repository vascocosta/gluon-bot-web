<script lang="ts">
	import { onMount } from 'svelte';
	import { statusText } from '$lib/utils';
	import type { BotEvent } from '../../types/types';

	const URL: string = 'https://vettel.gluonspace.com/api/events';

	let apiKey: string = '';
	let category: string = '';
	let channel: string = '';
	let datetime: string = '';
	let descending: boolean = true;
	let description: string = '';
	let events: Promise<BotEvent[]> = Promise.resolve([]);
	let name: string = '';
	let orderBy: string = 'datetime';
	let result: string = '';
	let tags: string = '';

	onMount(async () => {
		events = search();
		apiKey = localStorage.getItem('apiKey')?.toString() || '';
	});

	async function handleDelete(event: BotEvent): Promise<void> {
		if (
			confirm(
				`Are you sure you want to delete this event?\n` +
					`Category: ${event.category}\n` +
					`Name: ${event.name}\n` +
					`Description: ${event.description}`
			)
		) {
			const response = await fetch(`${URL}/delete`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					'x-api-key': apiKey
				},
				body: JSON.stringify(event)
			});

			if (!response.ok) {
				alert(`Could not delete event. (${response.status} ${statusText(response.status)})`);

				return;
			}

			result = 'Event deleted successfully.';
			events = search();
		}
	}

	function handleSearch() {
		events = search();
	}

	async function handleOrderBy(newOrderBy: string, newDescending: boolean): Promise<void> {
		orderBy = newOrderBy;
		descending = newDescending;
		events = search();
	}

	async function search(): Promise<BotEvent[]> {
		const response = await fetch(
			`${URL}?category=${category}` +
				`&name=${name}` +
				`&description=${description}` +
				`&datetime=${datetime}` +
				`&channel=${channel}` +
				`&tags=${tags}` +
				`&orderby=${orderBy}` +
				`&descending=${descending}`
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
			<th
				>Category <button on:click={() => handleOrderBy('category', false)}>↑</button>
				<button on:click={() => handleOrderBy('category', true)}>↓</button></th
			>
			<th
				>Name <button on:click={() => handleOrderBy('name', false)}>↑</button>
				<button on:click={() => handleOrderBy('name', true)}>↓</button></th
			>
			<th
				>Description <button on:click={() => handleOrderBy('description', false)}>↑</button>
				<button on:click={() => handleOrderBy('description', true)}>↓</button></th
			>
			<th
				>Date/Time <button on:click={() => handleOrderBy('datetime', false)}>↑</button>
				<button on:click={() => handleOrderBy('datetime', true)}>↓</button></th
			>
			<th
				>Channel <button on:click={() => handleOrderBy('channel', false)}>↑</button>
				<button on:click={() => handleOrderBy('channel', true)}>↓</button></th
			>
			<th>Tags</th>
			<th>Notify</th>
			<th>Actions</th>
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
					<td><button on:click={() => handleDelete(event)}>Delete</button></td>
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

	tr:nth-child(even) {
		background: #eee;
	}

	tr:nth-child(odd) {
		background: #fff;
	}

	tr:hover {
		background: #d6eeee;
	}

	thead th {
		background-color: #36c;
		color: #fff;
		text-align: left;
	}

	table {
		width: 100%;
	}

	table,
	th,
	td {
		border: none;
	}
</style>
