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