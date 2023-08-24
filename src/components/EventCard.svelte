<script lang="ts">
	import type { BotEvent } from '../types/types';

	export let event: BotEvent;

	function formatDate(dateString: Date): string {
		const date = new Date(dateString);
		const tz = Intl.DateTimeFormat().resolvedOptions().timeZone;
		return `${date.toLocaleString()} (${tz})`;
	}
</script>

<div class="card">
	<div class="category">{event.category}</div>
	<div class="name">{event.name}</div>
	<div class="description">{event.description}</div>
	<div class="datetime">{formatDate(event.datetime)}</div>
</div>

<style>
	.card {
		border: 1px solid #ccc;
		border-radius: 10px;
		padding: 10px;
		margin-bottom: 10px;
		background-color: rgb(176, 221, 238);
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
		color: #545454;
		margin-bottom: 5px;
	}
</style>
