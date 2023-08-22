<script lang="ts">
	import type { F1Bet } from '../types/types';

	export let bet: F1Bet;
</script>

<div class="card">
	<div class="race">{bet.race}</div>
	<div class="nick">{bet.nick}</div>
	<div class="podium">
		Podium: {bet.p1.toUpperCase()}
		{bet.p2.toUpperCase()}
		{bet.p3.toUpperCase()}
	</div>
	<div class="flap">F. Lap: {bet.fl.toUpperCase()}</div>
</div>

<style>
	.card {
		border: 1px solid #ccc;
		border-radius: 4px;
		padding: 10px;
		margin-bottom: 10px;
		background-color: rgb(212, 212, 212);
	}

	.race {
		font-weight: bold;
		margin-bottom: 5px;
	}

	.nick {
		font-size: 18px;
		margin-bottom: 5px;
	}

	.podium,
	.flap {
		color: #777;
		margin-bottom: 5px;
	}
</style>
