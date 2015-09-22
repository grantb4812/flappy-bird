var graphicsComponent = require("../components/graphics/pipe");

var Pipe = function() {
	console.log("Creating Pipe Entity");

	var physics = new physicsComponent.Pipe
	var graphics = new graphicsComponent.PipeGraphicsComponent(this);
	this.components = {
		graphics: graphics
	};
};

exports.Pipe = Pipe;