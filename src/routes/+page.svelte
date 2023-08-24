<script lang="ts">
	export let data;
	import F1BetCard from '../components/F1BetCard.svelte';
	import F1BetScoreCard from '../components/F1BetScoreCard.svelte';
	import EventCard from '../components/EventCard.svelte';
	import type { BotEvent, F1Bet, F1BetScore } from '../types/types';

	let bets: F1Bet[] = data.bets;
	let events: BotEvent[] = data.events;
	let scores: F1BetScore[] = data.scores;
</script>

<div class="scorecard-container">
	{#each scores.slice(0, 13) as score (score.points)}
		<F1BetScoreCard {score} />
	{/each}
</div>
<div class="main-container">
	<div class="column">
		<p>F1 Sessions</p>
		{#each events
			.filter((event) => new Date(event.datetime) > new Date() && event.category === '[Formula 1]')
			.slice(0, 25) as event (event.name)}
			<EventCard {event} />
		{/each}
	</div>
	<div class="column">
		<p>Other Motorsports</p>
		{#each events
			.filter((event) => event.channel.toLocaleLowerCase() === '#formula1' && new Date(event.datetime) > new Date() && event.category !== '[Formula 1]')
			.slice(0, 25) as event (event.name)}
			<EventCard {event} />
		{/each}
	</div>
	<div class="column">
		<p>Other Events</p>
		{#each events
			.filter((event) => event.channel.toLocaleLowerCase() !== '#formula1' && new Date(event.datetime) > new Date())
			.slice(0, 9) as event (event.name)}
			<EventCard {event} />
		{/each}
	</div>
	<div class="column">
		<p>Latest Bets</p>
		{#each bets.reverse().slice(0, 9) as bet (bet.nick)}
			<F1BetCard {bet} />
		{/each}
	</div>
</div>

<style>
	.main-container {
		display: flex;
		justify-content: center;
		flex-wrap: wrap;
	}

	.scorecard-container {
		display: flex;
		justify-content: center;
	}

	.column {
		flex: 1;
		max-width: 300px;
		margin: 10px;
	}

	.column p {
		font-size: 20px;
		font-weight: bold;
		text-align: center;
	}
</style>
