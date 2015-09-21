var BirdGraphicsComponent = function(entity) {
	this.entity = entity;
};

BirdGraphicsComponent.prototype.draw = function(context) {

	var randomNum = Math.random() * 100;

	context.beginPath();
	

	context.arc(randomNum, randomNum, 10, 0, 2 * Math.PI);
	context.fillStyle = "green";

	context.fillRect(randomNum, randomNum, 20, 20);
	context.fillStyle  = "red";

	context.fill();
	
	


};

exports.BirdGraphicsComponent = BirdGraphicsComponent;