<script lang="ts">
	import { onMount } from 'svelte';

	let apiKey: string = '';
	let result: string = '';
	let theme: string = '';

	onMount(() => {
		apiKey = localStorage.getItem('apiKey')?.toString() || '';
		theme = localStorage.getItem('theme')?.toString() || '';
	});

	function saveSettings() {
		try {
			localStorage.setItem('apiKey', apiKey);
			localStorage.setItem('theme', theme);

			result = 'Settings saved.';
		} catch (error: unknown) {
			result = 'Could not save settings.';
		}
	}
</script>

<div>{result}</div>
<form id="eventForm" on:submit|preventDefault={saveSettings}>
	<label for="theme">Theme: (coming soon...)</label>
	<select id="theme" name="theme" bind:value={theme}>
		<option value="light" selected>light</option>
		<option value="dark">dark</option>
	</select>

	<label for="apiKey">API key:</label>
	<input type="password" id="apiKey" name="apiKey" bind:value={apiKey} />

	<input type="submit" value="Save" />
</form>

<style>
	form {
		display: grid;
		gap: 10px;
		width: 25%;
		margin-bottom: 20px;
		font-family: Arial, sans-serif;
	}

	label {
		display: block;
	}
</style>
