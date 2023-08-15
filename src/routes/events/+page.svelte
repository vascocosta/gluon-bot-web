<script lang="ts">
	import { onMount } from 'svelte';
	import { statusText } from '$lib/utils';
	import type { BotEvent } from '../../types/types';

	const URL: string = 'https://vettel.gluonspace.com/api/events';

	let events: BotEvent[] = [];
	let result: string = '';

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
</script>

<div>{result}</div>
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
