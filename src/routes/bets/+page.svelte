<script lang="ts">
	import { API_URL } from '../../constants/constants';
	import { onMount } from 'svelte';
	import { statusText } from '$lib/utils';
	import type { Bet } from '../../types/types';

	let bets: Bet[] = [];
	let result: string = '';

	onMount(async () => {
		try {
			const response = await fetch(`${API_URL}/f1bets`);

			if (response.ok) {
				bets = await response.json();
			} else {
				result = `Could not fetch bets. (${response.status} ${statusText(response.status)})`;
			}
		} catch (error: unknown) {
			if (error instanceof TypeError || error instanceof DOMException || error instanceof Error) {
				result = `Could not parse bets. (${error.message})`;
			} else {
				result = 'Could not parse bets. (Unknown error)';
			}
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
