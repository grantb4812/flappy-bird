var graphicsComponent = require("../components/graphics/pipe");
var physicsComponent = require("../components/physics/physics");

var Pipe = function(x, y) {
	var randomPosition = Math.random();

	var physics = new physicsComponent.PhysicsComponent(this);
	physics.position.y = y;
	physics.position.x = x;

	physics.acceleration.x = -0.09;

	var graphics = new graphicsComponent.PipeGraphicsComponent(this);

	this.components = {
		graphics: graphics,
		physics: physics,
	};
};

exports.Pipe = Pipe;