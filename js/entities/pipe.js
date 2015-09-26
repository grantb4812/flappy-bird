var graphicsComponent = require("../components/graphics/pipe");
var physicsComponent = require("../components/physics/physics");
var collisionComponent = require("../components/collision/circle");


var Pipe = function(x, y, height) {
	
	

	var physics = new physicsComponent.PhysicsComponent(this);
	physics.position.y = y;
	physics.position.x = x;
	physics.dimension.y = height;
	physics.dimension.x = 0.01;

	physics.acceleration.x = -0.09;

	var graphics = new graphicsComponent.PipeGraphicsComponent(this);

	var collision = new collisionComponent.CircleCollisionComponent(this, height);
    collision.onCollision = this.onCollision.bind(this);

	this.components = {
		graphics: graphics,
		physics: physics,
		collision: collision
	};
};

Pipe.prototype.onCollision = function(entity) {
    console.log("Bird collided with entity:", entity);
};


exports.Pipe = Pipe;