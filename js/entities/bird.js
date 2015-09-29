var graphicsComponent = require("../components/graphics/bird");
var physicsComponent = require("../components/physics/physics");
var collisionComponent = require("../components/collision/circle");
var flappyBird = require("../main");


var Bird = function() {
	
	var physics = new physicsComponent.PhysicsComponent(this);
	physics.position.y = 0.5;
	
	physics.acceleration.y = -0.1;


	var graphics = new graphicsComponent.BirdGraphicsComponent(this);

	var collision = new collisionComponent.CircleCollisionComponent(this, 0.02);
    collision.onCollision = this.onCollision.bind(this);


	this.components = {
		physics: physics,
		graphics: graphics,
		collision: collision 
	};

};

Bird.prototype.onCollision = function(entity) {
   		
   		console.log('this is working');
};

exports.Bird = Bird;