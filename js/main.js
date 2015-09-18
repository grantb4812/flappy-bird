var flappyBird = rquire('./flappy_bird');

document.addEventListener('DOMContentLoaded', function() {
	var app = new flappyBird.FlappyBird();
	app.run();
});