//fit canvas to its container
function fitToContainer() {
	Const.canvas.style.width = '100%';
	Const.canvas.style.height = '100%';
	Const.canvas.width = Const.canvas.offsetWidth;
	Const.canvas.height = Const.canvas.offsetHeight;
}

//random float generator
function getRandomFloat(min, max) {
	return Math.random() * (max - min) + min;
}

//calculates distance between two coordinates
function calculateDistance(point1X, point1Y, point2X, point2Y) {
	return Math.sqrt((point1X - point2X)*(point1X - point2X) + (point1Y - point2Y)*(point1Y - point2Y));
}

//draws line between two coordinates
drawLine = function(lineX1, lineY1, lineX2, lineY2) {
	Const.ctx.beginPath();
	Const.ctx.moveTo(lineX1, lineY1);
	Const.ctx.lineTo(lineX2, lineY2);
	Const.ctx.lineWidth = Const.lineSize;

	//if interactive is on, make line opacity visible only if lines are in range of mouse
	if (Const.interactive) {

		//calculate midpoint of line
		var midX = (lineX1 + lineX2) / 2;
		var midY = (lineY1 + lineY2) / 2;

		Const.lineOpacity = 0;

		//check whether distance between mouse and line is within range
		if (calculateDistance(midX, midY, Const.cursorX, Const.cursorY) < Const.mouseFalloff) {
			Const.lineOpacity = 1;
			if (Const.opacityFalloff) {
				Const.lineOpacity = (Const.mouseFalloff - calculateDistance(midX, midY, Const.cursorX, Const.cursorY)) / Const.falloffAmount;
			}
		}
		//set stroke color
		Const.lineRGB = "rgba(" + Const.lineRed + ", " + Const.lineGreen + ", " + Const.lineBlue + ", " + Const.lineOpacity + ")";
	}

	//draw line
	Const.ctx.strokeStyle = Const.lineRGB;
	Const.ctx.stroke();
}

//dot class
function Dot() {

	this.dotX = getRandomFloat(1, Const.canvas.width);
	this.dotY = getRandomFloat(1, Const.canvas.height);
	this.dotVX = getRandomFloat(-Const.dotSpeed, Const.dotSpeed);
	this.dotVY = getRandomFloat(-Const.dotSpeed, Const.dotSpeed);
	this.dotR = getRandomFloat(Const.dotSizeMin, Const.dotSizeMax);

	//method to update dot position
	this.moveDot = function() {
		this.dotX += this.dotVX;
		this.dotY += this.dotVY;

		//check collisions
		if (this.dotX + this.dotVX > Const.canvas.width || this.dotX + this.dotVX < 0) {
			this.dotVX = -this.dotVX;
		}

		if (this.dotY + this.dotVY > Const.canvas.height || this.dotY + this.dotVY < 0) {
			this.dotVY = -this.dotVY;
		}
	}

	//method to draw dot
	this.drawDot = function() {
		Const.ctx.beginPath();
		Const.ctx.arc(this.dotX, this.dotY, this.dotR, 0, Math.PI * 2, true);
		Const.ctx.closePath();
		Const.ctx.fillStyle = Const.dotRGB;
		Const.ctx.fill();
	}
}