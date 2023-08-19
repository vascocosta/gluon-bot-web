<script lang="ts">
	import { API_URL } from '../../constants/constants';
	import { onMount } from 'svelte';
	import { statusText } from '$lib/utils';
	import type { F1Bet } from '../../types/types';

	let bets: Promise<F1Bet[]> = Promise.resolve([]);
	let nick: string = '';
	let race: string = '';
	let result: string = '';

	onMount(async () => {
		bets = fetchF1Bets();
	});

	function clearInputs() {
		nick = '';
		race = '';
		bets = fetchF1Bets();
	}

	function handleSearch() {
		bets = fetchF1Bets();
	}

	async function fetchF1Bets(): Promise<F1Bet[]> {
		const response = await fetch(`${API_URL}/f1bets?race=${race}&nick=${nick}`);

		if (!response.ok) {
			throw new Error(`Could not fetch data. (${response.status} ${statusText(response.status)})`);
		}

		return response.json();
	}
</script>

<div>{result}</div>
<form id="betForm" on:submit|preventDefault={handleSearch}>
	<label for="race">Race:</label>
	<input type="text" id="race" name="race" bind:value={race} on:keyup={handleSearch} />

	<label for="nick">Nick:</label>
	<input type="text" id="nick" name="nick" bind:value={nick} on:keyup={handleSearch} />

	<input type="button" value="Clear" on:click={clearInputs} />
	<input type="submit" value="Search" />
</form>
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
		{#await bets}
			<p>Fetching bets...</p>
		{:then bets}
			{#each bets.reverse() as bet}
				<tr>
					<td>{bet.race}</td>
					<td>{bet.nick}</td>
					<td>{bet.p1}</td>
					<td>{bet.p2}</td>
					<td>{bet.p3}</td>
					<td>{bet.fl}</td>
				</tr>
			{/each}
		{/await}
	</tbody>
</table>
