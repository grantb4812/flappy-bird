var PipeGraphicsComponent = function(entity) {
	this.entity = entity;
};

PipeGraphicsComponent.prototype.draw = function(context) {
	
	
	context.fillRect(0, 0, 0.01, 0.1);
	context.fill();
	

};

exports.PipeGraphicsComponent = PipeGraphicsComponent;