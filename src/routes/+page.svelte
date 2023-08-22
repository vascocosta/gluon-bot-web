<script lang="ts">
	export let data;
	import EventCard from '../components/EventCard.svelte';
	import type { BotEvent } from '../types/types';

	let events = data.events;
</script>

<div class="container">
	<div class="column">
		<p>F1 Sessions</p>
		{#each events
			.filter((event) => new Date(event.datetime) > new Date() && event.category === '[Formula 1]')
			.slice(0, 5) as event (event.name)}
			<EventCard {event} />
		{/each}
	</div>
	<div class="column">
		<p>Other Motorsports</p>
		{#each events
			.filter((event) => new Date(event.datetime) > new Date() && event.category !== '[Formula 1]')
			.slice(0, 5) as event (event.name)}
			<EventCard {event} />
		{/each}
	</div>
</div>

<style>
	.container {
		display: flex;
		justify-content: center;
		flex-wrap: wrap;
	}

	.column {
		flex: 1;
		max-width: 300px;
		margin: 10px;
	}

	.column p {
		text-align: center;
	}
</style>
