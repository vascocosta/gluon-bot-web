<script lang="ts">
	import { onMount } from 'svelte';

	let result: string = '';
	let apiKey: string = '';

	onMount(() => {
		apiKey = localStorage.getItem('apiKey')?.toString() || '';
	});

	function saveSettings() {
		try {
			localStorage.setItem('apiKey', apiKey);
		} catch (error) {
			result = 'Could not save settings.';
		}
	}
</script>

<h1>Settings</h1>
<div>{result}</div>
<form id="eventForm" on:submit|preventDefault={saveSettings}>
	<label for="apiKey">API key:</label>
	<input type="password" id="apiKey" name="apiKey" bind:value={apiKey} />

	<input type="submit" value="Save" />
</form>
