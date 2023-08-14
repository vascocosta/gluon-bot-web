<script lang="ts">
	import { onMount } from 'svelte';
	import { statusText } from '$lib/utils';
	import type { BotEvent } from '../../types/types';

	const URL: string = 'https://vettel.gluonspace.com/api/events';

	let result: string = '';
	let events: BotEvent[] = [];

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

<h1>Events</h1>
<div>{result}</div>
<table>
	<thead>
		<tr>
			<th>Category</th>
			<th>Name</th>
			<th>description</th>
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
