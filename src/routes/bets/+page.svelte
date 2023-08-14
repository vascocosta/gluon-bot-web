<script lang="ts">
	import { onMount } from 'svelte';
	import { statusText } from '$lib/utils';
	import type { Bet } from '../../types/types';

	const URL: string = 'https://vettel.gluonspace.com/api/f1bets';

	let result: string = '';
	let bets: Bet[] = [];

	onMount(async () => {
		try {
			const response = await fetch(URL);

			if (response.ok) {
				bets = await response.json();
			} else {
				result = `Could not fetch bets. (${response.status} ${statusText(response.status)})`;
			}
		} catch (error) {
			result = `Could not parse bets. (Error: ${error})`;
		}
	});
</script>

<div>{result}</div>
<table>
	<thead>
		<tr>
			<th>Race</th>
			<th>Nick</th>
			<th>First</th>
			<th>Second</th>
			<th>Third</th>
			<th>FLap</th>
		</tr>
	</thead>
	<tbody>
		{#each bets as bet}
			<tr>
				<td>{bet.race}</td>
				<td>{bet.nick}</td>
				<td>{bet.p1}</td>
				<td>{bet.p2}</td>
				<td>{bet.p3}</td>
				<td>{bet.fl}</td>
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
