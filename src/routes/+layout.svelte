<nav>
	<a href="/">Home</a>
	<a href="/f1bets">F1Bets</a>
	<a href="/events">Events</a>
	<a href="/events/add">Add Events</a>
	<a href="/say">Say Message</a>
	<a href="/settings">Settings</a>
</nav>

<slot />

<style>
	:global(body) {
		background-color: rgb(235, 235, 235);
		color: rgb(40, 40, 40);
	}

	nav {
		display: flex;
		justify-content: left;
		margin-bottom: 20px;
		background-color: rgb(79, 181, 255);
		padding: 5px;
	}

	nav a {
		color: white;
		text-decoration: none;
		padding: 5px;
		margin: 5px;
		font-weight: bold;
		font-size: 16px;
		font-family: Arial, sans-serif;
		background-color: #36c;
		border-radius: 5px;
	}

	nav a:hover {
		background-color: rgb(0, 33, 131);
	}

	:global(button) {
		font-family: Arial, sans-serif;
	}

	:global(form) {
		margin-bottom: 20px;
		font-family: Arial, sans-serif;
	}

	:global(tr:nth-child(even)) {
		background: #eee;
	}

	:global(tr:nth-child(odd)) {
		background: #fff;
	}

	:global(tr:hover) {
		background: #6cb2f7;
	}

	:global(thead th) {
		background-color: #36c;
		color: #fff;
		text-align: left;
	}

	:global(table) {
		width: 100%;
	}

	:global(table, th, td) {
		border: none;
		font-family: Arial, sans-serif;
	}
</style>
