<script lang="ts">
	export let data;
	import F1BetCard from '../components/F1BetCard.svelte';
	import EventCard from '../components/EventCard.svelte';
	import type { BotEvent, F1Bet } from '../types/types';

	let events: BotEvent[] = data.events;
	let bets: F1Bet[] = data.bets;
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
	<div class="column">
		<p>Latest Bets</p>
		{#each bets.reverse().slice(0, 5) as bet (bet.nick)}
			<F1BetCard {bet} />
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
