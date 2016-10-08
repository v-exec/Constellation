//Dot class constructor
var dot = function () {
	this.dotY = getRandomArbitrary(10, canvas.height);
	this.dotX = getRandomArbitrary(10, canvas.width);
	this.dotVY = getRandomArbitrary(-0.1, 0.1);
	this.dotVX = getRandomArbitrary(-0.1, 0.1);
	this.dotR = getRandomArbitrary(1, 2.4);
};

//Method for calculating new dot position and drawing
dot.prototype.drawDot = function () {
	this.dotX += this.dotVX;
	this.dotY += this.dotVY;

	if (this.dotX + this.dotVX > canvas.width || this.dotX + this.dotVX < 0) {
		this.dotVX = -this.dotVX;
	}

	if (this.dotY + this.dotVY > canvas.height || this.dotY + this.dotVY < 0) {
		this.dotVY = -this.dotVY;
	}

	ctx.beginPath();
	ctx.arc(this.dotX, this.dotY, this.dotR, 0, Math.PI * 2, true);
	ctx.closePath();
	ctx.fillStyle = "rgba(20,20,20,1)";
	ctx.fill();
};