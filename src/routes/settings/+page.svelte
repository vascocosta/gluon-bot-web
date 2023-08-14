<script lang="ts">
	import { onMount } from 'svelte';

	let result: string = '';
	let theme: string = '';
	let apiKey: string = '';

	onMount(() => {
		apiKey = localStorage.getItem('apiKey')?.toString() || '';
	});

	function saveSettings() {
		try {
			localStorage.setItem('apiKey', apiKey);

			result = 'Settings saved.';
		} catch (error) {
			result = 'Could not save settings.';
		}
	}
</script>

<h1>Settings</h1>
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
	}

	label {
		display: block;
	}
</style>
