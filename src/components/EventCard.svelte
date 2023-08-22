<script lang="ts">
	import type { BotEvent } from '../types/types';
	export let event: BotEvent;

	function formatDate(dateString: Date) {
		const date = new Date(dateString);
		return date.toLocaleString();
	}
</script>

<div class="card">
	<div class="category">{event.category}</div>
	<div class="name">{event.name}</div>
	<div class="description">{event.description}</div>
	<div class="datetime">Date/Time: {formatDate(event.datetime)}</div>
</div>

<style>
	.card {
		border: 1px solid #ccc;
		border-radius: 4px;
		padding: 10px;
		margin-bottom: 10px;
		background-color: rgb(212, 212, 212);
	}

	.category {
		font-weight: bold;
		margin-bottom: 5px;
	}

	.name {
		font-size: 18px;
		margin-bottom: 5px;
	}

	.description,
	.datetime {
		color: #777;
		margin-bottom: 5px;
	}
</style>
