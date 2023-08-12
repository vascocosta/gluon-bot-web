<script lang="ts">
	import { onMount } from 'svelte';
	import type { BotEvent } from '../../types/types';
	// import type { PageData } from './$types';

	// export let data: PageData;

	const url: string = 'https://vettel.gluonspace.com/api/events';

	let events: BotEvent[] = [];

	onMount(async () => {
		try {
			const response = await fetch(url);

			if (response.ok) {
				events = await response.json();
			} else {
				console.log('Could not fetch events.');
			}
		} catch (error) {
			console.log('Could not parse events.');
		}
	});
</script>

<h1>Events</h1>
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
