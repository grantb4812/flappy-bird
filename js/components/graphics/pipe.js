var PipeGraphicsComponent = function(entity) {
	this.entity = entity;
};

PipeGraphicsComponent.prototype.draw = function(context) {
	var position = this.entity.components.physics.position;
	var dimension = this.entity.components.physics.dimension;
	
	context.save();
    context.translate(position.x, position.y);
    context.beginPath();
	//context.fillRect(0, 0, dimension.x, dimension.y);
	context.rect(-dimension.x / 2, -dimension.y / 2, dimension.x, dimension.y )
	context.fill();
	context.closePath();
    context.restore();

};

exports.PipeGraphicsComponent = PipeGraphicsComponent;