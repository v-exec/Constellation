//Line class constructor
var line = function (lineX, lineY, lineX2, lineY2) {
	this.lineX = lineX;
	this.lineY = lineY;
	this.lineX2 = lineX2;
	this.lineY2 = lineY2;
};

//Method for drawing line between two points
line.prototype.drawLine = function () {
	ctx.beginPath();
	ctx.moveTo(this.lineX, this.lineY);
	ctx.lineTo(this.lineX2, this.lineY2);
	ctx.lineWidth = 0.7;
	ctx.strokeStyle = "rgba(120, 120, 120, 0.5)";
	ctx.stroke();
};