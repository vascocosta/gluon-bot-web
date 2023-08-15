<nav>
	<a href="/">Home</a>
	<a href="/bets">List Bets</a>
	<a href="/events">List Events</a>
	<a href="/events/add">Add Events</a>
	<a href="/say">Say Message</a>
	<a href="/settings">Settings</a>
</nav>

<slot />

<style>
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
</style>
