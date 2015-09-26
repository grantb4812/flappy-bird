(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var CircleCollisionComponent = function(entity, radius) {
    this.entity = entity;
    this.radius = radius;
    this.type = 'circle';
};

CircleCollisionComponent.prototype.collidesWith = function(entity) {
    if (entity.components.collision.type == 'circle') {
        return this.collideCircle(entity);
    }
    else if (entity.components.collision.type == 'rect') {
        return this.collideRect(entity);
    }
    return false;
};

CircleCollisionComponent.prototype.collideCircle = function(entity) {
    var positionA = this.entity.components.physics.position;
    var positionB = entity.components.physics.position;

    var radiusA = this.radius;
    var radiusB = entity.components.collision.radius;

    var diff = {x: positionA.x - positionB.x,
                y: positionA.y - positionB.y};

    var distanceSquared = diff.x * diff.x + diff.y * diff.y;
    var radiusSum = radiusA + radiusB;

    return distanceSquared < radiusSum * radiusSum;
};

CircleCollisionComponent.prototype.collideRect = function(entity) {
    return false;
};

exports.CircleCollisionComponent = CircleCollisionComponent;
},{}],2:[function(require,module,exports){
var BirdGraphicsComponent = function(entity) {
	this.entity = entity;
};

BirdGraphicsComponent.prototype.draw = function(context) {
    var position = this.entity.components.physics.position;

    context.save();
    context.translate(position.x, position.y);
    context.beginPath();
    context.arc(0, 0, 0.02, 0, 2 * Math.PI);
    context.fill();
    context.closePath();
    context.restore();
};

exports.BirdGraphicsComponent = BirdGraphicsComponent;
},{}],3:[function(require,module,exports){
var PipeGraphicsComponent = function(entity) {
	this.entity = entity;
};

PipeGraphicsComponent.prototype.draw = function(context) {
	var position = this.entity.components.physics.position;
	var dimension = this.entity.components.physics.dimension;
	
	context.save();
    context.translate(position.x, position.y);
    context.beginPath();
	context.fillRect(0, 0, dimension.x, dimension.y);
	context.fill();
	context.closePath();
    context.restore();

};

exports.PipeGraphicsComponent = PipeGraphicsComponent;
},{}],4:[function(require,module,exports){
var PhysicsComponent = function(entity) {
    this.entity = entity;

    this.position = {
        x: 0,
        y: 0
    };
    this.velocity = {
        x: 0,
        y: 0
    };
    this.acceleration = {
        x: 0,
        y: 0
    };

    this.dimension = {
        x: 0,
        y: 0
    }
};

PhysicsComponent.prototype.update = function(delta) {
    this.velocity.x += this.acceleration.x * delta;
    this.velocity.y += this.acceleration.y * delta;

    this.position.x += this.velocity.x * delta;
    this.position.y += this.velocity.y * delta;
};

exports.PhysicsComponent = PhysicsComponent;
},{}],5:[function(require,module,exports){
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
    console.log('this works');
};

exports.Bird = Bird;
},{"../components/collision/circle":1,"../components/graphics/bird":2,"../components/physics/physics":4,"../main":8}],6:[function(require,module,exports){
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
},{"../components/collision/circle":1,"../components/graphics/pipe":3,"../components/physics/physics":4}],7:[function(require,module,exports){
var graphicsSystem = require('./systems/graphics');
var physicsSystem = require('./systems/physics');
var inputSystem = require('./systems/input');

var bird = require('./entities/bird');
var pipe = require('./entities/pipe');

var FlappyBird = function() {
	this.entities = [new bird.Bird(), new pipe.Pipe(0.9, 0.9), new pipe.Pipe(0.9, 0.1)];
	this.graphics = new graphicsSystem.GraphicsSystem(this.entities);
	this.physics = new physicsSystem.PhysicsSystem(this.entities);
	this.inputs = new inputSystem.InputSystem(this.entities);
};

FlappyBird.prototype.run = function() {
	this.graphics.run();
	this.physics.run();
	this.inputs.run();
};

exports.FlappyBird = FlappyBird;
},{"./entities/bird":5,"./entities/pipe":6,"./systems/graphics":10,"./systems/input":11,"./systems/physics":12}],8:[function(require,module,exports){
var flappyBird = require('./flappy_bird');

document.addEventListener('DOMContentLoaded', function() {
	var app = new flappyBird.FlappyBird();
	app.run();
});
},{"./flappy_bird":7}],9:[function(require,module,exports){
var CollisionSystem = function(entities) {
    this.entities = entities;
};

CollisionSystem.prototype.tick = function() {
    for (var i=0; i<this.entities.length; i++) {
        var entityA = this.entities[i];
        if (!('collision' in entityA.components)) {
            continue;
        }

        for (var j=i+1; j<this.entities.length; j++) {
            var entityB = this.entities[j];
            if (!('collision' in entityB.components)) {
                continue;
            }

            if (!entityA.components.collision.collidesWith(entityB)) {
                continue;
            }

            if (entityA.components.collision.onCollision) {
                entityA.components.collision.onCollision(entityB);
            }

            if (entityB.components.collision.onCollision) {
                entityB.components.collision.onCollision(entityA);
            }
        }
    }
};

exports.CollisionSystem = CollisionSystem;
},{}],10:[function(require,module,exports){
var GraphicsSystem = function(entities) {
	this.entities = entities;
	// Canvas is where we draw
	this.canvas = document.getElementById('main-canvas');
	// Context is what we draw to
	this.context = this.canvas.getContext('2d');
};

GraphicsSystem.prototype.run = function() {
	// run the render loop
	window.requestAnimationFrame(this.tick.bind(this));
};

GraphicsSystem.prototype.tick = function() {
	// set the canvas to the correct sze if the window is resized
	if (this.canvas.width != this.canvas.offsetWidth ||
		this.canvas.height != this.canvas.offsetHeight) {
		this.canvas.width = this.canvas.offsetWidth;
		this.canvas.height = this.canvas.offestHeight;
	} 

	// clear the canvas 
	this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
	this.context.save();
	this.context.translate(this.canvas.width / 2, this.canvas.height);
	this.context.scale(this.canvas.height, -this.canvas.height);


	// rendering goes in here
	for (var i=0; i<this.entities.length; i++) {
		 var entity = this.entities[i];
		if (!('graphics' in entity.components)) {
			continue;
		}

		entity.components.graphics.draw(this.context);
	} 

	this.context.restore();

	window.requestAnimationFrame(this.tick.bind(this));
};

exports.GraphicsSystem = GraphicsSystem;
},{}],11:[function(require,module,exports){
var InputSystem = function(entities) {
    this.entities = entities;

    // Canvas is where we get input from
    this.canvas = document.getElementById('main-canvas');
};

InputSystem.prototype.run = function() {
    this.canvas.addEventListener('click', this.onClick.bind(this));
    this.canvas.addEventListener('touchstart', this.onTouch.bind(this));
};

InputSystem.prototype.onClick = function() {
    var bird = this.entities[0];
    bird.components.physics.velocity.y = 0.1;
};

InputSystem.prototype.onTouch = function() {
	var bird = this.entities[0];
	bird.components.physics.velocity.y = 0.1;
};

exports.InputSystem = InputSystem;
},{}],12:[function(require,module,exports){
var pipe = require('../entities/pipe');
var collisionSystem = require("./collision");

var PhysicsSystem = function(entities) {
    this.entities = entities;
    this.collisionSystem = new collisionSystem.CollisionSystem(entities);
};

PhysicsSystem.prototype.run = function() {
    // Run the update loop
    window.setInterval(this.tick.bind(this), 1000 /60);
    window.setInterval(this.generatePipe.bind(this), 2000);
};

PhysicsSystem.prototype.tick = function() {
    for (var i=0; i<this.entities.length; i++) {
        var entity = this.entities[i];
        if (!('physics' in entity.components)) {
            continue;
        }

        entity.components.physics.update(1/60);

    }
    this.collisionSystem.tick();
    
};

PhysicsSystem.prototype.generatePipe = function() {

    var randomNum = Math.random() * (0.6 - 0.2) + 0.2; 
    var secondMax = 1 - (randomNum + 0.2);
    var secondRandom = Math.random() * (secondMax - 0.2) + 0.2; 

    this.entities.push(new pipe.Pipe(0.9, 0.9, randomNum));
    this.entities.push(new pipe.Pipe(0.9, 0.1, secondRandom));
};

exports.PhysicsSystem = PhysicsSystem;
},{"../entities/pipe":6,"./collision":9}]},{},[8]);
