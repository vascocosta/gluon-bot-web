<script lang="ts">
	import type { F1BetScore } from '../types/types';

	export let score: F1BetScore;
</script>

<div class="card">
	<div class="nick">{score.nick.toUpperCase()}</div>
	<div class="points">{score.points}</div>
</div>

<style>
	.card {
		border: 1px solid #ccc;
		border-radius: 0px;
		padding: 10px;
		margin-bottom: 10px;
		margin-top: 10px;
		background-color: rgb(4, 121, 163);
		color: rgb(237, 237, 237);
	}

	.nick {
		font-weight: bold;
		text-align: center;
	}

	.points {
		text-align: center;
	}
</style>
